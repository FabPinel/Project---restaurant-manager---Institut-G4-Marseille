import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as FaIconsBootStrap from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';

function Plat() {

  const [toggleState, setToggleState] = useState(1);
  const [Plats, setPlats] = useState([]);
  const [Categories, setCategories] = useState([]);

  const toggleTab = (index) => {
    setToggleState(index);
  };

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

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/categorie-plat");
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCategories();
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
      <section className="h-screen">
        <div className="flex-grow">
          <div className="mb-2">
            <button className={toggleState === 1 ? "tabs p-4 text-center w-28 cursor-pointer box-content relative bg-blanc border-t-4 border-rouge1 duration-500" : "p-4 text-center text-white w-28 cursor-pointer box-content relative bg-bleu border-t-4 border-blanc hover:bg-gris duration-500"}
              onClick={() => toggleTab(1)} >
              Pizzas
            </button>
            <button className={toggleState === 2 ? "tabs p-4 text-center w-28 cursor-pointer box-content relative bg-blanc border-t-4 border-rouge1 duration-500" : "p-4 text-center text-white w-28 cursor-pointer box-content relative bg-bleu border-t-4 border-blanc hover:bg-gris duration-500"}
              onClick={() => toggleTab(2)} >
              Pâtes
            </button>
            <button className={toggleState === 3 ? "tabs p-4 text-center w-28 cursor-pointer box-content relative bg-blanc border-t-4 border-rouge1 duration-500" : "p-4 text-center text-white w-28 cursor-pointer box-content relative bg-bleu border-t-4 border-blanc hover:bg-gris duration-500"}
              onClick={() => toggleTab(3)} >
              Desserts
            </button>
            <button className={toggleState === 4 ? "tabs p-4 text-center w-28 cursor-pointer box-content relative bg-blanc border-t-4 border-rouge1 duration-500" : "p-4 text-center text-white w-28 cursor-pointer box-content relative bg-bleu border-t-4 border-blanc hover:bg-gris duration-500"}
              onClick={() => toggleTab(4)} >
              Salades
            </button>
            <button className={toggleState === 5 ? "tabs p-4 text-center w-28 cursor-pointer box-content relative bg-blanc border-t-4 border-rouge1 duration-500" : "p-4 text-center text-white w-28 cursor-pointer box-content relative bg-bleu border-t-4 border-blanc hover:bg-gris duration-500"}
              onClick={() => toggleTab(5)} >
              Boissons
            </button>
          </div>

          <button onClick={() => setShow(!show)} className="bg-bleu hover:bg-gris text-white font-bold py-2 px-4 rounded duration-500 mr-4 ml-4">
            Ajouter
          </button>

          {show &&
            <div className='w-auto bg-gray-50 border border-gris rounded-xl mt-20 mb-5 p-2 absolute shadow-2xl left-96 top-16 z-10'>
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
                      <select name="categorie" onChange={handleChange} className='bg-gray-50 border border-gris text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-bleu block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" form-control'>
                        <option disabled selected> Veuillez sélectionner une catégorie </option>
                        {Categories.map((categoriePlat) => (
                          <option key={categoriePlat.id} value={categoriePlat.nom}>
                            {categoriePlat.nom}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"> Image du plat</label>
                      <input type="text" name="imgPlat" onChange={handleChange} className='bg-gray-50 border border-gris text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-bleu block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" form-control' />
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
          <div className={toggleState === 1 ? "content  block" : "bg-white p-5 w-full h-full hidden"} >
            <div className='flex flex-wrap'>
              {
                Plats.filter(Plats => Plats.categorie.includes("Pizzas")).sort((a, b) => a.nomPlat.localeCompare(b.nomPlat)).map((Plats) => (
                  <div className='w-96 transition duration-500 transform hover:-translate-y-1 cursor-pointer' key={Plats.nomPlat}>
                    <div className='cursor-pointer flex flex-wrap' >
                      <div className='bg-gray-50 text-right mr-10 border border-gris rounded-xl mt-1 flex '>
                        <div className='w-2/4'>
                          <img className='border rounded-xl' src={Plats.imgPlat} alt="" />
                        </div>
                        <div className='w-2/4'>
                          <p className='text-bleu text-center text-base font-bold'>{Plats.nomPlat}</p>
                          <p className='text-bleu text-center text-xs'>{Plats.descriptionPlat}</p>
                          <p className='text-bleu text-center text-base font-bold'>{Plats.prixPlat}</p>
                        </div>
                      </div>
                    </div>
                    <div className='flex justify-center p-1'>
                      <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                        <Link to={`/ContenirPlat/${Plats.nomPlat}`}>
                          <FaIconsBootStrap.FaList size={16} />
                        </Link>
                      </button>
                      <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                        <Link to={`/PlatUpdate/${Plats.nomPlat}`}>
                          <FaIconsBootStrap.FaPencilAlt size={16} />
                        </Link>
                      </button>
                      <button onClick={() => handleDelete(Plats.nomPlat)} className="text-white bg-rouge2 hover:bg-gris duration-500 rounded-md text-center p-1">
                        <FaIconsBootStrap.FaTrashAlt size={16} />
                      </button>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          <div className={toggleState === 2 ? "content  block" : "bg-white p-5 w-full h-full hidden"} >
            <div className='flex flex-wrap'>
              {
                Plats.filter(Plats => Plats.categorie.includes("Pâtes")).sort((a, b) => a.nomPlat.localeCompare(b.nomPlat)).map((Plats) => (
                  <div className='w-96 transition duration-500 transform hover:-translate-y-1 cursor-pointer' key={Plats.nomPlat}>
                    <div className='cursor-pointer flex flex-wrap' >
                      <div className='bg-gray-50 text-right mr-10 border border-gris rounded-xl mt-1 flex '>
                        <div className='w-2/4'>
                          <img className='border rounded-xl' src={Plats.imgPlat} alt="" />
                        </div>
                        <div className='w-2/4'>
                          <p className='text-bleu text-center text-base font-bold'>{Plats.nomPlat}</p>
                          <p className='text-bleu text-center text-xs'>{Plats.descriptionPlat}</p>
                          <p className='text-bleu text-center text-base font-bold'>{Plats.prixPlat}</p>
                        </div>
                      </div>
                    </div>
                    <div className='flex justify-center p-1'>
                      <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                        <Link to={`/ContenirPlat/${Plats.nomPlat}`}>
                          <FaIconsBootStrap.FaList size={16} />
                        </Link>
                      </button>
                      <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                        <Link to={`/PlatUpdate/${Plats.idPlat}`}>
                          <FaIconsBootStrap.FaPencilAlt size={16} />
                        </Link>
                      </button>
                      <button onClick={() => handleDelete(Plats.nomPlat)} className="text-white bg-rouge2 hover:bg-gris duration-500 rounded-md text-center p-1">
                        <FaIconsBootStrap.FaTrashAlt size={16} />
                      </button>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className={toggleState === 3 ? "content  block" : "bg-white p-5 w-full h-full hidden"} >
          <div className='flex flex-wrap'>
            {
              Plats.filter(Plats => Plats.categorie.includes("Dessert")).sort((a, b) => a.nomPlat.localeCompare(b.nomPlat)).map((Plats) => (
                <div className='w-96 transition duration-500 transform hover:-translate-y-1 cursor-pointer' key={Plats.nomPlat}>
                  <div className='cursor-pointer flex flex-wrap' >
                    <div className='bg-gray-50 text-right mr-10 border border-gris rounded-xl mt-1 flex '>
                      <div className='w-2/4'>
                        <img className='border rounded-xl' src={Plats.imgPlat} alt="" />
                      </div>
                      <div className='w-2/4'>
                        <p className='text-bleu text-center text-base font-bold'>{Plats.nomPlat}</p>
                        <p className='text-bleu text-center text-xs'>{Plats.descriptionPlat}</p>
                        <p className='text-bleu text-center text-base font-bold'>{Plats.prixPlat}</p>
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-center p-1'>
                    <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                      <Link to={`/ContenirPlat/${Plats.nomPlat}`}>
                        <FaIconsBootStrap.FaList size={16} />
                      </Link>
                    </button>
                    <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                      <Link to={`/PlatUpdate/${Plats.idPlat}`}>
                        <FaIconsBootStrap.FaPencilAlt size={16} />
                      </Link>
                    </button>
                    <button onClick={() => handleDelete(Plats.nomPlat)} className="text-white bg-rouge2 hover:bg-gris duration-500 rounded-md text-center p-1">
                      <FaIconsBootStrap.FaTrashAlt size={16} />
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className={toggleState === 4 ? "content  block" : "bg-white p-5 w-full h-full hidden"} >
          <div className='flex flex-wrap'>
            {
              Plats.filter(Plats => Plats.categorie.includes("Salade")).sort((a, b) => a.nomPlat.localeCompare(b.nomPlat)).map((Plats) => (
                <div className='w-96 transition duration-500 transform hover:-translate-y-1 cursor-pointer' key={Plats.nomPlat}>
                  <div className='cursor-pointer flex flex-wrap' >
                    <div className='bg-gray-50 text-right mr-10 border border-gris rounded-xl mt-1 flex '>
                      <div className='w-2/4'>
                        <img className='border rounded-xl' src={Plats.imgPlat} alt="" />
                      </div>
                      <div className='w-2/4'>
                        <p className='text-bleu text-center text-base font-bold'>{Plats.nomPlat}</p>
                        <p className='text-bleu text-center text-xs'>{Plats.descriptionPlat}</p>
                        <p className='text-bleu text-center text-base font-bold'>{Plats.prixPlat}</p>
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-center p-1'>
                    <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                      <Link to={`/ContenirPlat/${Plats.nomPlat}`}>
                        <FaIconsBootStrap.FaList size={16} />
                      </Link>
                    </button>
                    <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                      <Link to={`/PlatUpdate/${Plats.idPlat}`}>
                        <FaIconsBootStrap.FaPencilAlt size={16} />
                      </Link>
                    </button>
                    <button onClick={() => handleDelete(Plats.nomPlat)} className="text-white bg-rouge2 hover:bg-gris duration-500 rounded-md text-center p-1">
                      <FaIconsBootStrap.FaTrashAlt size={16} />
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className={toggleState === 5 ? "content  block" : "bg-white p-5 w-full h-full hidden"} >
          <div className='flex flex-wrap'>
            {
              Plats.filter(Plats => Plats.categorie.includes("Boissons")).sort((a, b) => a.nomPlat.localeCompare(b.nomPlat)).map((Plats) => (
                <div className='w-96 transition duration-500 transform hover:-translate-y-1 cursor-pointer' key={Plats.nomPlat}>
                  <div className='cursor-pointer flex flex-wrap' >
                    <div className='bg-gray-50 text-right mr-10 border border-gris rounded-xl mt-1 flex '>
                      <div className='w-2/4'>
                        <img className='border rounded-xl' src={Plats.imgPlat} alt="" />
                      </div>
                      <div className='w-2/4'>
                        <p className='text-bleu text-center text-base font-bold'>{Plats.nomPlat}</p>
                        <p className='text-bleu text-center text-xs'>{Plats.descriptionPlat}</p>
                        <p className='text-bleu text-center text-base font-bold'>{Plats.prixPlat}</p>
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-center p-1'>
                    <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                      <Link to={`/ContenirPlat/${Plats.nomPlat}`}>
                        <FaIconsBootStrap.FaList size={16} />
                      </Link>
                    </button>
                    <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                      <Link to={`/PlatUpdate/${Plats.idPlat}`}>
                        <FaIconsBootStrap.FaPencilAlt size={16} />
                      </Link>
                    </button>
                    <button onClick={() => handleDelete(Plats.nomPlat)} className="text-white bg-rouge2 hover:bg-gris duration-500 rounded-md text-center p-1">
                      <FaIconsBootStrap.FaTrashAlt size={16} />
                    </button>
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