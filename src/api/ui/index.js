
import uuid from "uuid/v4";

let socket;
const requestIds = {};

export function send(channel, data)
{
  const uid = uuid();

  return new Promise((resolve, reject) =>
  {
    requestIds[uid] = { resolve, reject };

    console.log(`client sending message id ${uid} on ${channel} channel`);
    socket.send(JSON.stringify({ uid, channel, data }));
  });
}

export function initialize(port)
{
  socket = new WebSocket(`ws://localhost:${port}/`);

  socket.onopen = ev =>
  {
    console.log(`client connected on port ${port}`);
  };

  socket.onmessage = ev =>
  {
    const { error, uid, data } = JSON.parse(ev.data);
    const { resolve, reject } = requestIds[uid];

    if (error)
    {
      const err = new Error(error);
      err.uid = uid;

      reject(err);
    }
    else
    {
      resolve({ uid, data });
    }

    delete requestIds[uid];
  };
}
