import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
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
                <div className="w-fit m-auto">
                    <div className="flex justify-center p-1">
                        <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1 w-2/4">
                            <Link to={`/ContenirMenu/Menu du jour`}>
                                <p className="font-bold text-5xl">Modifier le menu</p>
                            </Link>
                        </button>
                        <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1 w-2/4 h-24">
                            <Link to={`/ContenirMenu/Carte du restaurant`}>
                                <p className="font-bold text-5xl">Modifier la carte</p>
                            </Link>
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <img className="border rounded-xl" src="https://image.noelshack.com/fichiers/2023/11/2/1678816037-bannieremenu.png" alt="" />
                    </div>
                    <div className="bg-gray-50 text-right border border-gris rounded-xl mt-1 w-full block m-auto">
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
                        <p className="text-bleu text-center text-2xl font-bold mb-2">Boisson</p>
                        {platMenu.filter(platsMenu => platsMenu.menu === "Menu du jour" && platsMenu.categorie.includes("Boissons")).map((platsMenu) => (
                            <div key={platsMenu.platMenu}>
                                <p className="text-bleu text-center text-lg font-bold">{platsMenu.platMenu}</p>
                                <p className="text-bleu text-center text-base mb-3">{platsMenu.descriptionPlat}</p>
                            </div>
                        ))}
                        <p className="text-bleu text-center text-2xl font-bold mb-2">22 €</p>
                    </div>
                </div>
                <div className="w-fit m-auto">
                    <div className="flex justify-center">
                        <img className="border rounded-xl" src="https://image.noelshack.com/fichiers/2023/11/2/1678790059-bannierepizza.png" alt="" />
                    </div>
                    <div className="bg-gray-50 border border-gris rounded-xl mt-1 w-full block m-auto">
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
                    </div>
                </div>
                <div className="w-fit m-auto">
                    <div className="flex justify-center">
                        <img className="border rounded-xl" src="https://image.noelshack.com/fichiers/2023/11/2/1678790299-bannierepates.png" alt="" />
                    </div>
                    <div className="bg-gray-50 text-right border border-gris rounded-xl mt-1 w-full block m-auto">
                        {platMenu.filter(platsCarte => platsCarte.menu === "Carte du restaurant" && platsCarte.categorie.includes("Pâtes")).map((platsCarte) => (
                            <div key={platsCarte.platMenu}>
                                <p className="text-bleu text-center text-lg font-bold">{platsCarte.platMenu}</p>
                                <p className="text-bleu text-center text-base">{platsCarte.descriptionPlat}</p>
                                <p className="text-bleu text-center text-lg font-bold">{platsCarte.prixPlat} €</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-fit m-auto">
                    <div className="flex justify-center">
                        <img className="border rounded-xl" src="https://image.noelshack.com/fichiers/2023/11/2/1678790814-bannieresalades.png" alt="" />
                    </div>
                    <div className="bg-gray-50 text-right border border-gris rounded-xl mt-1 w-full block m-auto">
                        {platMenu.filter(platsCarte => platsCarte.menu === "Carte du restaurant" && platsCarte.categorie === "Salade").map((platsCarte) => (
                            <div key={platsCarte.platMenu}>
                                <p className="text-bleu text-center text-lg font-bold">{platsCarte.platMenu}</p>
                                <p className="text-bleu text-center text-base">{platsCarte.descriptionPlat}</p>
                                <p className="text-bleu text-center text-lg font-bold">{platsCarte.prixPlat} €</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-fit m-auto">
                    <div className="flex justify-center">
                        <img className="border rounded-xl" src="https://image.noelshack.com/fichiers/2023/11/2/1678790813-bannieredesserts.png" alt="" />
                    </div>
                    <div className="bg-gray-50 text-right border border-gris rounded-xl mt-1 w-full block m-auto">
                        {platMenu.filter(platsCarte => platsCarte.menu === "Carte du restaurant" && platsCarte.categorie.includes("Dessert")).map((platsCarte) => (
                            <div key={platsCarte.platMenu}>
                                <p className="text-bleu text-center text-lg font-bold">{platsCarte.platMenu}</p>
                                <p className="text-bleu text-center text-base">{platsCarte.descriptionPlat}</p>
                                <p className="text-bleu text-center text-lg font-bold">{platsCarte.prixPlat} €</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-fit m-auto">
                    <div className="flex justify-center">
                        <img className="border rounded-xl" src="https://image.noelshack.com/fichiers/2023/11/2/1678790813-banniereboissons.png" alt="" />
                    </div>
                    <div className="bg-gray-50 text-right border border-gris rounded-xl mt-1 w-full block m-auto">
                        {platMenu.filter(platsCarte => platsCarte.menu === "Carte du restaurant" && platsCarte.categorie.includes("Boissons")).map((platsCarte) => (
                            <div key={platsCarte.platMenu}>
                                <p className="text-bleu text-center text-lg font-bold">{platsCarte.platMenu}</p>
                                <p className="text-bleu text-center text-base">{platsCarte.descriptionPlat}</p>
                                <p className="text-bleu text-center text-lg font-bold">{platsCarte.prixPlat} €</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default Menu;
