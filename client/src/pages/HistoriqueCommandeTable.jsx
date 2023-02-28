import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import * as FaIcons from 'react-icons/rx';
import * as FaIconsBootStrap from 'react-icons/fa';

function HistoriqueCommandeTable() {
    const [toggleState, setToggleState] = useState(1);
    const navigate = useNavigate()
    const location = useLocation()
    const commandeId = location.pathname.split("/")[2]
    const [historiquecommande, setHistoriqueCommande] = useState([]);
    const { numeroCommande } = useParams();

    console.log(location.pathname.split("/")[2])

    const [platsCommande, setPlatsCommande] = useState([]);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    useEffect(() => {
        const fetchAllPlatsCommande = async () => {
            try {
                const res = await axios.get("http://localhost:5000/plats-commande");
                setPlatsCommande(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllPlatsCommande();
    }, []);


    const addPlat = async (plat) => {
        const platExiste = await axios.get(`/commande-plat/${numeroCommande}/${plat}`);
        if (platExiste.data.length > 0) {
            const quantite = platExiste.data[0].quantitePlat + 1;
            axios.put(`/commande-plat-update/${numeroCommande}/${plat}`, {
                quantitePlat: quantite,
            })
                .then((response) => {
                    navigate(0);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            axios.post(`/commande-plat-add/${numeroCommande}`, {
                platCommande: plat,
                quantitePlat: 1,
            })
                .then((response) => {
                    navigate(0);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    const addQuantite = async (plat) => {
        const platExiste = await axios.get(`/commande-plat/${numeroCommande}/${plat}`);
        if (platExiste.data.length >= 0) {
            const quantite = platExiste.data[0].quantitePlat + 1;
            axios.put(`/commande-plat-update/${numeroCommande}/${plat}`, {
                quantitePlat: quantite,
            })
                .then((response) => {
                    navigate(0);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    const deleteQuantite = async (plat) => {
        const platExiste = await axios.get(`/commande-plat/${numeroCommande}/${plat}`);
        if (platExiste.data.length >= 0) {
            const quantite = platExiste.data[0].quantitePlat - 1;
            axios.put(`/commande-plat-update/${numeroCommande}/${plat}`, {
                quantitePlat: quantite,
            })
                .then((response) => {
                    navigate(0);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }


    const goingBack = async e => {
        navigate(-1);
    }

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

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:5000/plat-commande-delete/" + id)
            navigate(0);
        } catch (err) {
            console.log(err);
        }
    }

    const prixTotalPlats = platsCommande.map(plat => {
        const prixTotal = plat.prix * plat.quantitePlat;
        return { platCommande: plat.nomPlat, totalPrix: prixTotal };
    });

    const [totalPlatsCommande, setTotalPlatsCommande] = useState(prixTotalPlats);

    useEffect(() => {
        const fetchAllTotalPlatsCommande = async () => {
            try {
                const totalPlats = await Promise.all(historiquecommande.map(async (histoCommande) => {
                    const res = await axios.get(`/commande-plat-total/${numeroCommande}/${histoCommande.platCommande}`);
                    return { platCommande: histoCommande.platCommande, totalPrix: res.data[0].total };
                }));
                // On utilise totalPlats (récupéré depuis l'API) dans setTotalPlatsCommande au lieu de prixTotalPlats
                setTotalPlatsCommande(totalPlats);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllTotalPlatsCommande();
    }, [historiquecommande, numeroCommande]);

    const totalPrix = totalPlatsCommande.reduce((acc, plat) => acc + plat.totalPrix, 0);

    return (
        <React.Fragment>
            <section>
                <h1 className="m-auto text-center text-3xl font-bold mt-10">Commande n° {commandeId} </h1>
                <div className='bg-gray-50 border border-gris rounded-xl mt-1 flex w-28 m-auto '>
                    <div className='ml-2'>
                        <h4>TOTAL: {totalPrix}€</h4>
                    </div>
                </div>
                <div>
                    <button onClick={goingBack} className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2">
                        <div><FaIcons.RxArrowLeft size={40} /></div>
                    </button>
                </div>
                <div className="mb-2">
                    <button className={toggleState === 1 ? "tabs p-4 text-center w-28 cursor-pointer box-content relative bg-blanc border-t-4 border-rouge1 duration-500" : "p-4 text-center text-white w-28 cursor-pointer box-content relative bg-bleu border-t-4 border-blanc hover:bg-gris duration-500"}
                        onClick={() => toggleTab(1)} >
                        Pizzas
                    </button>
                    <button className={toggleState === 2 ? "tabs p-4 text-center w-28 cursor-pointer box-content relative bg-blanc border-t-4 border-rouge1 duration-500" : "p-4 text-center text-white w-28 cursor-pointer box-content relative bg-bleu border-t-4 border-blanc hover:bg-gris duration-500"}
                        onClick={() => toggleTab(2)} >
                        Pates
                    </button>
                    <button className={toggleState === 3 ? "tabs p-4 text-center w-28 cursor-pointer box-content relative bg-blanc border-t-4 border-rouge1 duration-500" : "p-4 text-center text-white w-28 cursor-pointer box-content relative bg-bleu border-t-4 border-blanc hover:bg-gris duration-500"}
                        onClick={() => toggleTab(3)} >
                        Desserts
                    </button>
                    <button className={toggleState === 4 ? "tabs p-4 text-center w-28 cursor-pointer box-content relative bg-blanc border-t-4 border-rouge1 duration-500" : "p-4 text-center text-white w-28 cursor-pointer box-content relative bg-bleu border-t-4 border-blanc hover:bg-gris duration-500"}
                        onClick={() => toggleTab(4)} >
                        Boissons
                    </button>
                </div>
                <div className={toggleState === 1 ? "content  block" : "bg-white p-5 w-full h-full hidden"} >
                    <div className='flex flex-wrap justify-center mb-2'>
                        {
                            platsCommande.map((plats) => (
                                <div onClick={() => addPlat(plats.nomPlat)} className='w-96 transition duration-500 transform hover:-translate-y-1 cursor-pointer flex flex-wrap' key={plats.nomPlat}>
                                    <div className='bg-gray-50 text-right mr-10 border border-gris rounded-xl mt-1 flex '>
                                        <div className='w-2/4'>
                                            <img className='border rounded-xl' src={plats.imgPlat} alt="" />
                                        </div>
                                        <div className='w-2/4'>
                                            <p className='text-bleu text-center text-base font-bold'>{plats.nomPlat}</p>
                                            <p className='text-bleu text-center text-xs'>{plats.descriptionPlat}</p>
                                            <p className='text-bleu text-center text-base font-bold'>{plats.prixPlat} €</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <thead className="bg-gray-50 items-center">
                    <tr>
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
                        <th
                            scope="col"
                            className="px-20 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500 w-full">
                            Prix
                        </th>
                        <th scope="col" className="relative py-3 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                {historiquecommande.map((histoCommande, index) => (
                    <tr key={index}>
                        <td className="whitespace-nowrap px-8 py-4 text-sm text-gray-500 border-solid border-2">{histoCommande.platCommande}</td>
                        <td className="whitespace-nowrap px-10 py-4 text-sm text-gray-500 border-solid border-2">
                            {histoCommande.quantitePlat}
                            <button onClick={() => addQuantite(histoCommande.platCommande)} className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1 ml-2">
                                <FaIconsBootStrap.FaRegArrowAltCircleUp size={16} />
                            </button>
                            <button onClick={() => deleteQuantite(histoCommande.platCommande)} className="text-white bg-rouge1 hover:bg-gris duration-500 rounded-md mr-2 p-1">
                                <FaIconsBootStrap.FaRegArrowAltCircleDown size={16} />
                            </button>
                        </td>
                        <td className="whitespace-nowrap px-8 py-4 text-sm text-gray-500 border-solid border-2">{totalPlatsCommande.find(plat => plat.platCommande === histoCommande.platCommande)?.totalPrix} €</td>
                        <td className="whitespace-nowrap px-10 py-4 text-sm text-gray-500 border-solid border-2">
                            <button onClick={() => handleDelete(histoCommande.id)} className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
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