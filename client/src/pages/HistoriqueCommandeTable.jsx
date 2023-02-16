import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import * as FaIcons from 'react-icons/rx';
import * as FaIconsBootStrap from 'react-icons/fa';

function HistoriqueCommandeTable() {

    const navigate = useNavigate()
    const location = useLocation()
    const commandeId = location.pathname.split("/")[2]

    console.log(location.pathname.split("/")[2])

    const [commande, setCommande] = useState({
        commande: "",
        platCommande: "",
        quantitePlat: "",
    });

    const handleChange = (e) => {
        setCommande(prev => ({ ...prev, [e.target.name]: e.target.value }))
    };

    console.log(commande);

    const handleClick = async e => {
        e.preventDefault()
        try {
            await axios.post(`http://localhost:5000/commande-plat-add/${numeroCommande}`, commande)
            navigate(0);
        } catch (err) {
            console.log(err);
        }
    };

    const goingBack = async e => {
        navigate(-1);
    }

    const [show, setShow] = useState(false);

    const [historiquecommande, setHistoriqueCommande] = useState([]);

    const { numeroCommande } = useParams();

    console.log("numéro: " + numeroCommande);

    useEffect(() => {
        const fetchHistoriqueCommande = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/historique-commandes/${numeroCommande}`);
                setHistoriqueCommande(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchHistoriqueCommande();
    }, [numeroCommande]);

    console.log(historiquecommande);

    return (
        <React.Fragment>
            <section>
                <h1 className="m-auto text-center text-3xl font-bold mt-10">Ticket de la commande n° {commandeId} </h1>
                <div>
                    <button onClick={goingBack} className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2">
                        <div><FaIcons.RxArrowLeft size={40} /></div>
                    </button>
                </div>
                <div className='w-2/4 bg-gray-50 border border-gris rounded-xl m-auto mt-20 mb-5 p-2 shadow-2xl left-96 top-16'>
                    <h1 className="m-auto text-center text-3xl font-bold mt-2">Ajouter un plat</h1>
                    <div className='m-auto mt-2 mb-5 p-2 flex flex-col justify-center items-center'>
                        <div className='form'>
                            <div className='flex'>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"> Plat</label>
                                    <input type="text" name="platCommande" onChange={handleChange} className='bg-gray-50 border border-gris text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-bleu block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" form-control' />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"> Quantitée</label>
                                    <input type="number" name="quantitePlat" onChange={handleChange} className='bg-gray-50 border border-gris text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-bleu block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" form-control' />
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
                <thead className="bg-gray-50 items-center">
                    <tr>
                        <th
                            scope="col"
                            className="py-3 pl-4 pr-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 w-full">
                            N° Commande
                        </th>
                        <th
                            scope="col"
                            className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500 w-full">
                            Plat
                        </th>
                        <th
                            scope="col"
                            className="px-20 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500 w-full">
                            Quantitée
                        </th>
                        <th scope="col" className="relative py-3 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                {historiquecommande.map((histoCommande) => (
                    <tr key={historiquecommande.commande}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 border-solid border-2">{histoCommande.commande}</td>
                        <td className="whitespace-nowrap px-8 py-4 text-sm text-gray-500 border-solid border-2">{histoCommande.platCommande}</td>
                        <td className="whitespace-nowrap px-10 py-4 text-sm text-gray-500 border-solid border-2">{histoCommande.quantitePlat}</td>
                        <td className="whitespace-nowrap px-10 py-4 text-sm text-gray-500 border-solid border-2">
                            <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                                <FaIconsBootStrap.FaTrashAlt size={16} />
                            </button>
                        </td>
                    </tr>
                ))}
            </section>
        </React.Fragment >
    )
}

export default HistoriqueCommandeTable