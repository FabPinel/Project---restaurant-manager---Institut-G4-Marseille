/* eslint-disable no-unused-vars */
/* eslint-disable no-sequences */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import * as FaIcons from 'react-icons/rx';
import { columnData, serviceMidi, serviceSoir } from '../data/Calendrier';


const Planning = () => {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
  };

  const close = () => {
    setShowForm(false);
  }

  const [error, setError] = useState(false)

  const navigate = useNavigate();

  const [salaries, setSalaries] = useState([]);

  useEffect(() => {
    const fetchAllSalaries = async () => {
      try {
        const res = await axios.get("http://localhost:5000/salaries"); //le "http://localhost:5000/..." doit être équivalent à celui dans le fichier server.js
        setSalaries(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllSalaries();
  }, []);

  // console.log(salaries);

  const [salarie, setSalarie] = useState({
    mailSalarie: "",
    nomSalarie: "",
    prenomSalarie: "",
    telephoneSalarie: "",
    posteSalaire: "",
    adresseSalarie: "",
    naissanceSalarie: "",
    salaireSalarie: "",
  })

  const handleChange = (e) => {
    setSalarie((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleClick2 = async () => {

    try {
      const addS = await axios.post("http://localhost:5000/ajout-salaries", salarie)
      console.log("Les données ont été ajoutées dans la base de données:", addS.data);
      navigate(0);
    }
    catch (error) {
      console.log("Error getting salaries data:", error);
    };
    console.log(salarie)
  }

  // console.log(salarie);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:5000/salaries/" + id);
      window.location.reload()
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  };

  // VARIABLES EVENT

  var i = 0;
  const initialArray = Array.from({ length: 14 }, () => ({ value: null }));

  const [values, setValues] = useState(initialArray);
  const [classe, setClasse] = useState({});
  const [statutSalarie, setStatutSalarie] = useState({});
  const [salariePlanning, setSalariePlanning] = useState({
    cell_id: "",
    backgroundColor: "",
  })

  const getStatut = async () => {
    try {
      const res = await axios.get("http://localhost:5000/all-salaries-plannig", statutSalarie); //le "http://localhost:5000/..." doit être équivalent à celui dans le fichier server.js
      var test = JSON.stringify(res.data);
      // console.log("réponse : ", test);
      return (test);
    } catch (err) {
      console.log(err);
    }
  }

  async function afficherStatut() {
    var tempStatut = await getStatut();
    console.log(tempStatut);
    var statut = tempStatut["statut"] === 'active' ? 'bg-red-300 border border-red-500 rounded-lg m-2' : 'bg-green-300 border border-green-500 rounded-lg m-2';
    // faire quelque chose avec la variable statut ici
  }

  const handleClickPlanning = async (event) => {
    const { id } = event.target;
    try {
      const res = await axios.put("http://localhost:5000/salarie-planning/" + id, salariePlanning); //le "http://localhost:5000/..." doit être équivalent à celui dans le fichier server.js
      console.log("Les données ont été ajoutées dans la base de données:", res.data);
    } catch (err) {
      console.log(err);
    }

    setSalariePlanning({ ...salariePlanning, cell_id: id });
    if (event) {
      if (!classe[id]) {
        setClasse({ ...classe, [id]: classe[id] = 'active' })
      }
      setClasse({ ...classe, [id]: classe[id] === 'inactive' ? 'active' : 'inactive' });

      var elementClique = document.getElementById(id);
      if (classe[id] === 'active') {
        setSalariePlanning({ ...salariePlanning, backgroundColor: '#86efac' });
        return ([
          elementClique.style.backgroundColor = '#86efac',
          elementClique.style.border = 'solid 1px #22c55e',
          elementClique.style.borderRadius = '12px',
        ])
      } else {
        setSalariePlanning({ ...salariePlanning, backgroundColor: 'red' });
        return ([elementClique.style.backgroundColor = 'red',
        elementClique.style.border = 'solid 1px red',
        elementClique.style.borderRadius = '12px',
        ])
      }
    }
    else {
      return ([
        elementClique.style.backgroundColor = '#86efac',
        elementClique.style.border = 'solid 1px #86efac',
        elementClique.style.borderRadius = '12px',
      ])
    }
  }

  return (
    <React.Fragment>
      <section className="h-screen">


        <div className="h-full w-full mt-8">
          <div className='flex'>
            {showForm && (

              <form className="space-y-4 absolute right-64">
                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                  <div className="md:grid md:grid-cols-2 md:gap-6">
                    <div className="mt-3 md:col-span-2 md:mt-0">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            Prénom
                          </label>
                          <input type="text" name="prenomSalarie" id="first-name" value={salarie.prenomSalarie} autoComplete="given-name" onChange={handleChange}
                            className="mt-1 block w-full h-8 rounded-md border border-gray-300 focus:outline-none focus:border-bleu focus:ring-1 focus:ring-bleu shadow-sm sm:text-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                            Nom
                          </label>
                          <input type="text" name="nomSalarie" id="last-name" value={salarie.nomSalarie} autoComplete="family-name" onChange={handleChange}
                            className="mt-1 block w-full h-8 rounded-md border border-gray-300 focus:outline-none focus:border-bleu focus:ring-1 focus:ring-bleu shadow-sm sm:text-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="mail-address" className="block text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <input type="text" name="mailSalarie" id="email-address" value={salarie.mailSalarie} autoComplete="email" onChange={handleChange}
                            className="mt-1 block w-full h-8 rounded-md border border-gray-300 focus:outline-none focus:border-bleu focus:ring-1 focus:ring-bleu shadow-sm sm:text-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            Téléphone
                          </label>
                          <input type="number" name="telephoneSalarie" id='telephone-number' value={salarie.telephoneSalarie} autoComplete="address-level2" onChange={handleChange}
                            className="mt-1 block w-full h-8 rounded-md border border-gray-300 focus:outline-none focus:border-bleu focus:ring-1 focus:ring-bleu shadow-sm sm:text-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                            Poste
                          </label>
                          <select id="country" name="posteSalaire" autoComplete="country-name" value={salarie.posteSalaire} onChange={handleChange}
                            className="mt-1 block w-full h-8 rounded-md border border-gray-300 focus:outline-none focus:border-bleu focus:ring-1 focus:ring-bleu shadow-sm sm:text-md"
                          >
                            <option>Poste</option>
                            <option value="Cuisinier">Cuisinier</option>
                            <option value="Serveur">Serveur</option>
                            <option value="Responsable">Responsable</option>
                          </select>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                            Adresse
                          </label>
                          <input type="text" name="adresseSalarie" id="street-address" value={salarie.adresseSalarie} autoComplete="street-address" onChange={handleChange}
                            className="mt-1 block w-full h-8 rounded-md border border-gray-300 focus:outline-none focus:border-bleu focus:ring-1 focus:ring-bleu shadow-sm sm:text-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="dateB" className="block text-sm font-medium text-gray-700">
                            Date de naissance
                          </label>
                          <input type="text" name="naissanceSalarie" id="region" value={salarie.dateNai} placeholder='YY-MM-DD' onChange={handleChange}
                            className="mt-1 block w-full h-8 rounded-md border border-gray-300 focus:outline-none focus:border-bleu focus:ring-1 focus:ring-bleu shadow-sm sm:text-md sm:text-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                            Salaire
                          </label>
                          <input type="text" name="salaireSalarie" id="salaire" value={salarie.salaireSalarie} autoComplete="" onChange={handleChange}
                            className="mt-1 block w-full h-8 rounded-md border border-gray-300 focus:outline-none focus:border-bleu focus:ring-1 focus:ring-bleu shadow-sm sm:text-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      type="button"
                      className="rounded-md border border-gray-300 bg-rouge1 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gris focus:outline-none"
                      onClick={close}
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-bleu py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gris focus:outline-none"
                      onClick={handleClick2}
                    >
                      Enregistrer
                    </button>
                    {error && "Something went wrong!"}
                  </div>
                </div>

              </form>
            )}


            <div className="shadow ring-1 ring-black ring-opacity-5">
              <div className="grid grid-cols-7 max-w-5xl m-auto border border-gray-300">
                <div className="flex justify-center items-center h-16 bg-white cursor-pointer border border-gray-300">Lundi</div>
                <div className="flex justify-center items-center h-16 bg-white cursor-pointer border border-gray-300">Mardi</div>
                <div className="flex justify-center items-center h-16 bg-white cursor-pointer border border-gray-300">Mercredi</div>
                <div className="flex justify-center items-center h-16 bg-white cursor-pointer border border-gray-300">Jeudi</div>
                <div className="flex justify-center items-center h-16 bg-white cursor-pointer border border-gray-300">Vendredi</div>
                <div className="flex justify-center items-center h-16 bg-white cursor-pointer border border-gray-300">Samedi</div>
                <div className="flex justify-center items-center h-16 bg-white cursor-pointer border border-gray-300">Dimanche</div>
              </div>
              <div className="grid grid-cols-7 max-w-5xl m-auto">
                {values.map((value) => (


                  <div key={value.id} className="text-center h-fit w-36 bg-white cursor-pointer border border-gray-300">
                    {salaries.map((salarieP) => {
                      i++;
                      var tempStatut = afficherStatut();
                      var statut = tempStatut["statut"] === 'active' ? 'bg-green-300 border border-green-500 rounded-lg m-2' : 'bg-red-300 border border-red-500 rounded-lg m-2';
                      // var statut = tempStatut["statut"] === 'inactive' ? 'Active' : 'inactive';
                      // console.log(tempStatut);

                      console.log(statut)
                      return (
                        <p
                          id={"cell_" + i}
                          key={"cell_" + i}
                          name={"cell_" + i}
                          value={salarieP.prenomSalarie}
                          onClick={handleClickPlanning}
                          className={statut}
                        >
                          {salarieP.prenomSalarie}

                        </p>
                      );
                    })}
                    {/* ajouter un tableau vide pour chaque div */}
                    {/* {selectedSalaries[cellIndex] && selectedSalaries[cellIndex].length === 0 && <table />} */}
                  </div>

                ))}
              </div>
            </div>

            <div className='w-2/12 bg-white ml-4 rounded-xl shadow-sm'>
              <div className='flex border-b justify-between'>
                <p className='text-lg text-center'>Liste des salariés</p>
                <button className='w-8 h-8 bg-bleu hover:bg-gris text-white font-bold rounded-full duration-500' onClick={handleClick}>+</button>
              </div>

              {
                salaries.map((salari) => (
                  <div className='border border-gris rounded-lg mt-4 mx-2 shadow-sm shadow-rouge1'>
                    <button className='bg bg-rouge1 text-white rounded-lg ml-1' onClick={() => handleDelete(salari.id)}><FaIcons.RxCross2 /></button>
                    <div className='flex justify-center -mt-6' key={salari.id}>
                      <p className="text-bleu text-center text-base font-medium mr-1" key={salari.prenomSalarie} >
                        {salari.prenomSalarie}</p>
                      <p className="text-bleu text-center text-base font-medium" key={salari.nomSalarie} >
                        {salari.nomSalarie}</p>
                    </div>
                    <p className="text-rouge1 text-center text-base font-medium" key={salari.posteSalaire} >
                      {salari.posteSalaire}</p>
                  </div>
                ))
              }
            </div>
          </div>

        </div>
      </section>
    </React.Fragment>
  );
};

export default Planning;