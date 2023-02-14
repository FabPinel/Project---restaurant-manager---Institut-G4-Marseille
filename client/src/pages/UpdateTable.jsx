import React from 'react'
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import * as FaIcons from 'react-icons/rx';

function UpdateTable() {

    const navigate = useNavigate()
    const location = useLocation()
    const tableId = location.pathname.split("/")[2]

    console.log(location.pathname.split("/")[2])

    const [table, setTable] = useState({
        placeTable: "",
        salle: "",
        statutTable: "",
    });


    const handleChange = (e) => {
        setTable(prev => ({ ...prev, [e.target.name]: e.target.value }))
    };

    console.log(table);

    const handleClick = async e => {
        e.preventDefault()
        try {
            await axios.put("http://localhost:5000/tableUpdate/" + tableId, table)
            navigate("/Salle");
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <React.Fragment>
            <section>
                <h1 className="m-auto text-center text-3xl font-bold mt-10">Modification de la table {tableId} </h1>
                <div>
                    <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2"><Link to={`/Salle`}>
                        <div><FaIcons.RxArrowLeft size={40} /></div>
                    </Link></button>
                </div>
                <div className='w-60 bg-gray-50 border border-gris rounded-xl m-auto mt-20 mb-5 p-2'>
                    <div className='m-auto mt-2 mb-5 p-2 flex flex-col justify-center items-center'>
                        <div className='form'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Nombre de couverts: </label>
                            <input type="number" name="placeTable" onChange={handleChange} className='bg-gray-50 border border-gris text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-bleu block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" form-control' />
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Salle: </label>
                            <input type="text" name="salle" onChange={handleChange} className='bg-gray-50 border border-gris text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-bleu block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" form-control' />
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Satut: </label>
                            <input type="text" name="statutTable" onChange={handleChange} className='bg-gray-50 border border-gris text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-bleu block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" form-control' />
                            <button onClick={handleClick} className="bg-bleu hover:bg-gris text-white font-bold py-2 px-4 rounded duration-500 mr-4 mt-4">
                                Sauvegarder
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default UpdateTable