import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
//import { FaPen } from "react-icons/fa";
//import { FaTrash } from "react-icons/fa";




function Reservation() {

  const people = [
    { name: 'Aniss Briki', number: '0607080910', email: 'aniss.briki@gmail.com', date: '30/11/2000', couverts: '1'},
    // More people...
  ]

  // Afficher/faire Disparaitre
  const [show, setShow] = useState(false);
  //const [show2, setShow2] = useState(false);//

// Récupérer réservations
  const [reservation, setReservation] = useState([]);

  const [reservationAdd, setReservationAdd] = useState({
    nbPersonnes: "",
    tableReserve: "",
    dateReserve: "",
    clientReserve: "",
  });

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
// console.log(reservation);



// Les boutons du formulaire

const navigate = useNavigate();
const [error, setError] = useState(false)

const handleClick2 = async ()  => {
  try{
    const res = await axios.post("http://localhost:5000/reservation-add", reservationAdd);
    console.log("Ajout d'une réservation" + reservationAdd.data);
    navigate(0);
  }catch(err){
    console.log(err);
    setError(true)
  }
  console.log(reservationAdd)
};


 const close = () => {
    setShow(false);
  }



  return (
    <React.Fragment>
        <section>
          <br></br>
         <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
       <h1 className="text-xl font-semibold text-gray-900">Réservations</h1> 
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button" onClick={() => setShow(!show)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-bleu px-4 py-2 mr-5 text-sm font-medium text-white shadow-sm hover:bg-gris sm:w-auto">
            Nouvelle réservation
          </button>
          
          {/* <button
            type="button" onClick={() => setShow2(!show2)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-bleu px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gris sm:w-auto">
            Ajouter un client
          </button> */}

        </div>
      </div> 
  <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 pl-4 pr-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6">
                      N° Réservation
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
                      Nombre de personnes
                    </th>
                    <th
                      scope="col"
                      className="px-20 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
                      N° Table
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
                      Date et heure
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
                      N° Client
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
      <div className="bg-white border-2 text-center px-4 rounded-lg border border-bleu">
       <div className="py-4">
        <label className="text-md">Nombre de personnes</label>
       <input name="nbPersonnes" type="number" className="text-center mt-1 block w-56 h-8 rounded-md border border-gray-300 focus:outline-none focus:border-bleu focus:ring-1 focus:ring-bleu shadow-sm sm:text-md"></input>
       </div> 
       <div className="py-4">
       <label className="text-md">Numéro de table</label>
       <input name="tableReserve" type="number" className="text-center mt-1 block w-56 h-8 rounded-md border border-gray-300 focus:outline-none focus:border-bleu focus:ring-1 focus:ring-bleu shadow-sm sm:text-md"></input>
       </div> 
       <div className="py-4">
       <label className="text-md">Date de réservation</label>
       <input name="dateReserve" type="text" placeholder='AAAA/MM/JJ' className="text-center mt-1 block w-56 h-8 rounded-md border border-gray-300 focus:outline-none focus:border-bleu focus:ring-1 focus:ring-bleu shadow-sm sm:text-md"></input>
       </div> 
       <div className="py-4">
       <label className="text-md">Numéro de téléphone</label>
       <input name="clientReserve" type="text" className="text-center mt-1 block w-56 h-8 rounded-md border border-gray-300 focus:outline-none focus:border-bleu focus:ring-1 focus:ring-bleu shadow-sm sm:text-md"></input>
       </div>
       <div className="flex justify-center my-4">
  <button
    type="button"
    className="rounded-md border border-gray-300 bg-rouge1 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gris focus:outline-none"
    onClick={close} >
    Annuler
  </button>
  <button
    type="submit"
    className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-bleu py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gris focus:outline-non">
    Enregistrer
  </button>
  
      </div>
      </div>
      </form>
     )}

        </section>
    </React.Fragment>
  )
}
export default Reservation
