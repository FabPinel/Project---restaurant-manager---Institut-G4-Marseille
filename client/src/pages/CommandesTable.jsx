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
    });

    console.log(commande);

    const { numeroTable } = useParams();

    console.log("numeroTable: " + numeroTable)

    const handleClick = async e => {
        e.preventDefault()
        try {
            await axios.post(`/commande-add/${numeroTable}`, commande)
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

    return (
        <React.Fragment>
            <section>
                <h1 className="m-auto text-center text-3xl font-bold mt-10">Commandes de la table {tableId} </h1>
                <div>
                    <button onClick={goingBack} className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2">
                        <div><FaIcons.RxArrowLeft size={40} /></div>
                    </button>
                </div>
                <button onClick={handleClick} className="bg-bleu hover:bg-gris text-white font-bold py-2 pFaRegClipboardx-4 rounded duration-500 mr-4 ml-4">
                    <div className="flex">
                        Ajouter <div><FaIconsBootStrap.FaRegClipboard size={20} /></div>
                    </div>
                </button>
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
                            Table
                        </th>
                        <th
                            scope="col"
                            className="px-20 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500 w-full">
                            Date commande
                        </th>
                        <th scope="col" className="relative py-3 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                {commandes.map((commande) => (
                    <tr key={commande.numeroCommande}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 border-solid border-2">{commande.numeroCommande}</td>
                        <td className="whitespace-nowrap px-8 py-4 text-sm text-gray-500 border-solid border-2">{commande.table}</td>
                        <td className="whitespace-nowrap px-10 py-4 text-sm text-gray-500 border-solid border-2">{commande.dateCommande}</td>
                        <td className="whitespace-nowrap px-10 py-4 text-sm text-gray-500 border-solid border-2">
                            <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                                <Link to={`/HistoriqueCommandeTable/${commande.numeroCommande}`}>
                                    <FaIconsBootStrap.FaEye size={16} />
                                </Link>
                            </button>
                        </td>
                    </tr>
                ))}
            </section>
        </React.Fragment >
    )
}

export default CommandesTable