/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import { mdiAccount, mdiFireExtinguisher, mdiMenu, mdiSeat } from '@mdi/js';


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
    
<div className="w-10 h-10 bg-slate-200">
<p><Icon path={mdiSeat} />ICONE TEST</p>

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