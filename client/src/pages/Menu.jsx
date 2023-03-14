import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
// import * as FaIcons from 'react-icons/rx';
import * as FaIconsBootStrap from "react-icons/fa";
import { Link } from "react-router-dom";

function Menu() {
    const [platMenu, setPlatMenu] = useState([]);

    useEffect(() => {
        const fetchAllPlatMenu = async () => {
            try {
                const res = await axios.get("http://localhost:5000/plats-menu");
                setPlatMenu(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllPlatMenu();
    }, []);

    return (
        <React.Fragment>
            <section>
                <div className="flex">
                    <div className="bg-gray-50 text-right mr-10 border border-gris rounded-xl mt-1 w-2/4">
                        <p className="text-bleu text-center text-2xl font-bold">Carte du restaurant</p>
                        <p className="text-bleu text-center text-xl font-bold">Les Pizzas</p>
                        <p className="text-bleu text-center text-xl font-bold">Les tomates</p>
                        <div className='bg-gray-50 border border-gris rounded-xl mt-1 flex w-3/5 m-auto '></div>
                        {platMenu.filter(platsCarte => platsCarte.menu === "Carte du restaurant" && platsCarte.categorie === "Pizzas - Tomate").map((platsCarte) => (
                            <div key={platsCarte.platMenu}>
                                <p className="text-bleu text-center text-lg font-bold">{platsCarte.platMenu}</p>
                                <p className="text-bleu text-center text-base">{platsCarte.descriptionPlat}</p>
                                <p className="text-bleu text-center text-lg font-bold">{platsCarte.prixPlat} €</p>
                            </div>
                        ))}
                        <p className="text-bleu text-center text-xl font-bold">Les crèmes</p>
                        <div className='bg-gray-50 border border-gris rounded-xl mt-1 flex w-3/5 m-auto '></div>
                        {platMenu.filter(platsCarte => platsCarte.menu === "Carte du restaurant" && platsCarte.categorie === "Pizzas - Crème").map((platsCarte) => (
                            <div key={platsCarte.platMenu}>
                                <p className="text-bleu text-center text-lg font-bold">{platsCarte.platMenu}</p>
                                <p className="text-bleu text-center text-base">{platsCarte.descriptionPlat}</p>
                                <p className="text-bleu text-center text-lg font-bold">{platsCarte.prixPlat} €</p>
                            </div>
                        ))}
                        <p className="text-bleu text-center text-xl font-bold">Les Pâtes</p>
                        <div className='bg-gray-50 border border-gris rounded-xl mt-1 flex w-3/5 m-auto '></div>
                        {platMenu.filter(platsCarte => platsCarte.menu === "Carte du restaurant" && platsCarte.categorie === "Pâtes").map((platsCarte) => (
                            <div key={platsCarte.platMenu}>
                                <p className="text-bleu text-center text-lg font-bold">{platsCarte.platMenu}</p>
                                <p className="text-bleu text-center text-base">{platsCarte.descriptionPlat}</p>
                                <p className="text-bleu text-center text-lg font-bold">{platsCarte.prixPlat} €</p>
                            </div>
                        ))}
                        <p className="text-bleu text-center text-xl font-bold">Les Salades</p>
                        <div className='bg-gray-50 border border-gris rounded-xl mt-1 flex w-3/5 m-auto '></div>
                        {platMenu.filter(platsCarte => platsCarte.menu === "Carte du restaurant" && platsCarte.categorie === "Salade").map((platsCarte) => (
                            <div key={platsCarte.platMenu}>
                                <p className="text-bleu text-center text-lg font-bold">{platsCarte.platMenu}</p>
                                <p className="text-bleu text-center text-base">{platsCarte.descriptionPlat}</p>
                                <p className="text-bleu text-center text-lg font-bold">{platsCarte.prixPlat} €</p>
                            </div>
                        ))}
                        <p className="text-bleu text-center text-xl font-bold">Les Desserts</p>
                        <div className='bg-gray-50 border border-gris rounded-xl mt-1 flex w-3/5 m-auto '></div>
                        {platMenu.filter(platsCarte => platsCarte.menu === "Carte du restaurant" && platsCarte.categorie.includes("Dessert")).map((platsCarte) => (
                            <div key={platsCarte.platMenu}>
                                <p className="text-bleu text-center text-lg font-bold">{platsCarte.platMenu}</p>
                                <p className="text-bleu text-center text-base">{platsCarte.descriptionPlat}</p>
                                <p className="text-bleu text-center text-lg font-bold">{platsCarte.prixPlat} €</p>
                            </div>
                        ))}
                        <p className="text-bleu text-center text-xl font-bold">Les Boissons</p>
                        <div className='bg-gray-50 border border-gris rounded-xl mt-1 flex w-3/5 m-auto '></div>
                        {platMenu.filter(platsCarte => platsCarte.menu === "Carte du restaurant" && platsCarte.categorie.includes("Boissons")).map((platsCarte) => (
                            <div key={platsCarte.platMenu}>
                                <p className="text-bleu text-center text-lg font-bold">{platsCarte.platMenu}</p>
                                <p className="text-bleu text-center text-base">{platsCarte.descriptionPlat}</p>
                                <p className="text-bleu text-center text-lg font-bold">{platsCarte.prixPlat} €</p>
                            </div>
                        ))}
                        <div className="flex justify-center p-1">
                            <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                                <Link to={`/ContenirMenu/Carte du restaurant`}>
                                    <FaIconsBootStrap.FaEye size={24} />
                                </Link>
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-50 text-right mr-10 border border-gris rounded-xl mt-1 w-2/4">
                        <p className="text-bleu text-center text-2xl font-bold mb-10">Menu du jour</p>
                        <p className="text-bleu text-center text-2xl font-bold mb-2">Entrée</p>
                        {platMenu.filter(platsMenu => platsMenu.menu === "Menu du jour" && platsMenu.categorie.includes("Salade")).map((platsMenu) => (
                            <div key={platsMenu.platMenu}>
                                <p className="text-bleu text-center text-lg font-bold">{platsMenu.platMenu}</p>
                                <p className="text-bleu text-center text-base mb-5">{platsMenu.descriptionPlat}</p>
                            </div>
                        ))}
                        <p className="text-bleu text-center text-2xl font-bold mb-2">Plat</p>
                        {platMenu.filter(platsMenu => platsMenu.menu === "Menu du jour" && platsMenu.categorie.includes("Pâtes")).map((platsMenu) => (
                            <div key={platsMenu.platMenu}>
                                <p className="text-bleu text-center text-lg font-bold">{platsMenu.platMenu}</p>
                                <p className="text-bleu text-center text-base mb-5">{platsMenu.descriptionPlat}</p>
                            </div>
                        ))}
                        <p className="text-bleu text-center text-2xl font-bold mb-2">Dessert</p>
                        {platMenu.filter(platsMenu => platsMenu.menu === "Menu du jour" && platsMenu.categorie.includes("Dessert")).map((platsMenu) => (
                            <div key={platsMenu.platMenu}>
                                <p className="text-bleu text-center text-lg font-bold">{platsMenu.platMenu}</p>
                                <p className="text-bleu text-center text-base mb-3">{platsMenu.descriptionPlat}</p>
                            </div>
                        ))}
                        <p className="text-bleu text-center text-2xl font-bold mb-2">19 €</p>
                        <div className="flex justify-center p-1">
                            <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                                <Link to={`/ContenirMenu/Menu du jour`}>
                                    <FaIconsBootStrap.FaEye size={24} />
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default Menu;
