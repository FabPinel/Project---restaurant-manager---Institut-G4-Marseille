/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import MainPage from './components/MainPage';
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
   <React.Fragment>
     <BrowserRouter> 
    <MainPage />
     </BrowserRouter> 
   </React.Fragment>
  );
};


export default App;



// const [backendData, setBackendData] = useState([{}]);

// useEffect(() => {
//   fetch("/api").then(
//     response => response.json()
//   ).then(
//     data => { 
//       setBackendData(data)
//     }
//   )
// }, [])
//     {(typeof backendData.users === 'undefined') ? (
//       <p>Loading...</p>  
//     ): (
//       backendData.users.map((user, i) => (
//         <p class="text-blue-700 text-6xl" key={i}>{user}</p>
//       ))
//     )}

/* <p class="w-10 h-10 m-auto mt-4"><Icon path={mdiMusic} /></p> */

