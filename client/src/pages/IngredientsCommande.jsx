import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as FaIconsBootStrap from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import * as FaIcons from 'react-icons/rx';

function IngredientCommande() {
    const [ingredients, setIngredients] = useState([]);
    const [ingredientConso, setIngredientConso] = useState([]);
    const [ingredientBoisson, setIngredientBoisson] = useState([]);
    const navigate = useNavigate();
    const [ingredientsCommandes, setIngredientsCommandes] = useState([]);
    const { numeroCommande } = useParams();
    const goingBack = async e => {
        navigate(-1);
    }

    useEffect(() => {
        const fetchAllIngredients = async () => {
            try {
                const res = await axios.get("http://localhost:5000/ingredients");
                setIngredients(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllIngredients();
    }, []);

    useEffect(() => {
        const fetchAllIngredientConso = async () => {
            try {
                const res = await axios.get("http://localhost:5000/ingredientConso");
                setIngredientConso(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllIngredientConso();
    }, []);


    useEffect(() => {
        const fetchAllIngredientBoisson = async () => {
            try {
                const res = await axios.get("http://localhost:5000/ingredientBoisson");
                setIngredientBoisson(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllIngredientBoisson();
    }, []);

    useEffect(() => {
        const fetchIngredientsCommandes = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/ingredients-commandes/${numeroCommande}`);
                setIngredientsCommandes(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchIngredientsCommandes();
    }, [numeroCommande]);

    const addIngredient = async (ingredient) => {
        const ingredientExiste = await axios.get(`/ingredients-commandes/${numeroCommande}/${ingredient}`);
        if (ingredientExiste.data.length > 0) {
            const quantite = ingredientExiste.data[0].quantite + 1;
            axios.put(`/commande-ingredient-update/${numeroCommande}/${ingredient}`, {
                quantite: quantite,
            })
                .then((response) => {
                    navigate(0);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            axios.post(`/ingredient-commande-add/${numeroCommande}`, {
                ingredient: ingredient,
                quantite: 1,
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

    const addQuantite = async (ingredient) => {
        const ingredientExiste = await axios.get(`/ingredients-commandes/${numeroCommande}/${ingredient}`);
        if (ingredientExiste.data.length >= 0) {
            const quantite = ingredientExiste.data[0].quantite + 1;
            axios.put(`/commande-ingredient-update/${numeroCommande}/${ingredient}`, {
                quantite: quantite,
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

    const deleteQuantite = async (ingredient) => {
        const ingredientExiste = await axios.get(`/ingredients-commandes/${numeroCommande}/${ingredient}`);
        if (ingredientExiste.data.length >= 0) {
            const quantite = ingredientExiste.data[0].quantite - 1;
            axios.put(`/commande-ingredient-update/${numeroCommande}/${ingredient}`, {
                quantite: quantite,
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

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:5000/ingredient-commande-delete/" + id)
            navigate(0);
        } catch (err) {
            console.log(err);
        }
    }

    const saveCommande = async (id) => {
        const ingredientExiste = await axios.get(`/ingredients-commandes/${numeroCommande}`);
        if (ingredientExiste.data.length > 0) {
            axios.put(`/fournisseur-commande-update/${numeroCommande}`)
        }
        goingBack();
    }

    const [join, setJoin] = useState([]);

    useEffect(() => {
        const fetchAllJoin = async () => {
            try {
                const res = await axios.get("http://localhost:5000//join-ingredient-contenirCommandesFournisseurs");
                setJoin(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllJoin();
    }, []);

    const validerCommande = async () => {
        try {
            // Boucle sur la liste des ingrédients commandés
            for (const ingredCommande of ingredientsCommandes) {
                const { ingredient, quantite } = ingredCommande;
                const res = await axios.get(`/get-ingredient/${ingredient}`);
                const ingredientToUpdate = res.data;

                // Ajoute la quantité commandée à la quantité existante de l'ingrédient
                const newStock = ingredientToUpdate.stock + quantite;

                // Met à jour la table ingredients avec le nouveau stock
                await axios.put(`/update-ingredients/${ingredient}`, { stock: newStock });
            }

            // Revenir à la page précédente
            goingBack();
        } catch (err) {
            console.error(err);
        }
    }




    return (
        <React.Fragment>
            <section>
                <div>
                    <button onClick={goingBack} className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 mt-5">
                        <div><FaIcons.RxArrowLeft size={40} /></div>
                    </button>
                </div>
                <h2 className='text-center text-2xl'>Ingrédients</h2>

                <div className='flex flex-wrap justify-between border-b border-black'>
                    {
                        ingredients.map((ingredient) => (
                            <div onClick={() => addIngredient(ingredient.nomIngredient)} className='w-22 h-26 bg-white border-2 border-gris rounded-xl mx-2 my-2 transition duration-500 transform hover:-translate-y-1 cursor-pointer'>
                                <div className='flex justify-center w-full h-10 border-b border-bleu'>
                                    <img src={ingredient.iconeUrl} key={ingredient.nomIngredient} alt='pâte' className="text-bleu h-10"></img>
                                </div>
                                <p className='text-sm text-center'>{ingredient.nomIngredient}</p>
                                <p className='text-sm text-center'>{ingredient.stock}</p>
                            </div>
                        ))
                    }
                </div>

                <h2 className='text-center text-2xl mt-4'>Consommable</h2>

                <div className='flex flex-wrap border-b border-black'>
                    {
                        ingredientConso.map((ingredientC) => (
                            <div onClick={() => addIngredient(ingredientC.nomIngredient)} className='w-22 h-26 bg-white border-2 border-gris rounded-xl mx-2 my-2 transition duration-500 transform hover:-translate-y-1 cursor-pointer'>
                                <div className='flex justify-center w-full h-10 border-b border-bleu'>
                                    <img src={ingredientC.iconeUrl} alt='pâte' className="text-bleu h-10"></img>
                                </div>
                                <p className='text-sm text-center'>{ingredientC.nomIngredient}</p>
                                <p className='text-sm text-center'>{ingredientC.stock}</p>
                            </div>
                        ))
                    }
                </div>

                <h2 className='text-center text-2xl mt-4'>Boissons</h2>

                <div className='flex flex-wrap border-b border-black'>
                    {
                        ingredientBoisson.map((ingredientB) => (
                            <div onClick={() => addIngredient(ingredientB.nomIngredient)} className='w-22 h-26 bg-white border-2 border-gris rounded-xl mx-2 my-2 transition duration-500 transform hover:-translate-y-1 cursor-pointer'>
                                <div className='flex justify-center w-full h-10 border-b border-bleu'>
                                    <img src={ingredientB.iconeUrl} key={ingredientB.nomIngredient} alt='pâte' className="text-bleu h-10"></img>
                                </div>
                                <p className='text-sm text-center'>{ingredientB.nomIngredient}</p>
                                <p className='text-sm text-center'>{ingredientB.stock}</p>
                            </div>
                        ))
                    }
                </div>

                <thead className="bg-bleu items-center">
                    <tr>
                        <th
                            scope="col"
                            className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-white w-full">
                            Ingredient
                        </th>
                        <th
                            scope="col"
                            className="px-20 py-3 text-center text-xs font-medium uppercase tracking-wide text-white w-full">
                            Quantitée
                        </th>
                        <th
                            scope="col"
                            className="px-20 py-3 text-center text-xs font-medium uppercase tracking-wide text-white w-full">
                        </th>
                    </tr>
                </thead>
                {ingredientsCommandes.map((ingredCommandes, index) => (
                    <tr key={index}>
                        <td className="whitespace-nowrap px-8 py-4 text-xl text-black border-solid border-2 bg-white">{ingredCommandes.ingredient}</td>
                        <td className="whitespace-nowrap px-10 py-1 text-xl text-black border-solid border-2 bg-white">
                            <div className="flex">
                                {ingredCommandes.quantite}
                                <div className="ml-12">
                                    <button onClick={() => addQuantite(ingredCommandes.ingredient)} className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1 ml-2">
                                        <FaIconsBootStrap.FaRegArrowAltCircleUp size={24} />
                                    </button>
                                    <button onClick={() => deleteQuantite(ingredCommandes.ingredient)} className="text-white bg-rouge1 hover:bg-gris duration-500 rounded-md mr-2 p-1">
                                        <FaIconsBootStrap.FaRegArrowAltCircleDown size={24} />
                                    </button>
                                </div>
                            </div>
                        </td>
                        <td className="whitespace-nowrap px-10 py-4 text-xltext-black border-solid border-2 bg-white">
                            <button onClick={() => handleDelete(ingredCommandes.id)} className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                                <FaIconsBootStrap.FaTrashAlt size={24} />
                            </button>
                        </td>
                    </tr>
                ))}
                <button onClick={saveCommande} className="bg-bleu hover:bg-gris text-white font-bold py-2 px-4 rounded duration-500 mr-4 4 mb-5 mt-5">
                    Enregistrer
                </button>
                <button onClick={validerCommande} className="bg-bleu hover:bg-gris text-white font-bold py-2 px-4 rounded duration-500 mr-4 4 mb-5 mt-5">
                    Valider
                </button>
                <button onClick={goingBack} className="bg-rouge2 hover:bg-gris text-white font-bold py-2 px-4 rounded duration-500 mr-4 4 mb-5 mt-5">
                    Annuler
                </button>
            </section>
        </React.Fragment>
    )
}

export default IngredientCommande;