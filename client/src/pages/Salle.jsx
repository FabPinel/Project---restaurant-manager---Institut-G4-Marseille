import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import * as FaIcons from 'react-icons/rx';
import * as FaIconsBootStrap from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Salle() {
  const [toggleState, setToggleState] = useState(1);
  const [notification, setNotification] = useState({ message: "", show: false });
  const navigate = (n) => console.log(n);

  useEffect(() => {
    const storedNotification = JSON.parse(localStorage.getItem("notification"));
    if (storedNotification) {
      setNotification(storedNotification);
      localStorage.removeItem("notification");
    }
  }, []);

  useEffect(() => {
    if (notification.show) {
      setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 3000);
    }
  }, [notification]);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const [tableSalle1, setSalles] = useState([]);

  useEffect(() => {
    const fetchAllSalle = async () => {
      try {
        const res = await axios.get("http://localhost:5000/tables-salle1");
        setSalles(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllSalle();
  }, []);

  console.log(tableSalle1);

  const [tableSalle2, setSalle2] = useState([]);

  useEffect(() => {
    const fetchAllSalle2 = async () => {
      try {
        const res = await axios.get("http://localhost:5000/tables-salle2");
        setSalle2(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllSalle2();
  }, []);


  const [terrasse, setTerrasse] = useState([]);

  useEffect(() => {
    const fetchAllTerrasse = async () => {
      try {
        const res = await axios.get("http://localhost:5000/tables-terrasse");
        setTerrasse(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTerrasse();
  }, []);

  const [reservationSalle1, setReservationSalles1] = useState([]);

  useEffect(() => {
    const fetchAllReservationSalle1 = async e => {
      try {
        const res = await axios.get("http://localhost:5000/nombres-reservations-salle1");
        setReservationSalles1(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllReservationSalle1();
  }, []);

  const [reservationSalle2, setReservationSalles2] = useState([]);

  useEffect(() => {
    const fetchAllReservationSalle2 = async e => {
      try {
        const res = await axios.get("http://localhost:5000/nombres-reservations-salle2");
        setReservationSalles2(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllReservationSalle2();
  }, []);

  const [reservationTerrasse, setReservationTerrasse] = useState([]);

  useEffect(() => {
    const fetchAllReservationTerrasse = async e => {
      try {
        const res = await axios.get("http://localhost:5000/nombres-reservations-terrasse");
        setReservationTerrasse(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllReservationTerrasse();
  }, []);


  const [couvertsSalle1, setCouvertsSalles1] = useState([]);

  useEffect(() => {
    const fetchAllCouvertsSalle1 = async e => {
      try {
        const res = await axios.get("http://localhost:5000/nombres-couverts-salle1");
        setCouvertsSalles1(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCouvertsSalle1();
  }, []);

  const [couvertsSalle2, setCouvertsSalles2] = useState([]);

  useEffect(() => {
    const fetchAllCouvertsSalle2 = async e => {
      try {
        const res = await axios.get("http://localhost:5000/nombres-couverts-salle2");
        setCouvertsSalles2(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCouvertsSalle2();
  }, []);

  const [couvertsTerrasse, setCouvertsTerrasse] = useState([]);

  useEffect(() => {
    const fetchAllCouvertsTerrasse = async e => {
      try {
        const res = await axios.get("http://localhost:5000/nombres-couverts-terrasse");
        setCouvertsTerrasse(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCouvertsTerrasse();
  }, []);

  const [tablesSalle1, setTablesSalles1] = useState([]);

  useEffect(() => {
    const fetchAllTablesSalle1 = async e => {
      try {
        const res = await axios.get("http://localhost:5000/nombres-tables-salle1");
        setTablesSalles1(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTablesSalle1();
  }, []);

  const [tablesSalle2, setTablesSalles2] = useState([]);

  useEffect(() => {
    const fetchAllTablesSalle2 = async e => {
      try {
        const res = await axios.get("http://localhost:5000/nombres-tables-salle2");
        setTablesSalles2(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTablesSalle2();
  }, []);

  const [tablesTerrasse, setTablesTerrasse] = useState([]);

  useEffect(() => {
    const fetchAllTablesTerrasse = async e => {
      try {
        const res = await axios.get("http://localhost:5000/nombres-tables-terrasse");
        setTablesTerrasse(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTablesTerrasse();
  }, []);

  const [table, setTable] = useState({
    numeroTable: "",
    placeTable: "",
    salle: "",
  });

  const handleChange = (e) => {
    setTable(prev => ({ ...prev, [e.target.name]: e.target.value }))
  };


  console.log(table);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/table-add", table);
      navigate(0);
      localStorage.setItem("notification", JSON.stringify({ message: "Table ajoutée avec succès.", show: true }));
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (numeroTable) => {
    try {
      const response = await axios.delete("http://localhost:5000/table-delete/" + numeroTable);
      if (response.data.code === "ER_ROW_IS_REFERENCED_2") {
        const message = "Impossible de supprimer la table, elle possède une commande.";
        localStorage.setItem("notification", JSON.stringify({ message, show: true }));
      } else {
        const message = "Table Supprimée avec succès.";
        localStorage.setItem("notification", JSON.stringify({ message, show: true }));
      }

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const [show, setShow] = useState(false);

  const statusChange = async (numeroTable, statutTable) => {
    if (statutTable === "Libre") {
      try {
        await axios.put("http://localhost:5000/tableUpdate-reservee/" + numeroTable)
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
      console.log("Changement de statut de Libre a Réservée")
    }
    if (statutTable === "Occupée") {
      try {
        await axios.put("http://localhost:5000/tableUpdate-libre/" + numeroTable)
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
      console.log("Changement de statut de Libre à Libre")
    }
    if (statutTable === "Réservée") {
      try {
        await axios.put("http://localhost:5000/tableUpdate-occupee/" + numeroTable)
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
      console.log("Changement de statut de Libre à Occupée")
    }
  }

  return (
    <React.Fragment>
      <section>
        <div className="flex flex-col relative bg-blanc break-all w-full">
          <div className="flex">
            <button className={toggleState === 1 ? "tabs p-4 text-center w-28 cursor-pointer box-content relative bg-blanc border-t-4 border-rouge1 duration-500" : "p-4 text-center text-white w-28 cursor-pointer box-content relative bg-bleu border-t-4 border-blanc hover:bg-gris duration-500"}
              onClick={() => toggleTab(1)} >
              Salle 1
            </button>
            <button className={toggleState === 2 ? "tabs p-4 text-center w-28 cursor-pointer box-content relative bg-blanc border-t-4 border-rouge1 duration-500" : "p-4 text-center text-white w-28 cursor-pointer box-content relative bg-bleu border-t-4 border-blanc hover:bg-gris duration-500"}
              onClick={() => toggleTab(2)} >
              Salle 2
            </button>
            <button className={toggleState === 3 ? "tabs p-4 text-center w-28 cursor-pointer box-content relative bg-blanc border-t-4 border-rouge1 duration-500" : "p-4 text-center text-white w-28 cursor-pointer box-content relative bg-bleu border-t-4 border-blanc hover:bg-gris duration-500"}
              onClick={() => toggleTab(3)} >
              Terrasse
            </button>
          </div>

          <div className="flex-grow">
            <div className={toggleState === 1 ? "content  block" : "bg-white p-5 w-full h-full hidden"} >
              {notification.show && (
                <div className={`${notification.message === 'Impossible de supprimer la table, elle possède une commande.' ? 'bg-red-100 text-red-700 border-red-400' : 'bg-green-100 border-green-400 text-green-700'} border  px-4 py-3 rounded absolute right-0 transition duration-500 shadow-2xl role="alert"`}>
                  <strong className="font-bold">{notification.message}</strong>
                </div>
              )}
              <div className='bg-gray-50 w-1/6 text-right border border-gris rounded-xl m-auto mt-24 mb-5 '>
                <p className='text-bleu text-center text-2xl'>Salle 1</p>
              </div>
              <button onClick={() => setShow(!show)} className="bg-bleu hover:bg-gris text-white font-bold py-2 px-4 rounded duration-500 mr-4 ml-4">
                Ajouter
              </button>
              {show &&
                <div className='w-auto bg-gray-50 border border-gris rounded-xl m-auto mt-20 mb-5 p-2 absolute shadow-2xl left-96 top-16'>
                  <h1 className="m-auto text-center text-3xl font-bold mt-2">Ajouter une table</h1>
                  <div className='m-auto mt-2 mb-5 p-2 flex flex-col justify-center items-center'>
                    <div className='form'>
                      <div className='flex'>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"> Numéro</label>
                          <input type="number" name="numeroTable" onChange={handleChange} className='bg-gray-50 border border-gris text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-bleu block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" form-control' />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"> Nombre de couverts</label>
                          <select type="number" name="placeTable" onChange={handleChange} className='bg-gray-50 border border-gris text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-bleu block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" form-control' >
                            <option selected></option>
                            <option value="2">2</option>
                            <option value="4">4</option>
                            <option value="8">8</option>
                          </select>
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"> Salle</label>
                          <select type="text" name="salle" onChange={handleChange} className='bg-gray-50 border border-gris text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-bleu block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" form-control' >
                            <option selected></option>
                            <option value="Salle1">Salle1</option>
                            <option value="Salle2">Salle2</option>
                            <option value="Terrasse">Terrasse</option>
                          </select>
                        </div>
                      </div>
                      <div className="text-center">
                        <button onClick={handleClick} className="bg-bleu hover:bg-gris text-white font-bold py-2 px-4 rounded duration-500 mr-4 mt-4">
                          Ajouter
                        </button>
                        <button onClick={() => setShow(!show)} className="bg-rouge1 hover:bg-gris text-white font-bold py-2 px-4 rounded duration-500 mr-4 mt-4">
                          Annuler
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              }
              <div className='w-full text-right mr-10 mt-2 flex flex-row'>
                <div className='bg-gray-50 w-1/6 text-right mr-10 border border-gris rounded-xl mt-20 basis-1/4 md:basis-1/3'>
                  <p className='text-bleu text-center text-2xl'>Réservation: {reservationSalle1}</p>
                </div>
                <div className='bg-gray-50 w-1/6 text-right mr-10 border border-gris rounded-xl mt-20 basis-1/4 md:basis-1/3'>
                  <p className='text-bleu text-center text-2xl'>Nbr Couverts: {couvertsSalle1}</p>
                </div>
                <div className='bg-gray-50 w-1/6 text-right mr-10 border border-gris rounded-xl mt-20 basis-1/4 md:basis-1/3'>
                  <p className='text-bleu text-center text-2xl'>Nbr Tables: {tablesSalle1}</p>
                </div>
              </div>
              <div className='flex flex-wrap justify-center'>
                {
                  tableSalle1.map((salle1) => (
                    <div className='w-72 transition duration-500 transform hover:-translate-y-1' key={salle1.numeroTable}>
                      <div className={`${salle1.statutTable === 'Libre' ? 'bg-green-200' : salle1.statutTable === 'Occupée' ? 'bg-red-200' : salle1.statutTable === 'Réservée' ? 'bg-orange-200' : 'bg-gray-200'} mr-10 border border-gris rounded-xl mt-20 p-1`}>
                        <p className='text-bleu text-center text-2xl'>{salle1.numeroTable}</p>
                      </div>
                      <div className='bg-gray-50 text-right mr-10 border border-gris rounded-xl mt-1'>
                        <p className={`${salle1.statutTable === 'Libre' ? 'hover:text-green-500' : salle1.statutTable === 'Occupée' ? 'hover:text-red-500' : salle1.statutTable === 'Réservée' ? 'hover:text-orange-500' : 'text-bleu'} text-center text-2xl cursor-pointer duration-500`} onClick={() => statusChange(salle1.numeroTable, salle1.statutTable)}>Statut: {salle1.statutTable}</p>
                        <p className='text-bleu text-center text-2xl'>Couverts: {salle1.placeTable}</p>
                        <div className='flex justify-center p-1'>
                          <div className="relative group">
                            <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                              <Link to={`/CommandesTable/${salle1.numeroTable}`}>
                                <FaIconsBootStrap.FaCoffee size={16} />
                              </Link>
                            </button>
                            <div className="w-24 border border-gris opacity-0 bg-white text-bleu text-center text-sm rounded-md py-2 absolute z-10 group-hover:opacity-100 group-hover:transition-opacity duration-300 transition-opacity ease-in-out delay-100 bottom-full left-1/2 transform -translate-x-1/2">
                              Commandes
                            </div>
                          </div>
                          <div className="relative group">
                            <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                              <Link to={`/UpdateTable/${salle1.numeroTable}`}>
                                <FaIconsBootStrap.FaPencilAlt size={16} />
                              </Link>
                            </button>
                            <div className="w-24 border border-gris opacity-0 bg-white text-bleu text-center text-sm rounded-md py-2 absolute z-10 group-hover:opacity-100 group-hover:transition-opacity duration-300 transition-opacity ease-in-out delay-100 bottom-full left-1/2 transform -translate-x-1/2">
                              Editer
                            </div>
                          </div>
                          <div className="relative group">
                            <button onClick={() => handleDelete(salle1.numeroTable)} className="text-white bg-bleu hover:bg-gris duration-500 rounded-md text-center p-1">
                              <FaIconsBootStrap.FaTrashAlt size={16} />
                            </button>
                            <div className="w-24 border border-gris opacity-0 bg-white text-bleu text-center text-sm rounded-md py-2 absolute z-10 group-hover:opacity-100 group-hover:transition-opacity duration-300 transition-opacity ease-in-out delay-100 bottom-full left-1/2 transform -translate-x-1/2">
                              Supprimer
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))
                }
              </div>
            </div>

            <div className={toggleState === 2 ? "content  block" : "bg-white p-5 w-full h-full hidden"} >
              {notification.show && (
                <div className={`${notification.message === 'Impossible de supprimer la table, elle possède une commande.' ? 'bg-red-100 text-red-700 border-red-400' : 'bg-green-100 border-green-400 text-green-700'} border  px-4 py-3 rounded absolute right-0 transition duration-500 shadow-2xl role="alert"`}>
                  <strong className="font-bold">{notification.message}</strong>
                </div>
              )}
              <div className='bg-gray-50 w-1/6 text-right border border-gris rounded-xl m-auto mt-24 mb-5 '>
                <p className='text-bleu text-center text-2xl'>Salle 2</p>
              </div>
              <button onClick={() => setShow(!show)} className="bg-bleu hover:bg-gris text-white font-bold py-2 px-4 rounded duration-500 mr-4 ml-4">
                Ajouter
              </button>
              {show &&
                <div className='w-auto bg-gray-50 border border-gris rounded-xl m-auto mt-20 mb-5 p-2 absolute shadow-2xl left-96 top-16'>
                  <h1 className="m-auto text-center text-3xl font-bold mt-2">Ajouter une table</h1>
                  <div className='m-auto mt-2 mb-5 p-2 flex flex-col justify-center items-center'>
                    <div className='form'>
                      <div className='flex'>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"> Numéro</label>
                          <input type="number" name="numeroTable" onChange={handleChange} className='bg-gray-50 border border-gris text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-bleu block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" form-control' />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"> Nombre de couverts</label>
                          <select type="number" name="placeTable" onChange={handleChange} className='bg-gray-50 border border-gris text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-bleu block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" form-control' >
                            <option selected></option>
                            <option value="2">2</option>
                            <option value="4">4</option>
                            <option value="8">8</option>
                          </select>
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"> Salle</label>
                          <select type="text" name="salle" onChange={handleChange} className='bg-gray-50 border border-gris text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-bleu block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" form-control' >
                            <option selected></option>
                            <option value="Salle1">Salle1</option>
                            <option value="Salle2">Salle2</option>
                            <option value="Terrasse">Terrasse</option>
                          </select>
                        </div>
                      </div>
                      <div className="text-center">
                        <button onClick={handleClick} className="bg-bleu hover:bg-gris text-white font-bold py-2 px-4 rounded duration-500 mr-4 mt-4">
                          Ajouter
                        </button>
                        <button onClick={() => setShow(!show)} className="bg-rouge1 hover:bg-gris text-white font-bold py-2 px-4 rounded duration-500 mr-4 mt-4">
                          Annuler
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              }
              <div className='w-full text-right mr-10 mt-2 flex flex-row'>
                <div className='bg-gray-50 w-1/6 text-right mr-10 border border-gris rounded-xl mt-20 basis-1/4 md:basis-1/3'>
                  <p className='text-bleu text-center text-2xl'>Réservation: {reservationSalle2}</p>
                </div>
                <div className='bg-gray-50 w-1/6 text-right mr-10 border border-gris rounded-xl mt-20 basis-1/4 md:basis-1/3'>
                  <p className='text-bleu text-center text-2xl'>Nbr Couverts: {couvertsSalle2}</p>
                </div>
                <div className='bg-gray-50 w-1/6 text-right mr-10 border border-gris rounded-xl mt-20 basis-1/4 md:basis-1/3'>
                  <p className='text-bleu text-center text-2xl'>Nbr Tables: {tablesSalle2}</p>
                </div>
              </div>
              <div className='flex flex-wrap justify-center'>
                {
                  tableSalle2.map((salle2) => (
                    <div className='w-72 transition duration-500 transform hover:-translate-y-1' key={salle2.numeroTable}>
                      <div className={`${salle2.statutTable === 'Libre' ? 'bg-green-200' : salle2.statutTable === 'Occupée' ? 'bg-red-200' : salle2.statutTable === 'Réservée' ? 'bg-orange-200' : 'bg-gray-200'} mr-10 border border-gris rounded-xl mt-20 p-1`}>
                        <p className='text-bleu text-center text-2xl'>{salle2.numeroTable}</p>
                      </div>
                      <div className='bg-gray-50 text-right mr-10 border border-gris rounded-xl mt-1'>
                        <p className={`${salle2.statutTable === 'Libre' ? 'hover:text-green-500' : salle2.statutTable === 'Occupée' ? 'hover:text-red-500' : salle2.statutTable === 'Réservée' ? 'hover:text-orange-500' : 'text-bleu'} text-center text-2xl cursor-pointer duration-500`} onClick={() => statusChange(salle2.numeroTable, salle2.statutTable)}>Statut: {salle2.statutTable}</p>
                        <p className='text-bleu text-center text-2xl'>Couverts: {salle2.placeTable}</p>
                        <div className='flex justify-center p-1'>
                          <div className="relative group">
                            <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                              <Link to={`/CommandesTable/${salle2.numeroTable}`}>
                                <FaIconsBootStrap.FaCoffee size={16} />
                              </Link>
                            </button>
                            <div className="w-24 border border-gris opacity-0 bg-white text-bleu text-center text-sm rounded-md py-2 absolute z-10 group-hover:opacity-100 group-hover:transition-opacity duration-300 transition-opacity ease-in-out delay-100 bottom-full left-1/2 transform -translate-x-1/2">
                              Commandes
                            </div>
                          </div>
                          <div className="relative group">
                            <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                              <Link to={`/UpdateTable/${salle2.numeroTable}`}>
                                <FaIconsBootStrap.FaPencilAlt size={16} />
                              </Link>
                            </button>
                            <div className="w-24 border border-gris opacity-0 bg-white text-bleu text-center text-sm rounded-md py-2 absolute z-10 group-hover:opacity-100 group-hover:transition-opacity duration-300 transition-opacity ease-in-out delay-100 bottom-full left-1/2 transform -translate-x-1/2">
                              Editer
                            </div>
                          </div>
                          <div className="relative group">
                            <button onClick={() => handleDelete(salle2.numeroTable)} className="text-white bg-bleu hover:bg-gris duration-500 rounded-md text-center p-1">
                              <FaIconsBootStrap.FaTrashAlt size={16} />
                            </button>
                            <div className="w-24 border border-gris opacity-0 bg-white text-bleu text-center text-sm rounded-md py-2 absolute z-10 group-hover:opacity-100 group-hover:transition-opacity duration-300 transition-opacity ease-in-out delay-100 bottom-full left-1/2 transform -translate-x-1/2">
                              Supprimer
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))
                }
              </div>
            </div>

            <div className={toggleState === 3 ? "content  block" : "bg-white p-5 w-full h-full hidden"} >
              {notification.show && (
                <div className={`${notification.message === 'Impossible de supprimer la table, elle possède une commande.' ? 'bg-red-100 text-red-700 border-red-400' : 'bg-green-100 border-green-400 text-green-700'} border  px-4 py-3 rounded absolute right-0 transition duration-500 shadow-2xl role="alert"`}>
                  <strong className="font-bold">{notification.message}</strong>
                </div>
              )}
              <div className='bg-gray-50 w-1/6 text-right border border-gris rounded-xl m-auto mt-24 mb-5 '>
                <p className='text-bleu text-center text-2xl'> Terasse</p>
              </div>
              <button onClick={() => setShow(!show)} className="bg-bleu hover:bg-gris text-white font-bold py-2 px-4 rounded duration-500 mr-4 ml-4">
                Ajouter
              </button>
              {show &&
                <div className='w-auto bg-gray-50 border border-gris rounded-xl m-auto mt-20 mb-5 p-2 absolute shadow-2xl left-96 top-16'>
                  <h1 className="m-auto text-center text-3xl font-bold mt-2">Ajouter une table</h1>
                  <div className='m-auto mt-2 mb-5 p-2 flex flex-col justify-center items-center'>
                    <div className='form'>
                      <div className='flex'>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"> Numéro</label>
                          <input type="number" name="numeroTable" onChange={handleChange} className='bg-gray-50 border border-gris text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-bleu block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" form-control' />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"> Nombre de couverts</label>
                          <select type="number" name="placeTable" onChange={handleChange} className='bg-gray-50 border border-gris text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-bleu block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" form-control' >
                            <option selected></option>
                            <option value="2">2</option>
                            <option value="4">4</option>
                            <option value="8">8</option>
                          </select>
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"> Salle</label>
                          <select type="text" name="salle" onChange={handleChange} className='bg-gray-50 border border-gris text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-bleu block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" form-control' >
                            <option selected></option>
                            <option value="Salle1">Salle1</option>
                            <option value="Salle2">Salle2</option>
                            <option value="Terrasse">Terrasse</option>
                          </select>
                        </div>
                      </div>
                      <div className="text-center">
                        <button onClick={handleClick} className="bg-bleu hover:bg-gris text-white font-bold py-2 px-4 rounded duration-500 mr-4 mt-4">
                          Ajouter
                        </button>
                        <button onClick={() => setShow(!show)} className="bg-rouge1 hover:bg-gris text-white font-bold py-2 px-4 rounded duration-500 mr-4 mt-4">
                          Annuler
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              }
              <div className='w-full text-right mr-10 mt-2 flex flex-row'>
                <div className='bg-gray-50 w-1/6 text-right mr-10 border border-gris rounded-xl mt-20 basis-1/4 md:basis-1/3'>
                  <p className='text-bleu text-center text-2xl'>Réservation: {reservationTerrasse}</p>
                </div>
                <div className='bg-gray-50 w-1/6 text-right mr-10 border border-gris rounded-xl mt-20 basis-1/4 md:basis-1/3'>
                  <p className='text-bleu text-center text-2xl'>Nbr Couverts: {couvertsTerrasse}</p>
                </div>
                <div className='bg-gray-50 w-1/6 text-right mr-10 border border-gris rounded-xl mt-20 basis-1/4 md:basis-1/3'>
                  <p className='text-bleu text-center text-2xl'>Nbr Tables: {tablesTerrasse}</p>
                </div>
              </div>
              <div className='flex flex-wrap justify-center'>
                {
                  terrasse.map((terrasse) => (
                    <div className='w-72 transition duration-500 transform hover:-translate-y-1' key={terrasse.numeroTable}>
                      <div className={`${terrasse.statutTable === 'Libre' ? 'bg-green-200' : terrasse.statutTable === 'Occupée' ? 'bg-red-200' : terrasse.statutTable === 'Réservée' ? 'bg-orange-200' : 'bg-gray-200'} mr-10 border border-gris rounded-xl mt-20 p-1`}>
                        <p className='text-bleu text-center text-2xl'>{terrasse.numeroTable}</p>
                      </div>
                      <div className='bg-gray-50 text-right mr-10 border border-gris rounded-xl mt-1'>
                        <p className={`${terrasse.statutTable === 'Libre' ? 'hover:text-green-500' : terrasse.statutTable === 'Occupée' ? 'hover:text-red-500' : terrasse.statutTable === 'Réservée' ? 'hover:text-orange-500' : 'text-bleu'} text-center text-2xl cursor-pointer duration-500`} onClick={() => statusChange(terrasse.numeroTable, terrasse.statutTable)}>Statut: {terrasse.statutTable}</p>
                        <p className='text-bleu text-center text-2xl'>Couverts: {terrasse.placeTable}</p>
                        <div className='flex justify-center p-1'>
                          <div className="relative group">
                            <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                              <Link to={`/CommandesTable/${terrasse.numeroTable}`}>
                                <FaIconsBootStrap.FaCoffee size={16} />
                              </Link>
                            </button>
                            <div className="w-24 border border-gris opacity-0 bg-white text-bleu text-center text-sm rounded-md py-2 absolute z-10 group-hover:opacity-100 group-hover:transition-opacity duration-300 transition-opacity ease-in-out delay-100 bottom-full left-1/2 transform -translate-x-1/2">
                              Commandes
                            </div>
                          </div>
                          <div className="relative group">
                            <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                              <Link to={`/UpdateTable/${terrasse.numeroTable}`}>
                                <FaIconsBootStrap.FaPencilAlt size={16} />
                              </Link>
                            </button>
                            <div className="w-24 border border-gris opacity-0 bg-white text-bleu text-center text-sm rounded-md py-2 absolute z-10 group-hover:opacity-100 group-hover:transition-opacity duration-300 transition-opacity ease-in-out delay-100 bottom-full left-1/2 transform -translate-x-1/2">
                              Editer
                            </div>
                          </div>
                          <div className="relative group">
                            <button onClick={() => handleDelete(terrasse.numeroTable)} className="text-white bg-bleu hover:bg-gris duration-500 rounded-md text-center p-1">
                              <FaIconsBootStrap.FaTrashAlt size={16} />
                            </button>
                            <div className="w-24 border border-gris opacity-0 bg-white text-bleu text-center text-sm rounded-md py-2 absolute z-10 group-hover:opacity-100 group-hover:transition-opacity duration-300 transition-opacity ease-in-out delay-100 bottom-full left-1/2 transform -translate-x-1/2">
                              Supprimer
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </section >
    </React.Fragment >
  )
}

export default Salle