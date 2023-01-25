import React, { useEffect, useState } from 'react'
import axios from 'axios';


const Categories = () => {
 const [categories, setCategories] = useState([]);

 useEffect(() => {
  const fetchAllCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/categories"); //le "http://localhost:5000/..." doit être équivalent à celui dans le fichier server.js
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  fetchAllCategories();
}, []);

console.log(categories);

//   fetch("/resto").then(
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
//       backendData.resto.map((user, i) => (
//         <p class="text-blue-700 text-6xl" key={i}>{user}</p>
//       ))
//     )}

/* <p class="w-10 h-10 m-auto mt-4"><Icon path={mdiMusic} /></p> */


  return (
    <React.Fragment>
        <section>
          {
          categories.map((category)=>(
            <div className="bg-yellow-200 w-40 h-40">
            {category.nom}</div>
          ))
          }
        </section>
    </React.Fragment>
  );
}

export default Categories