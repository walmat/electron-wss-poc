
module.exports =
  {
    packagerConfig:
    {

    },
    makers: [
      {
        name: "@electron-forge/maker-squirrel",
        config:
        {
          name: "ProdigyDesktop"
        }
      },
      {
        name: "@electron-forge/maker-zip",
        platforms:
          [
            "darwin"
          ]
      },
      {
        name: "@electron-forge/maker-deb",
        config: {}
      },
      {
        name: "@electron-forge/maker-rpm",
        config: {}
      }
    ],
    plugins:
      [
        [
          "@electron-forge/plugin-webpack",
          {
            mainConfig: "./configs/webpack.main.config.js",
            renderer:
            {
              config: "./configs/webpack.renderer.config.js",
              entryPoints:
                [
                  {
                    html: "./src/ui/index.html",
                    js: "./src/ui/index.js",
                    name: "main_window",
                    preload:
                    {
                      js: "./src/ui/preload.js"
                    }
                  }
                ]
            }
          }
        ]
      ]
  };
