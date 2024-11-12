import React from "react";
import { withScreenShotTest } from "./main/withShot";

function App() {
  return withScreenShotTest(
    [
      {
        component: () => <div>Hey there</div>,
        title: 'It is a text',
        id: 't1'
      },
      {
        component: () => <div style={{height:100,width:130,backgroundColor:'lightgreen'}} />,
        title: 'It is a div',
        id: 't2'
      }
    ]
  )
}

export default App;
