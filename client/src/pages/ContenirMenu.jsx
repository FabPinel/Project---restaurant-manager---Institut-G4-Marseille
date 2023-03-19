import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import * as FaIcons from 'react-icons/rx';
import * as FaIconsBootStrap from 'react-icons/fa';

function ContenirMenu() {
    const [toggleState, setToggleState] = useState(1);
    const navigate = useNavigate()
    const location = useLocation()
    const menuId = location.pathname.split("/")[2]
    const [platsMenu, setPlatsMenu] = useState([]);
    const { menu } = useParams();

    console.log({ platsMenu })

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
        axios.post(`/menu-plat-add/${menu}`, {
            platMenu: plat,
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

    const goingBack = async e => {
        navigate(-1);
    }

    useEffect(() => {
        const fetchPlatsMenu = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/contenir-plats-menu/${menu}`);
                setPlatsMenu(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPlatsMenu();
    }, [menu]);

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:5000/plat-menu-delete/" + id)
            navigate(0);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <React.Fragment>
            <section className="h-full">
                <h1 className="m-auto text-center text-3xl font-bold mt-10">{menuId} </h1>
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
                <>
                    <thead className="bg-bleu items-center w-full">
                        <tr>
                            <th
                                scope="col"
                                className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-white w-full">
                                Nom
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-white w-full">
                                Description
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-white w-full">
                                Prix
                            </th>
                            <th scope="col" className="relative py-3 pl-3 pr-4 sm:pr-6">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    {platsMenu.map((plat) => (
                        <tr key={plat.id}>
                            <td className="whitespace-nowrap px-8 py-4 text-xl text-black border-solid border-2 bg-white">{plat.platMenu}</td>
                            <td className="whitespace-nowrap px-10 py-1 text-xl text-black border-solid border-2 bg-white">{plat.descriptionPlat}</td>
                            <td className="whitespace-nowrap px-10 py-1 text-xl text-black border-solid border-2 bg-white">{plat.prixPlat}</td>
                            <td className="whitespace-nowrap px-10 py-4 text-xltext-black border-solid border-2 bg-white">
                                <button onClick={() => handleDelete(plat.id)} className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                                    <FaIconsBootStrap.FaTrashAlt size={24} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </>
            </section>
        </React.Fragment >
    )
}

export default ContenirMenu