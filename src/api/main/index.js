
import WebSocket from "ws";

export default function initialize(port)
{
  const wss = new WebSocket.Server({ port });
  wss.addListener("connection", ws =>
  {
    console.log(`Socket server connected on port ${port}`);

    ws.on("message", message =>
    {
      const { uid, channel, data } = JSON.parse(message);
      console.log(`server received message ${uid} for the ${channel} channel`);

      const result = `${data} - ${(new Date()).getTime()}`;
      ws.send(JSON.stringify({ uid, data: result }));
    });
  });
}
