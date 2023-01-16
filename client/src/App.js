/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import { mdiAccount, mdiApple, mdiFireExtinguisher, mdiMenu, mdiMusic, mdiSeat } from '@mdi/js';
import { Example } from "./components/list";

function App() {

const [backendData, setBackendData] = useState([{}]);

useEffect(() => {
  fetch("/api").then(
    response => response.json()
  ).then(
    data => { 
      setBackendData(data)
    }
  )
}, [])

  return (
    
<div className="w-full  bg-slate-200">  {/* Mettre tous les components dans cette div */ }

<p class="w-10 h-10 m-auto mt-4"><Icon path={mdiMusic} /></p>

 {(typeof backendData.users === 'undefined') ? (
  <p>Loading...</p>  
 ): (
  backendData.users.map((user, i) => (
    <p class="text-blue-700 text-6xl" key={i}>{user}</p>
  ))
 )}


</div>



  )
}


export default App;