import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import * as FaIcons from 'react-icons/rx';
import * as FaIconsBootStrap from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';

function Salle() {
  const [toggleState, setToggleState] = useState(1);

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

  const navigate = useNavigate()

  const [table, setTable] = useState({
    numeroTable: "",
    placeTable: "",
    salle: "",
  });

  const handleChange = (e) => {
    setTable(prev => ({ ...prev, [e.target.name]: e.target.value }))
  };

  console.log(table);

  const handleClick = async e => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:5000/table-add", table)
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (numeroTable) => {
    try {
      await axios.delete("http://localhost:5000/table-delete/" + numeroTable)
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  }

  const [show, setShow] = useState(false);

  const statusChange = async (numeroTable, statutTable) => {
    if (statutTable === "Libre") {
      try {
        await axios.put("http://localhost:5000/tableUpdate-reservee/" + numeroTable)
        navigate(0);
      } catch (err) {
        console.log(err);
      }
      console.log("Changement de statut de Libre a Réservée")
    }
    if (statutTable === "Occupée") {
      try {
        await axios.put("http://localhost:5000/tableUpdate-libre/" + numeroTable)
        navigate(0);
      } catch (err) {
        console.log(err);
      }
      console.log("Changement de statut de Libre à Libre")
    }
    if (statutTable === "Réservée") {
      try {
        await axios.put("http://localhost:5000/tableUpdate-occupee/" + numeroTable)
        navigate(0);
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
              <div className='bg-gray-50 w-1/6 text-right border border-gris rounded-xl m-auto mt-24 mb-5 '>
                <p className='text-bleu text-center text-2xl'>Salle 1</p>
              </div>
              <button onClick={() => setShow(!show)} className="bg-bleu hover:bg-gris text-white font-bold py-2 px-4 rounded duration-500 mr-4 ml-4">
                Ajouter
              </button>
              <button className="bg-bleu hover:bg-gris text-white font-bold py-2 px-4 rounded duration-500">
                Fusionner
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
                    <div className='w-72' key={salle1.numeroTable}>
                      <div className={`${salle1.statutTable === 'Libre' ? 'bg-green-200' : salle1.statutTable === 'Occupée' ? 'bg-red-200' : salle1.statutTable === 'Réservée' ? 'bg-orange-200' : 'bg-gray-200'} mr-10 border border-gris rounded-xl mt-20 p-1`}>
                        <p className='text-bleu text-center text-2xl'>{salle1.numeroTable}</p>
                      </div>
                      <div className='bg-gray-50 text-right mr-10 border border-gris rounded-xl mt-1'>
                        <p className='text-bleu text-center text-2xl cursor-pointer hover:text-rouge1 duration-500' onClick={() => statusChange(salle1.numeroTable, salle1.statutTable)}>Statut: {salle1.statutTable}</p>
                        <p className='text-bleu text-center text-2xl'>Couverts: {salle1.placeTable}</p>
                        <div className='flex justify-center p-1'>
                          <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                            <Link to={`/CommandesTable/${salle1.numeroTable}`}>
                              <FaIconsBootStrap.FaCoffee size={16} />
                            </Link>
                          </button>
                          <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                            <Link to={`/UpdateTable/${salle1.numeroTable}`}>
                              <FaIconsBootStrap.FaPencilAlt size={16} />
                            </Link>
                          </button>
                          <button onClick={() => handleDelete(salle1.numeroTable)} className="text-white bg-bleu hover:bg-gris duration-500 rounded-md text-center p-1">
                            <FaIconsBootStrap.FaTrashAlt size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>

            <div className={toggleState === 2 ? "content  block" : "bg-white p-5 w-full h-full hidden"} >
              <div className='w-1/6 text-right mr-10 border border-gris rounded-xl mt-20'>
                <p className='text-bleu text-center text-2xl'>Salle 2</p>
              </div>
            </div>

            <div className={toggleState === 3 ? "content  block" : "bg-white p-5 w-full h-full hidden"} >
              <div className='w-1/6 text-right mr-10 border border-gris rounded-xl mt-20'>
                <p className='text-bleu text-center text-2xl'>Terrasse</p>
              </div>
            </div>
          </div>
        </div>
      </section >
    </React.Fragment >
  )
}

export default Salle