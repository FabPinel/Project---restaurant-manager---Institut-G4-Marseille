import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
// import * as FaIcons from 'react-icons/rx';
import * as FaIconsBootStrap from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';

function Plat() {


  const [Plats, setPlats] = useState([]);

  useEffect(() => {
    const fetchAllPlats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/Plat");
        setPlats(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPlats();
  }, []);

  const navigate = useNavigate();

  const [Plat, setPlat] = useState({
    nomPlat: "",
    descriptionPlat: "",
    prixPlat: "",
    categorie: "",
  });

  const handleChange = (e) => {
    setPlat(prev => ({ ...prev, [e.target.name]: e.target.value }))
  };
  console.log(Plat);
  const handleClick = async e => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:5000/plat-add", Plat)
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  };


  const handleDelete = async (nomPlat) => {
    try {
      await axios.delete("http://localhost:5000/plat-delete/" + nomPlat)
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
                  <h1 className="m-auto text-center text-3xl font-bold mt-2">Ajouter un plat</h1>
                  <div className='m-auto mt-2 mb-5 p-2 flex flex-col justify-center items-center'>
                    <div className='form'>
                      <div className='flex'>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"> Nom du plat</label>
                          <input type="text" name="nomPlat" onChange={handleChange} className='bg-gray-50 border border-gris text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-bleu block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" form-control' />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"> description du Plat</label>
                          <input type="text" name="descriptionPlat" onChange={handleChange} className='bg-gray-50 border border-gris text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-bleu block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" form-control' />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"> Prix du plat</label>
                          <input type="number" name="prixPlat" onChange={handleChange} className='bg-gray-50 border border-gris text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-bleu block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" form-control' />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"> Catégories du plat</label>
                          <select type="text" name="categorie" onChange={handleChange} className='bg-gray-50 border border-gris text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-bleu block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" form-control' >
                            <option selected></option>
                            <option value="Accompagnement">Accompagnement</option>
                            <option value="Alcool">Alcool</option>
                            <option value="Boissons">Boissons</option>
                            <option value="Cocktail">Cocktail</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Entrées">Entrées</option>
                            <option value="Plats">Plats</option>
                          </select>
                        </div>
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
              }
              <div className='flex flex-wrap'>
                {
                  Plats.map((Plats) => (
                    <div className='w-full' key={Plats.nomPlat}>
                      <div className='bg-gray-50 mr-10 border border-gris rounded-xl mt-20 p-1'>
                        <p className='text-bleu text-center text-2xl'>{Plats.nomPlat}</p>
                      </div>
                      <div className='bg-gray-50 text-right mr-10 border border-gris rounded-xl mt-1'>
                        <p className='text-bleu text-center text-2xl'>Catégories : {Plats.categorie}</p>
                        <p className='text-bleu text-center text-2xl'>Description : {Plats.descriptionPlat}</p>
                        <p className='text-bleu text-center text-2xl'>Prix {Plats.prixPlat}</p>
                        <div className='w-full flex justify-center p-2'>
                                            <img className='border rounded-xl' src={Plats.imgPlat} alt="" />
                                        </div>
                        
                        <div className='flex justify-center p-1'>
                          <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                            <Link to={`/PlatUpdate/${Plats.idPlat}`}>
                              <FaIconsBootStrap.FaPencilAlt size={16} />
                            </Link>
                          </button>
                          <button onClick={() => handleDelete(Plats.nomPlat)} className="text-white bg-bleu hover:bg-gris duration-500 rounded-md text-center p-1">
                            <FaIconsBootStrap.FaTrashAlt size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
        
      </section>
      </React.Fragment>
  )
              }
export default Plat