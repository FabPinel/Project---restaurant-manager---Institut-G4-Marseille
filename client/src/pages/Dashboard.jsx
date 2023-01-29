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
          <div>
          <div className='flex justify-between mt-10 h-64'>
            <div className='w-2/6 ml-10 border border-gris rounded-xl'>
              <h1 className='text-2xl text-center mb-8'>PROCHAIN SERVICE</h1>
          {
          categories.map((category)=>(
            <p className="text-bleu text-center self-start text-xl">
            {category.nom}</p>
          ))
          }
            </div>
          <div className='w-2/6 text-right mr-10 border border-gris rounded-xl'>
            <p className='text-bleu text-center text-2xl'>MENU DU JOUR</p>
          </div>
          </div>
          <div className='w-full h-80 border-double border-8 border-rouge1 mt-10'>test div planning</div>
          </div>
        </section>
    </React.Fragment>
  );
}

export default Categories