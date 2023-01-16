/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import { mdiAccount, mdiApple, mdiFireExtinguisher, mdiMenu, mdiMusic, mdiSeat } from '@mdi/js';
import { Example } from "./components/list";
import { Navbar } from "./components/navbar";
import { Dialog, Transition } from '@headlessui/react'

function App() {

<script src="https://cdn.tailwindcss.com/?plugins=forms,aspect-ratioE"></script>

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

    <div class="w-full h-full bg-gray-100">  {/* Mettre tous les components dans cette div */ }

< Navbar/>

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