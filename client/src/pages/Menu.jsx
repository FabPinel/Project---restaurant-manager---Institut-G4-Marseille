import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
// import * as FaIcons from 'react-icons/rx';
import * as FaIconsBootStrap from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom'

function Menu() {

  const [Menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchAllMenu = async () => {
      try {
        const res = await axios.get("http://localhost:5000/Menu");
        setMenus(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllMenu();
  }, []);

  const navigate = useNavigate();

  const [Menu, setMenu] = useState({
    menu: "",
    platMenu: "",
  });

  const handleChange = (e) => {
    setMenu(prev => ({ ...prev, [e.target.name]: e.target.value }))
  };
  console.log(Menu);
  const handleClick = async e => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:5000/Menu-add", Menu)
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  };


  const handleDelete = async (Menu) => {
    try {
      await axios.delete("http://localhost:5000/Menu-delete/" + Menu)
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  };
  
  const [show, setShow] = useState(false);
  return (
    <React.Fragment>
    <section>
    <div className="flex-grow">
        <div className='bg-gray-50 w-1/6 text-right border '>
        </div>
        <button onClick={() => setShow(!show)} className="bg-bleu hover:bg-gris text-white font-bold py-2 px-4 rounded duration-500 mr-4 ml-4">
          Ajouter
        </button>
    
        {show &&
          <div className='w-auto bg-gray-50 border border-gris rounded-xl m-auto mt-20 mb-5 p-2 absolute shadow-2xl left-96 top-16'>
            <h1 className="m-auto text-center text-3xl font-bold mt-2">Créer son menu</h1>
            <div className='m-auto mt-2 mb-5 p-2 flex flex-col justify-center items-center'>
              <div className='form'>
                <div className='flex'>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"> type de menu</label>
                    <select type="text" name="menu" onChange={handleChange} className='bg-gray-50 border border-gris text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-bleu block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" form-control' >
                      <option selected value="Menu du jour">Menu du jour</option>
                      <option value="Carte du restaurant">Carte du restaurant</option>
                      </select>
                
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"> Plats dans le menu</label>
                    <input type="text" name="platMenu" onChange={handleChange} className='bg-gray-50 border border-gris text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-bleu block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" form-control' />
                  </div>

                <div className="text-center">
                  <button onClick={handleClick} className="bg-bleu hover:bg-gris text-white font-bold py-2 px-4 rounded duration-500 mr-4 mt-4">
                    Ajouter
                  </button>
                  <button onClick={() => setShow(!show)} className="bg-rouge1 hover:bg-gris text-white font-bold py-2 px-4 rounded duration-500 mr-4 mt-4">
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
       
        
      </div>
    </div>
    } </div>
    <div className='flex flex-wrap'>
          {
            Menus.map((Menus) => (
              <div className='w-full' key={Menus.menu}>
                <div className='bg-gray-50 mr-10 border border-gris rounded-xl mt-20 p-1'>
                  <p className='text-bleu text-center text-2xl'>{Menus.menu}</p>
                </div>
                <div className='bg-gray-50 text-right mr-10 border border-gris rounded-xl mt-1'>
                  <p className='text-bleu text-center text-2xl'>Plats : {Menus.platMenu}</p>
                  <div className='flex justify-center p-1'>
                    <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                      <Link to={`/PlatUpdate/${Menus.idPlat}`}>
                        <FaIconsBootStrap.FaPencilAlt size={16} />
                      </Link>
                    </button>
                    <button onClick={() => handleDelete(Menus.nomMenu)} className="text-white bg-bleu hover:bg-gris duration-500 rounded-md text-center p-1">
                      <FaIconsBootStrap.FaTrashAlt size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        
        
  </section>
  </React.Fragment>
        
)
        }


export default Menu 