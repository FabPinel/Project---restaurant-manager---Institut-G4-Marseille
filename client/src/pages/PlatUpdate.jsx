import React from 'react'
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import * as FaIcons from 'react-icons/rx';

function UpdatePlat() {

    const navigate = useNavigate()
    const location = useLocation()
    const platsId = location.pathname.split("/")[2]

    console.log(location.pathname.split("/")[2])

    const [Plat, setPlat] = useState({
      nomPlat: "",
      DescriptionPlat: "",
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
            await axios.put("http://localhost:5000/PlatUpdate/" + platsId, Plat)
            navigate("/Plat");
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <React.Fragment>
            <section>
                <h1 className="m-auto text-center text-3xl font-bold mt-10">Modification du plat {platsId} </h1>
                <div>
                    <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2">
                        <Link to={`/Plat`}>
                            <div><FaIcons.RxArrowLeft size={40} /></div>
                        </Link></button>
                </div>
                <div className='w-60 bg-gray-50 border border-gris rounded-xl m-auto mt-20 mb-5 p-2'>
                    <div className='m-auto mt-2 mb-5 p-2 flex flex-col justify-center items-center'>
                        <div className='form'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">  </label>
                            <input type="text" name="nomPlat" onChange={handleChange} className='bg-gray-50 border border-gris text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-bleu block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" form-control' />
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> </label>
                            <input type="text" name="DescriptionPlat" onChange={handleChange} className='bg-gray-50 border border-gris text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-bleu block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" form-control' />
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">  </label>
                            <input type="number" name="prixPlat" onChange={handleChange} className='bg-gray-50 border border-gris text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-bleu block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" form-control' />
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">  </label>
                            <select type="text" name="categorie" onChange={handleChange} className='bg-gray-50 border border-gris text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-bleu block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" form-control' >
                            <option value="Accompagnement">Accompagnement</option>
                            <option value="Alcool">Alcool</option>
                            <option value="Boissons">Boissons</option>
                            <option value="Cocktail">Cocktail</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Entrées">Entrées</option>
                            <option value="Plats">Plats</option>
                          </select>
                            <button onClick={handleClick} className="bg-bleu hover:bg-gris text-white font-bold py-2 px-4 rounded duration-500 mr-4 mt-4">
                                Sauvegarder
                            </button>
                            <button className="bg-rouge1 hover:bg-gris text-white font-bold py-2 px-4 rounded duration-500 mr-4 mt-4">
                                <Link to={`/Plat`}>
                                    <div>Annuler</div>
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default UpdatePlat