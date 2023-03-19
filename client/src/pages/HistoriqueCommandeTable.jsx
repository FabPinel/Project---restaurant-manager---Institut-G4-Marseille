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
    const [allStocks, setAllStocks] = useState([]);
    const [commande, setCommande] = useState({});

    console.log("statutcommande:" + commande.statutCommande);
    console.log(location.pathname.split("/")[2])

    const [platsCommande, setPlatsCommande] = useState([]);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    useEffect(() => {
        const fetchAllPlatsCommande = async () => {
            try {
                const res = await axios.get("http://localhost:5000/pizza-tomate");
                setPlatsCommande(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllPlatsCommande();
    }, []);

    useEffect(() => {
        const fetchAllCommande = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/commande-get/${commandeId}`);
                setCommande(res.data[0]);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllCommande();
    }, [commandeId]);

    useEffect(() => {
        const fetchStock = async () => {
            try {
                const res = await axios.get("http://localhost:5000/get-stocks");
                setAllStocks(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchStock();
    }, []);

    const [pizzaCreme, setPizzaCreme] = useState([]);

    useEffect(() => {
        const fetchAllPizzaCreme = async () => {
            try {
                const res = await axios.get("http://localhost:5000/pizza-creme");
                setPizzaCreme(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllPizzaCreme();
    }, []);


    const [pates, setPates] = useState([]);

    useEffect(() => {
        const fetchAllPates = async () => {
            try {
                const res = await axios.get("http://localhost:5000/pates");
                setPates(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllPates();
    }, []);

    const [salades, setSalades] = useState([]);

    useEffect(() => {
        const fetchAllSalades = async () => {
            try {
                const res = await axios.get("http://localhost:5000/salades");
                setSalades(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllSalades();
    }, []);

    const [desserts, setDesserts] = useState([]);

    useEffect(() => {
        const fetchAllDesserts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/desserts-gourmant");
                setDesserts(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllDesserts();
    }, []);

    const [dessertsGlace, setDessertsGlace] = useState([]);

    useEffect(() => {
        const fetchAllDessertsGlace = async () => {
            try {
                const res = await axios.get("http://localhost:5000/desserts-glace");
                setDessertsGlace(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllDessertsGlace();
    }, []);

    const [boissons, setBoissons] = useState([]);

    useEffect(() => {
        const fetchAllBoissons = async () => {
            try {
                const res = await axios.get("http://localhost:5000/boissons");
                setBoissons(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllBoissons();
    }, []);

    const addPlat = async (plat) => {
        const platExiste = await axios.get(`/commande-plat/${numeroCommande}/${plat}`);
        const platClic = await axios.get(`/plat-get/${plat}`);
        if (platExiste.data.length > 0) {
            const quantite = platExiste.data[0].quantitePlat + 1;
            axios.put(`/commande-plat-update/${numeroCommande}/${plat}`, {
                quantitePlat: quantite,
            })
                .then(async (response) => {
                    console.log(response.data);
                    // Soustraire les ingrédients et leur quantité au stock
                    const ingredients = await axios.get(`http://localhost:5000/ingredients-plat/${plat}`);
                    const newStocks = [...allStocks];
                    ingredients.data.forEach(({ ingredient, quantite }) => {
                        const index = newStocks.findIndex((item) => item.nomIngredient === ingredient);
                        if (index !== -1) {
                            newStocks[index].stock -= quantite;
                            axios.put(`http://localhost:5000/update-stock/${ingredient}`, { stock: newStocks[index].stock });
                        }
                    });
                    if (platClic.data[0].categorie === `Pizzas - Tomate` || platClic.data[0].categorie === `Pizzas - Crème`) {
                        handleAEmporter();
                    }
                    setAllStocks(newStocks);
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
                .then(async (response) => {
                    console.log(response.data);
                    // Soustraire les ingrédients et leur quantité au stock
                    const ingredients = await axios.get(`http://localhost:5000/ingredients-plat/${plat}`);
                    const newStocks = [...allStocks];
                    ingredients.data.forEach(({ ingredient, quantite }) => {
                        const index = newStocks.findIndex((item) => item.nomIngredient === ingredient);
                        if (index !== -1) {
                            newStocks[index].stock -= quantite;
                            axios.put(`http://localhost:5000/update-stock/${ingredient}`, { stock: newStocks[index].stock });
                        }
                    });
                    if (platClic.data[0].categorie === `Pizzas - Tomate` || platClic.data[0].categorie === `Pizzas - Crème`) {
                        handleAEmporter();
                    }
                    setAllStocks(newStocks);
                    navigate(0);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const handleAEmporter = async () => {
        if (commande.statutCommande === `A emporter`) {
            try {
                const response = await axios.put("http://localhost:5000/boite-pizza");
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Le statut de la commande n'est pas 'A emporter'");
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
            <section className="h-screen">
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
                <div className={toggleState === 1 ? "content  block" : "bg-white p-5 w-full h-full hidden"} >
                    <h2 className='ml-32 font-bold text-xl'>Les tomates</h2>
                    <div className='bg-gray-50 border border-black rounded-xl mt-1 flex w-4/5 m-auto ml-32 '></div>
                    <div className='flex flex-wrap justify-center mb-2'>
                        {
                            platsCommande.sort((a, b) => a.nomPlat.localeCompare(b.nomPlat)).map((plats) => (
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
                    <h2 className='ml-32 font-bold text-xl'>Les crèmes </h2>
                    <div className='bg-gray-50 border border-black rounded-xl mt-1 flex w-4/5 m-auto ml-32 '></div>
                    <div className='flex flex-wrap justify-center mb-2'>
                        {
                            pizzaCreme.sort((a, b) => a.nomPlat.localeCompare(b.nomPlat)).map((creme) => (
                                <div onClick={() => addPlat(creme.nomPlat)} className='w-96 transition duration-500 transform hover:-translate-y-1 cursor-pointer flex flex-wrap' key={creme.nomPlat}>
                                    <div className='bg-gray-50 text-right mr-10 border border-gris rounded-xl mt-1 flex '>
                                        <div className='w-2/4'>
                                            <img className='border rounded-xl' src={creme.imgPlat} alt="" />
                                        </div>
                                        <div className='w-2/4'>
                                            <p className='text-bleu text-center text-base font-bold'>{creme.nomPlat}</p>
                                            <p className='text-bleu text-center text-xs'>{creme.descriptionPlat}</p>
                                            <p className='text-bleu text-center text-base font-bold'>{creme.prixPlat} €</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={toggleState === 2 ? "content  block" : "bg-white p-5 w-full h-full hidden"} >
                    <h2 className='ml-32 font-bold text-xl'>Les pâtes</h2>
                    <div className='bg-gray-50 border border-black rounded-xl mt-1 flex w-4/5 m-auto ml-32 '></div>
                    <div className='flex flex-wrap justify-center mb-2'>
                        {
                            pates.sort((a, b) => a.nomPlat.localeCompare(b.nomPlat)).map((pates) => (
                                <div onClick={() => addPlat(pates.nomPlat)} className='w-96 transition duration-500 transform hover:-translate-y-1 cursor-pointer flex flex-wrap' key={pates.nomPlat}>
                                    <div className='bg-gray-50 text-right mr-10 border border-gris rounded-xl mt-1 flex '>
                                        <div className='w-2/4'>
                                            <img className='border rounded-xl' src={pates.imgPlat} alt="" />
                                        </div>
                                        <div className='w-2/4'>
                                            <p className='text-bleu text-center text-base font-bold'>{pates.nomPlat}</p>
                                            <p className='text-bleu text-center text-xs'>{pates.descriptionPlat}</p>
                                            <p className='text-bleu text-center text-base font-bold'>{pates.prixPlat} €</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={toggleState === 3 ? "content  block" : "bg-white p-5 w-full h-full hidden"} >
                    <h2 className='ml-32 font-bold text-xl'>Les gourmants</h2>
                    <div className='bg-gray-50 border border-black rounded-xl mt-1 flex w-4/5 m-auto ml-32 '></div>
                    <div className='flex flex-wrap justify-center mb-2'>
                        {
                            desserts.sort((a, b) => a.nomPlat.localeCompare(b.nomPlat)).map((desserts) => (
                                <div onClick={() => addPlat(desserts.nomPlat)} className='w-96 transition duration-500 transform hover:-translate-y-1 cursor-pointer flex flex-wrap' key={desserts.nomPlat}>
                                    <div className='bg-gray-50 text-right mr-10 border border-gris rounded-xl mt-1 flex '>
                                        <div className='w-2/4'>
                                            <img className='border rounded-xl' src={desserts.imgPlat} alt="" />
                                        </div>
                                        <div className='w-2/4'>
                                            <p className='text-bleu text-center text-base font-bold'>{desserts.nomPlat}</p>
                                            <p className='text-bleu text-center text-xs'>{desserts.descriptionPlat}</p>
                                            <p className='text-bleu text-center text-base font-bold'>{desserts.prixPlat} €</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <h2 className='ml-32 font-bold text-xl'>Les glaces</h2>
                    <div className='bg-gray-50 border border-black rounded-xl mt-1 flex w-4/5 m-auto ml-32 '></div>
                    <div className='flex flex-wrap justify-center mb-2'>
                        {
                            dessertsGlace.sort((a, b) => a.nomPlat.localeCompare(b.nomPlat)).map((desserts) => (
                                <div onClick={() => addPlat(desserts.nomPlat)} className='w-96 transition duration-500 transform hover:-translate-y-1 cursor-pointer flex flex-wrap' key={desserts.nomPlat}>
                                    <div className='bg-gray-50 text-right mr-10 border border-gris rounded-xl mt-1 flex '>
                                        <div className='w-2/4'>
                                            <img className='border rounded-xl' src={desserts.imgPlat} alt="" />
                                        </div>
                                        <div className='w-2/4'>
                                            <p className='text-bleu text-center text-base font-bold'>{desserts.nomPlat}</p>
                                            <p className='text-bleu text-center text-xs'>{desserts.descriptionPlat}</p>
                                            <p className='text-bleu text-center text-base font-bold'>{desserts.prixPlat} €</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={toggleState === 4 ? "content  block" : "bg-white p-5 w-full h-full hidden"} >
                    <h2 className='ml-32 font-bold text-xl'>Les Salades</h2>
                    <div className='bg-gray-50 border border-black rounded-xl mt-1 flex w-4/5 m-auto ml-32 '></div>
                    <div className='flex flex-wrap justify-center mb-2'>
                        {
                            salades.sort((a, b) => a.nomPlat.localeCompare(b.nomPlat)).map((salade) => (
                                <div onClick={() => addPlat(salade.nomPlat)} className='w-96 transition duration-500 transform hover:-translate-y-1 cursor-pointer flex flex-wrap' key={salade.nomPlat}>
                                    <div className='bg-gray-50 text-right mr-10 border border-gris rounded-xl mt-1 flex '>
                                        <div className='w-2/4'>
                                            <img className='border rounded-xl' src={salade.imgPlat} alt="" />
                                        </div>
                                        <div className='w-2/4'>
                                            <p className='text-bleu text-center text-base font-bold'>{salade.nomPlat}</p>
                                            <p className='text-bleu text-center text-xs'>{salade.descriptionPlat}</p>
                                            <p className='text-bleu text-center text-base font-bold'>{salade.prixPlat} €</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={toggleState === 5 ? "content  block" : "bg-white p-5 w-full h-full hidden"} >
                    <h2 className='ml-32 font-bold text-xl'>Les Boissons</h2>
                    <div className='bg-gray-50 border border-black rounded-xl mt-1 flex w-4/5 m-auto ml-32 '></div>
                    <div className='flex flex-wrap justify-center mb-2'>
                        {
                            boissons.sort((a, b) => a.nomPlat.localeCompare(b.nomPlat)).map((boissons) => (
                                <div onClick={() => addPlat(boissons.nomPlat)} className='w-96 transition duration-500 transform hover:-translate-y-1 cursor-pointer flex flex-wrap' key={boissons.nomPlat}>
                                    <div className='bg-gray-50 text-right mr-10 border border-gris rounded-xl mt-1 flex '>
                                        <div className='w-2/4'>
                                            <img className='border rounded-xl' src={boissons.imgPlat} alt="" />
                                        </div>
                                        <div className='w-2/4'>
                                            <p className='text-bleu text-center text-base font-bold'>{boissons.nomPlat}</p>
                                            <p className='text-bleu text-center text-xs'>{boissons.descriptionPlat}</p>
                                            <p className='text-bleu text-center text-base font-bold'>{boissons.prixPlat} €</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                {historiquecommande.length > 0 && (
                    <>
                        <thead className="bg-bleu items-center">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-white w-full">
                                    Plat
                                </th>
                                <th
                                    scope="col"
                                    className="px-20 py-3 text-center text-xs font-medium uppercase tracking-wide text-white w-full">
                                    Quantitée
                                </th>
                                <th
                                    scope="col"
                                    className="px-20 py-3 text-center text-xs font-medium uppercase tracking-wide text-white w-full">
                                    Total
                                </th>
                                <th scope="col" className="relative py-3 pl-3 pr-4 sm:pr-6">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        {historiquecommande.map((histoCommande, index) => (
                            <tr key={index}>
                                <td className="whitespace-nowrap px-8 py-4 text-xl text-black border-solid border-2 bg-white">{histoCommande.platCommande}</td>
                                <td className="whitespace-nowrap px-10 py-1 text-xl text-black border-solid border-2 bg-white">
                                    <div className="flex">
                                        {histoCommande.quantitePlat}
                                        <div className="ml-12">
                                            <button onClick={() => addQuantite(histoCommande.platCommande)} className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1 ml-2">
                                                <FaIconsBootStrap.FaRegArrowAltCircleUp size={24} />
                                            </button>
                                            <button onClick={() => deleteQuantite(histoCommande.platCommande)} className="text-white bg-rouge1 hover:bg-gris duration-500 rounded-md mr-2 p-1">
                                                <FaIconsBootStrap.FaRegArrowAltCircleDown size={24} />
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-8 py-4 text-xl text-black border-solid border-2 bg-white">{totalPlatsCommande.find(plat => plat.platCommande === histoCommande.platCommande)?.totalPrix} €</td>
                                <td className="whitespace-nowrap px-10 py-4 text-xltext-black border-solid border-2 bg-white">
                                    <button onClick={() => handleDelete(histoCommande.id)} className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                                        <FaIconsBootStrap.FaTrashAlt size={24} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </>
                )}


            </section>
        </React.Fragment >
    )
}

export default HistoriqueCommandeTable