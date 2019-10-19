
import { render } from "react-dom";
import React, { useState } from "react";

import "../i18n";

const App = () =>
{
  const [items, setItems] = useState([]);

  function send()
  {
    // eslint-disable-next-line no-new
    for (let i = 0; i < 100; i += 1)
    {
      window.api
        .send("test", `index ${i + 1}`)
        .then(({ uid, err, data }) =>
        {
          setItems(cur => [...cur, `${uid} - ${data}`]);

          return uid;
        })
        .catch(console.error);
    }
  }

  return (
    <div>
      <div className="lds-dual-ring"> </div>
      <div>
        <button type="button" onClick={send}>Send</button>
        <button type="button" onClick={() => setItems([])}>Clear</button>
      </div>
      <div style={{ height: 350, overflow: "scroll" }}>
        {items.map((it, index) => <div key={index}>{it}</div>)}
      </div>
    </div>
  );
};

render(<App />, document.getElementById("root"));
