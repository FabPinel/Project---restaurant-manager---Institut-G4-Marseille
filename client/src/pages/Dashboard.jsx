import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Pie } from "react-chartjs-2";
import { Link } from 'react-router-dom';
ChartJs.register(
  Tooltip, Title, ArcElement, Legend
);


const Categories = () => {   //   il faut que ce soit une const et pas une fonction pour avoir des requetes sql

  const [platsDay, setPlatsDay] = useState([]);
  const [platsWeek, setPlatsWeek] = useState([]);
  const [platsMonth, setPlatsMonth] = useState([]);
  const [platsYear, setPlatsYear] = useState([]);
  const [caDay, setCaDay] = useState(0);
  const [caWeek, setCaWeek] = useState(0);
  const [caMonth, setCaMonth] = useState(0);
  const [caYear, setCaYear] = useState(0);
  const [platMenu, setPlatMenu] = useState([]);


  const [dataDay, setDataDay] = useState({
    datasets: [{
      data: [],
      backgroundColor: [],
    },
    ],
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: []
  });

  const [dataWeek, setDataWeek] = useState({
    datasets: [{
      data: [],
      backgroundColor: [],
    },
    ],
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: []
  });

  const [dataMonth, setDataMonth] = useState({
    datasets: [{
      data: [],
      backgroundColor: [],
    },
    ],
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: []
  });

  const [dataYear, setDataYear] = useState({
    datasets: [{
      data: [],
      backgroundColor: [],
    },
    ],
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: []
  });

  //DAY
  useEffect(() => {
    const fetchAllPlats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/categorie-ca-day");
        setPlatsDay(res.data);
        const label = [];
        const data = [];
        for (var i of res.data) {
          label.push(i.categorie);
          data.push(i.CA)
        }
        setDataDay({
          datasets: [{
            data: data,
            backgroundColor: ['#D90429', '#5C6378', '#8d99ae', '#EE8B98', '#BDC6D1', '#2b2d42', '#EDF2F4', '#ef233c',],
          },
          ],
          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: label,
        })
      } catch (err) {
        console.log(err);
      }

    };
    fetchAllPlats();
  }, [])

  //WEEK
  useEffect(() => {
    const fetchAllPlats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/categorie-ca-week");
        setPlatsWeek(res.data);
        const label = [];
        const data = [];
        for (var i of res.data) {
          label.push(i.categorie);
          data.push(i.CA)
        }
        setDataWeek({
          datasets: [{
            data: data,
            backgroundColor: ['#D90429', '#5C6378', '#8d99ae', '#EE8B98', '#BDC6D1', '#2b2d42', '#EDF2F4', '#ef233c',],
          },
          ],
          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: label,
        })
      } catch (err) {
        console.log(err);
      }

    };
    fetchAllPlats();
  }, [])

  //MONTH
  useEffect(() => {
    const fetchAllPlats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/categorie-ca-month");
        setPlatsMonth(res.data);
        const label = [];
        const data = [];
        for (var i of res.data) {
          label.push(i.categorie);
          data.push(i.CA)
        }
        setDataMonth({
          datasets: [{
            data: data,
            backgroundColor: ['#D90429', '#5C6378', '#8d99ae', '#EE8B98', '#BDC6D1', '#2b2d42', '#EDF2F4', '#ef233c',],
          },
          ],
          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: label,
        })
      } catch (err) {
        console.log(err);
      }

    };
    fetchAllPlats();
  }, [])


  //YEAR
  useEffect(() => {
    const fetchAllPlats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/categorie-ca-year");
        setPlatsYear(res.data);
        const label = [];
        const data = [];
        for (var i of res.data) {
          label.push(i.categorie);
          data.push(i.CA)
        }
        setDataYear({
          datasets: [{
            data: data,
            backgroundColor: ['#D90429', '#5C6378', '#8d99ae', '#EE8B98', '#BDC6D1', '#2b2d42', '#EDF2F4', '#ef233c',],
          },
          ],
          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: label,
        })
      } catch (err) {
        console.log(err);
      }

    };
    fetchAllPlats();
  }, [])

  console.log(platsDay);

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    const fetchAllCaDay = async () => {
      try {
        const res = await axios.get("http://localhost:5000/ca-day");
        setCaDay(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCaDay();
  }, []);

  useEffect(() => {
    const fetchAllCaWeek = async () => {
      try {
        const res = await axios.get("http://localhost:5000/ca-week");
        setCaWeek(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCaWeek();
  }, []);



  useEffect(() => {
    const fetchAllCaMonth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/ca-month");
        setCaMonth(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCaMonth();
  }, []);

  useEffect(() => {
    const fetchAllCaYear = async () => {
      try {
        const res = await axios.get("http://localhost:5000/ca-year");
        setCaYear(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCaYear();
  }, []);

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

        <div className='flex justify-between mt-10 h-fit'>
          <div className='w-2/6 shadow ring-1 ring-black ring-opacity-10 rounded-xl p-4'>
            <h1 className='text-xl mb-4 font-semibold'>Chiffre d'affaires des plats par catégorie</h1>

            <div className="flex">
              <button className={toggleState === 1 ? "tabs p-4 text-center w-20 cursor-pointer box-content relative bg-blanc border-t-4 border-rouge1 duration-500" : "p-4 text-center text-white w-20 cursor-pointer box-content relative bg-bleu border-t-4 border-blanc hover:bg-gris duration-500"}
                onClick={() => toggleTab(1)} >
                Jours
              </button>
              <button className={toggleState === 2 ? "tabs p-4 text-center w-20 cursor-pointer box-content relative bg-blanc border-t-4 border-rouge1 duration-500" : "p-4 text-center text-white w-20 cursor-pointer box-content relative bg-bleu border-t-4 border-blanc hover:bg-gris duration-500"}
                onClick={() => toggleTab(2)} >
                Semaines
              </button>
              <button className={toggleState === 3 ? "tabs p-4 text-center w-20 cursor-pointer box-content relative bg-blanc border-t-4 border-rouge1 duration-500" : "p-4 text-center text-white w-20 cursor-pointer box-content relative bg-bleu border-t-4 border-blanc hover:bg-gris duration-500"}
                onClick={() => toggleTab(3)} >
                Mois
              </button>
              <button className={toggleState === 4 ? "tabs p-4 text-center w-20 cursor-pointer box-content relative bg-blanc border-t-4 border-rouge1 duration-500" : "p-4 text-center text-white w-20 cursor-pointer box-content relative bg-bleu border-t-4 border-blanc hover:bg-gris duration-500"}
                onClick={() => toggleTab(4)} >
                Années
              </button>
            </div>
            <div className={toggleState === 1 ? "content  block" : "bg-white p-5 w-full h-full hidden"} >
              {platsDay.length === 0 ? (
                <div>
                  <img src="https://image.noelshack.com/fichiers/2023/11/2/1678820107-graphnotfound.png" alt="graphNotFound" />
                  <h2 className='text-xl mb-4 font-semibold text-center'>Aucun résultat pour aujourd'hui</h2>
                </div>
              ) : (
                <>
                  <Pie data={dataDay} />
                  <p className='font-semibold text-center text-xl'>Total : {caDay}€ </p>
                </>
              )}
            </div>

            <div className={toggleState === 2 ? "content  block" : "bg-white p-5 w-full h-full hidden"} >
              {platsWeek.length === 0 ? (
                <div>
                  <img src="https://image.noelshack.com/fichiers/2023/11/2/1678820107-graphnotfound.png" alt="graphNotFound" />
                  <h2 className='text-xl mb-4 font-semibold text-center'>Aucun résultat pour cette semaine</h2>
                </div>
              ) : (
                <>
                  < Pie data={dataWeek} />
                  <p className='font-semibold text-center text-xl'>Total : {caWeek}€ </p>
                </>
              )}
            </div>

            <div className={toggleState === 3 ? "content  block" : "bg-white p-5 w-full h-full hidden"} >
              {platsMonth.length === 0 ? (
                <div>
                  <img src="https://image.noelshack.com/fichiers/2023/11/2/1678820107-graphnotfound.png" alt="graphNotFound" />
                  <h2 className='text-xl mb-4 font-semibold text-center'>Aucun résultat pour ce mois</h2>
                </div>
              ) : (
                <>
                  < Pie data={dataMonth} />
                  <p className='font-semibold text-center text-xl'>Total : {caMonth}€ </p>
                </>
              )}
            </div>

            <div className={toggleState === 4 ? "content  block" : "bg-white p-5 w-full h-full hidden"} >
              {platsYear.length === 0 ? (
                <div>
                  <img src="https://image.noelshack.com/fichiers/2023/11/2/1678820107-graphnotfound.png" alt="graphNotFound" />
                  <h2 className='text-xl mb-4 font-semibold text-center'>Aucun résultat pour cette année</h2>
                </div>
              ) : (
                <>
                  < Pie data={dataYear} />
                  <p className='font-semibold text-center text-xl'>Total : {caYear}€ </p>
                </>
              )}
            </div>
            {/* < Bar data={dataD} options={options} />  */}

          </div>
          <div className='w-2/6 text-right mr-10 border shadow ring-1 ring-black ring-opacity-5 rounded-xl h-fit'>
            <div className="w-fit m-auto">
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
            <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1 w-full ">
              <Link to={`/ContenirMenu/Menu du jour`}>
                <p className="font-bold text-4xl">Modifier le menu</p>
              </Link>
            </button>
          </div>
        </div>



        <div className='w-full h-80 border-double border-8 border-rouge1 mt-10'>test div planning</div>

      </section>
    </React.Fragment>
  );
}

export default Categories