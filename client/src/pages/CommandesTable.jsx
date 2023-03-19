import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import * as FaIcons from 'react-icons/rx';
import * as FaIconsBootStrap from 'react-icons/fa';

function CommandesTable() {

    const navigate = useNavigate()
    const location = useLocation()
    const tableId = location.pathname.split("/")[2]

    console.log(location.pathname.split("/")[2])

    const [commande] = useState({
        numeroCommande: "",
        table: "",
        dateCommande: "",
        statutCommande: ""
    });

    console.log(commande);

    const { numeroTable } = useParams();

    console.log("numeroTable: " + numeroTable)

    const handleClick = async (e, statut) => {
        e.preventDefault();
        try {
            await axios.post(`/commande-add/${numeroTable}`, { ...commande, statutCommande: statut });
            navigate(0);
        } catch (err) {
            console.log(err);
        }
    };

    const [commandes, setCommandes] = useState([]);

    useEffect(() => {
        const fetchAllCommandes = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/commandes/${numeroTable}`);
                setCommandes(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllCommandes();
    }, [numeroTable]);
    console.log(commandes);

    const { numeroCommande } = useParams();

    console.log("n°commande: " + numeroCommande);

    const goingBack = async e => {
        navigate(-1);
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:5000/commande-delete/" + id)
            navigate(0);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <React.Fragment>
            <section className="h-screen">
                <h1 className="m-auto text-center text-3xl font-bold mt-10">Commandes de la table {tableId} </h1>
                <div>
                    <button onClick={goingBack} className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2">
                        <div><FaIcons.RxArrowLeft size={40} /></div>
                    </button>
                </div>
                <div className='m-auto mt-15 mb-5 p-2 flex justify-center'>
                    <div className='bg-bleu w-72 h-72 rounded-xl text-white shadow-2xl left-96 top-16 transition duration-500 transform hover:-translate-y-4 cursor-pointer' onClick={(e) => handleClick(e, "Sur place")}>
                        <div className='justify-center flex pt-12'><FaIconsBootStrap.FaChair size={125} /></div>
                        <div className='text-center text-white text-5xl mt-5'>
                            <p className='font-bold'>Sur place</p>
                        </div>
                    </div>
                    <div className='bg-rouge2 w-72 h-72 ml-5 rounded-xl text-white shadow-2xl left-96 top-16 transition duration-500 transform hover:-translate-y-4 cursor-pointer' onClick={(e) => handleClick(e, "A emporter")}>
                        <div className='justify-center flex pt-12'><FaIconsBootStrap.FaHandHolding size={125} /></div>
                        <div className='text-center text-white text-5xl mt-5'>
                            <p className='font-bold'>A emporter</p>
                        </div>
                    </div>
                </div>
                <thead className="bg-bleu items-center">
                    <tr>
                        <th
                            scope="col"
                            className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-white w-full">
                            N° Commande
                        </th>
                        <th
                            scope="col"
                            className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-white w-full">
                            Statut
                        </th>
                        <th
                            scope="col"
                            className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-white w-full">
                            Date commande
                        </th>
                        <th scope="col" className="relative py-3 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                {commandes.map((commande) => (
                    <tr key={commande.numeroCommande}>
                        <td className="whitespace-nowrap px-8 py-4 text-xl text-black border-solid border-2 bg-white">{commande.numeroCommande}</td>
                        <td className="whitespace-nowrap px-8 py-4 text-xl text-black border-solid border-2 bg-white">{commande.statutCommande}</td>
                        <td className="whitespace-nowrap px-8 py-4 text-xl text-black border-solid border-2 bg-white">{new Date(commande.dateCommande).toLocaleString()}</td>
                        <td className="whitespace-nowrap px-8 py-4 text-xl text-black border-solid border-2 bg-white">
                            <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                                <Link to={`/HistoriqueCommandeTable/${commande.numeroCommande}`}>
                                    <FaIconsBootStrap.FaEye size={24} />
                                </Link>
                            </button>
                            <button onClick={() => handleDelete(commande.numeroCommande)} className="text-white bg-rouge2 hover:bg-gris duration-500 rounded-md mr-2 p-1">
                                <FaIconsBootStrap.FaTrashAlt size={24} />
                            </button>
                        </td>
                    </tr>
                ))}
            </section>
        </React.Fragment >
    )
}

export default CommandesTable