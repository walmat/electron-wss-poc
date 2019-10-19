
import { initialize, send } from "../api/ui";

window.api =
  {
    send
  };

initialize(process.env.WS_PORT);
