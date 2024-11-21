import React from "react";
import { useScreenShotTest } from "./main/withShot";

function App() {
  return useScreenShotTest(
    [
      {
        component: () => <div style={{color:'cyan'}}>Hey there</div>,
        title: 'It is a text',
        id: 't1'
      },
      {
        component: () => <div style={{height:100,width:130,backgroundColor:'lightgreen'}} />,
        title: 'It is a div',
        id: 't2'
      },
    ]
  )
}

export default App;
