import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
//import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa"




function Reservation() {

  // Afficher/faire Disparaitre
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  // Onglets
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };


  // Récupérer clients
  const [clients, setClients] = useState([]);

  const [clientsAdd, setClientsAdd] = useState({
    nomClient: "",
    prenomClient: "",
    telephoneClient: "",
  });

  const handleChangeClient = (e) => {
    setClientsAdd(prev => ({ ...prev, [e.target.name]: e.target.value }))
  };
  console.log(clientsAdd);


  useEffect(() => {
    const fetchAllClients = async () => {
      try {
        const res = await axios.get("http://localhost:5000/clients");
        setClients(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllClients();
  }, []);
  console.log(clients);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:5000/clients-delete/" + id)
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  }



  // Récupérer réservations
  const [reservation, setReservation] = useState([]);

  const [reservationAdd, setReservationAdd] = useState({
    nbPersonnes: "",
    tableReserve: "",
    dateReserve: "",
    clientReserve: "",
  });

  const handleChange = (e) => {
    setReservationAdd(prev => ({ ...prev, [e.target.name]: e.target.value }))
  };
  console.log(reservationAdd);

  useEffect(() => {
    const fetchAllReservations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/reservations");
        setReservation(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllReservations();
  }, []);
  console.log(reservation);

  const handleDeleteReserver = async (id) => {
    try {
      await axios.delete("http://localhost:5000/reservations-delete/" + id)
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  }



  // Les boutons du formulaire

  const navigate = useNavigate();
  const [error, setError] = useState(false)

  const handleClick2 = async () => {
    try {
      const res = await axios.post("http://localhost:5000/reservation-add", reservationAdd);
      console.log("Ajout d'une réservation" + reservationAdd.data);
      navigate(0);
    } catch (err) {
      console.log(err);
      setError(true)
    }
    console.log(reservationAdd)


  };

  const handleClickClient = async () => {
    try {
      const res = await axios.post("http://localhost:5000/clients-add", clientsAdd);
      console.log("Ajout d'un client" + clientsAdd.data);
      navigate(0);
    } catch (err) {
      console.log(err);
      setError(true)
    }
  }







  return (
    <React.Fragment>
      <section>

        <div className="flex">
          <button className={toggleState === 1 ? "tabs p-4 text-center w-28 cursor-pointer box-content relative bg-blanc border-t-4 border-rouge1 duration-500" : "p-4 text-center text-white w-28 cursor-pointer box-content relative bg-bleu border-t-4 border-blanc hover:bg-gris duration-500"}
            onClick={() => toggleTab(1)} >
            Réservations
          </button>
          <button className={toggleState === 2 ? "tabs p-4 text-center w-28 cursor-pointer box-content relative bg-blanc border-t-4 border-rouge1 duration-500" : "p-4 text-center text-white w-28 cursor-pointer box-content relative bg-bleu border-t-4 border-blanc hover:bg-gris duration-500"}
            onClick={() => toggleTab(2)} >
            Clients
          </button>
        </div>



        <div className={toggleState === 1 ? "content  block" : "bg-white p-5 w-full h-full hidden"}>
          <div className="flex mt-4 sm:mt-0 ">
            <button
              type="button" onClick={() => setShow(!show)}
              className="ml-[83.5%] rounded-md border border-transparent bg-bleu px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gris">
              Nouvelle réservation
            </button>
          </div>
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
            </div>


            <div className="mt-8 mx-8 flex flex-col text-center">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-bleu items-center">
                        <tr>
                          <th
                            scope="col"
                            className="py-3 pl-4 pr-3 text-center text-xs font-medium uppercase tracking-wide text-white sm:pl-6">
                            N° Réservation
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-white">
                            Nombre de personnes
                          </th>
                          <th
                            scope="col"
                            className="px-20 py-3 text-center text-xs font-medium uppercase tracking-wide text-white">
                            N° Table
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-white">
                            Date et heure
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-white">
                            Nom du client
                          </th>

                          <th
                            scope="col"
                            className="text-center text-xs font-medium uppercase tracking-wide text-white">
                          </th>

                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">

                        {reservation.map((reserver) => (
                          <tr className='text-center' key={reserver.idReservation}>
                            <td className="whitespace-nowrap py-4 text-sm text-gray-500">{reserver.idReservation}</td>
                            <td className="whitespace-nowrap py-4 text-sm   text-gray-500">{reserver.nbPersonnes}</td>
                            <td className="whitespace-nowrap py-4 text-sm text-gray-500">{reserver.tableReserve}</td>
                            <td className="whitespace-nowrap py-4 text-sm text-gray-500">{new Date(reserver.dateReserve).toLocaleString()}</td>
                            <td className="whitespace-nowrap py-4 text-sm text-gray-500">{reserver.clientReserve}</td>

                            <button onClick={() => handleDeleteReserver(reserver.idReservation)} className="text-white bg-rouge2 hover:bg-gris duration-500 rounded-md mr-1 p-1 mt-3 mx-10">
                              <FaTrash size={15} />
                            </button>

                          </tr>


                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {show && (
            <form className="absolute right-[590px] top-34" onSubmit={handleClick2}>
              <div className="bg-white border-2 text-center px-4 rounded-lg border-bleu">
                <div className="py-4">
                  <label className="text-md">Nombre de personnes</label>
                  <input name="nbPersonnes" onChange={handleChange} type="number" className="text-center mt-1 block w-56 h-8 rounded-md border border-gray-300 focus:outline-none focus:border-bleu focus:ring-1 focus:ring-bleu shadow-sm sm:text-md"></input>
                </div>
                <div className="py-4">
                  <label className="text-md">Numéro de table</label>
                  <input name="tableReserve" onChange={handleChange} type="number" className="text-center mt-1 block w-56 h-8 rounded-md border border-gray-300 focus:outline-none focus:border-bleu focus:ring-1 focus:ring-bleu shadow-sm sm:text-md"></input>
                </div>
                <div className="py-4">
                  <label className="text-md">Date et heure</label>
                  <input name="dateReserve" onChange={handleChange} type="datetime-local" placeholder='AAAA/MM/JJ' className="text-center mt-1 block w-56 h-8 rounded-md border border-gray-300 focus:outline-none focus:border-bleu focus:ring-1 focus:ring-bleu shadow-sm sm:text-md"></input>
                </div>
                <div className="py-4">
                  <label className="text-md">Nom du client</label>
                  <select name="nomClient" onChange={handleChange} type="text" className="text-center mt-1 block w-56 h-8 rounded-md border border-gray-300 focus:outline-none focus:border-bleu focus:ring-1 focus:ring-bleu shadow-sm sm:text-md">
                    <option disabled selected> Veuillez sélectionner un client </option>
                    {clients.map((client) => (
                      <option key={clients.id} value={client.nomClient}>
                        {client.nomClient}
                      </option>
                    ))}
                  </select>

                </div>
                <div className="flex justify-center my-4">

                  <button
                    type="submit"
                    className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-bleu py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gris focus:outline-non">
                    Enregistrer
                  </button>

                  <button
                    type="button"
                    className="rounded-md border border-gray-300 bg-rouge1 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gris focus:outline-none mx-4"
                    onClick={() => setShow(!show)} >
                    Annuler
                  </button>

                </div>
              </div>
            </form>
          )}

        </div>







        <div className={toggleState === 2 ? "content  block" : "bg-white p-5 w-full h-full hidden"}>
          {<button
            type="button" onClick={() => setShow2(!show2)}
            className="flex ml-[85.2%] rounded-md border border-transparent bg-bleu px-4 py-2  text-sm font-medium text-white shadow-sm hover:bg-gris">
            Ajouter un client
          </button>}

          <div className="mt-8 mx-8 flex flex-col text-center">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-[95%] py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-bleu items-center">
                      <tr>
                        <th
                          scope="col"
                          className="py-3 pl-4 pr-3 w-2/6 text-center text-xs font-medium uppercase tracking-wide text-white sm:pl-6">
                          Nom
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 w-2/6 text-center text-xs font-medium uppercase tracking-wide text-white">
                          Prénom
                        </th>
                        <th
                          scope="col"
                          className="px-20 py-3 w-2/6 text-center text-xs font-medium uppercase tracking-wide text-white">
                          Numéro de téléphone
                        </th>

                        <th
                          scope="col"
                          className="text-center text-xs font-medium uppercase tracking-wide text-white">
                        </th>

                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">

                      {clients.map((client) => (
                        <tr className='text-center' key={client.id}>
                          <td className="whitespace-nowrap py-4 text-sm text-gray-500">{client.nomClient}</td>
                          <td className="whitespace-nowrap py-4 text-sm   text-gray-500">{client.prenomClient}</td>
                          <td className="whitespace-nowrap py-4 text-sm text-gray-500">{client.telephoneClient}</td>



                          <button onClick={() => handleDelete(client.id)} className="text-white bg-rouge2 hover:bg-gris duration-500 rounded-md mr-6 p-1 mt-3">
                            <FaTrash size={15} />
                          </button>


                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>


          {show2 && (
            <form className="absolute right-[590px] top-34" onSubmit={handleClickClient}>
              <div className="bg-white border-2 text-center px-4 rounded-lg border-bleu">
                <div className="py-4">
                  <label className="text-md">Nom</label>
                  <input name="nomClient" onChange={handleChangeClient} type="text" className="text-center mt-1 block w-56 h-8 rounded-md border border-gray-300 focus:outline-none focus:border-bleu focus:ring-1 focus:ring-bleu shadow-sm sm:text-md"></input>
                </div>
                <div className="py-4">
                  <label className="text-md">Prénom</label>
                  <input name="prenomClient" onChange={handleChangeClient} type="text" className="text-center mt-1 block w-56 h-8 rounded-md border border-gray-300 focus:outline-none focus:border-bleu focus:ring-1 focus:ring-bleu shadow-sm sm:text-md"></input>
                </div>
                <div className="py-4">
                  <label className="text-md">Numéro de téléphone</label>
                  <input name="telephoneClient" onChange={handleChangeClient} type="text" className="text-center mt-1 block w-56 h-8 rounded-md border border-gray-300 focus:outline-none focus:border-bleu focus:ring-1 focus:ring-bleu shadow-sm sm:text-md"></input>
                </div>
                <div className="flex justify-center my-4">

                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-bleu py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gris focus:outline-non">
                    Enregistrer
                  </button>

                  <button
                    type="button"
                    className="rounded-md border border-gray-300 bg-rouge1 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gris focus:outline-none mx-4"
                    onClick={() => setShow2(!show2)} >
                    Annuler
                  </button>

                </div>
              </div>
            </form>
          )}
        </div>


      </section>
    </React.Fragment>
  )
}

export default Reservation

