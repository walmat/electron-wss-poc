/* global MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY, MAIN_WINDOW_WEBPACK_ENTRY */

import { app, BrowserWindow } from "electron";
import getPort from "get-port";

import initializeSocket from "../api/main";
import pack from "../../package";

Error.stackTraceLimit = 100; // https://v8.dev/docs/stack-trace-api

// eslint-disable-next-line global-require
if (require("electron-squirrel-startup"))
{
  app.quit();
}

async function init()
{
  const port = await getPort({ port: getPort.makeRange(9000, 10000) });
  process.env.WS_PORT = port;

  initializeApp();
}

init();

function initializeApp()
{
  app.setName(`${pack.productName}`);
  app.on("ready", () =>
  {
    console.log("ready");

    initializeSocket(process.env.WS_PORT);
    createWindow();
  });

  app.on("activate", () =>
  {
    console.log("activate");
    createWindow();
  });

  let mainWindow;
  function createWindow()
  {
    if (mainWindow === undefined)
    {
      mainWindow = new BrowserWindow(
        {
          width: 1024,
          height: 768,
          minHeight: 480,
          minWidth: 640,
          webPreferences:
          {
            devTools: true,
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
            textAreasAreResizable: false,
            webviewTag: false
          }
        }
      );

      mainWindow.setTitle(pack.productName);
      mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
      mainWindow.webContents.openDevTools({ mode: "bottom" });

      mainWindow.on("closed", () =>
      {
        mainWindow = undefined;
      });

      mainWindow.once("ready-to-show", () =>
      {
        mainWindow.show();
        mainWindow.focus();
      });
    }
  }

  app.on("window-all-closed", () =>
  {
    const { platform } = process;

    if (platform !== "darwin")
    {
      app.quit();
    }
  });

  if (!app.requestSingleInstanceLock())
  {
    app.quit();
  }
  else
  {
    app.on("second-instance", () =>
    {
      if (mainWindow !== undefined)
      {
        if (mainWindow.isMinimized())
        {
          mainWindow.restore();
        }

        mainWindow.focus();
      }
    });
  }
}
