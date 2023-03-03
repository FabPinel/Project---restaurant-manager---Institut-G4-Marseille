import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
// import * as FaIcons from 'react-icons/rx';
import * as FaIconsBootStrap from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

function Menu() {
    const [menu, setMenus] = useState([]);

    useEffect(() => {
        const fetchAllMenu = async () => {
            try {
                const res = await axios.get("http://localhost:5000/menu");
                setMenus(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllMenu();
    }, []);

    const [carte, setCarte] = useState([]);

    useEffect(() => {
        const fetchAllCarte = async () => {
            try {
                const res = await axios.get("http://localhost:5000/carte");
                setCarte(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllCarte();
    }, []);
    const navigate = useNavigate();

    const [Menu, setMenu] = useState({
        menu: "",
        platMenu: "",
    });

    const handleChange = (e) => {
        setMenu((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    console.log(Menu);
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/Menu-add", Menu);
            navigate(0);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <React.Fragment>
            <section>
                <div className="flex">
                    <div className="bg-gray-50 text-right mr-10 border border-gris rounded-xl mt-1 w-2/4">
                        <p className="text-bleu text-center text-2xl">Carte du restaurant</p>

                        {carte.map((platsCarte) => (
                            <p className="text-bleu text-center text-2xl">Plats : {platsCarte.platMenu}</p>
                        ))}
                        <div className="flex justify-center p-1">
                            <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                                <Link>
                                    <FaIconsBootStrap.FaEye size={16} />
                                </Link>
                            </button>
                        </div>
                    </div>
                
                <div className="bg-gray-50 text-right mr-10 border border-gris rounded-xl mt-1 w-2/4">
                    <p className="text-bleu text-center text-2xl">Menu du jour</p>

                    {menu.map((platsMenu) => (
                        <p className="text-bleu text-center text-2xl">Plats : {platsMenu.platMenu}</p>
                    ))}
                    <div className="flex justify-center p-1">
                        <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                            <Link>
                                <FaIconsBootStrap.FaEye size={16} />
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
