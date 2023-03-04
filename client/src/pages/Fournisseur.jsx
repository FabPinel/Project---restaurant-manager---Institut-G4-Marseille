import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as FaIconsBootStrap from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Fournisseur() {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const [fournisseurs, setFournisseur] = useState([]);
  const [newFournisseur, setNewFournisser] = useState({
    nomFournisseur: "",
    type: "",
  });
  const [show, setShow] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAllFournisseurs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/fournisseur");
        setFournisseur(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllFournisseurs();
  }, []);

  const handleClick = async (e) => {
    try {
      await axios.post("http://localhost:5000/fournisseur-add", newFournisseur);
      console.log("Ajout d'une réservation" + newFournisseur.data);
      navigate(0);
    } catch (err) {
      console.log(err);
    }
    console.log(newFournisseur)
  };

  const handleChange = (e) => {
    setNewFournisser(prev => ({ ...prev, [e.target.name]: e.target.value }))
  };
  console.log(newFournisseur);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:5000/fournisseur/" + id)
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  }

  console.log(fournisseurs);
  return (
    <React.Fragment>
      <section>
        <div className="flex">
          <button className={toggleState === 1 ? "tabs p-4 text-center w-38 cursor-pointer box-content relative bg-blanc border-t-4 border-rouge1 duration-500" : "p-4 text-center text-white w-38 cursor-pointer box-content relative bg-bleu border-t-4 border-blanc hover:bg-gris duration-500"}
            onClick={() => toggleTab(1)} >
            Nouvelle commande
          </button>
          <button className={toggleState === 2 ? "tabs p-4 text-center w-38 cursor-pointer box-content relative bg-blanc border-t-4 border-rouge1 duration-500" : "p-4 text-center text-white w-38 cursor-pointer box-content relative bg-bleu border-t-4 border-blanc hover:bg-gris duration-500"}
            onClick={() => toggleTab(2)} >
            Commande à valider
          </button>
          <button className={toggleState === 3 ? "tabs p-4 text-center w-38 cursor-pointer box-content relative bg-blanc border-t-4 border-rouge1 duration-500" : "p-4 text-center text-white w-38 cursor-pointer box-content relative bg-bleu border-t-4 border-blanc hover:bg-gris duration-500"}
            onClick={() => toggleTab(3)} >
            Fournisseurs
          </button>
        </div>
        <div className={toggleState === 1 ? "content  block" : "bg-white p-5 w-full h-full hidden"} >

        </div>
        <div className={toggleState === 2 ? "content  block" : "bg-white p-5 w-full h-full hidden"} >

        </div>
        <div className={toggleState === 3 ? "content  block" : "bg-white p-5 w-full h-full hidden"} >
          <div className='mt-5'>
            <button onClick={() => setShow(!show)} className="bg-bleu hover:bg-gris text-white font-bold py-2 px-4 rounded duration-500 mr-4 4 mb-5">
              Ajouter
            </button>
            {show &&
              <form onSubmit={handleClick}>
                <div className='w-auto bg-gray-50 border border-gris rounded-xl mt-20 mb-5 p-2 absolute shadow-2xl top-16'>
                  <h1 className="m-auto text-center text-3xl font-bold mt-2">Ajouter un fournisseur</h1>
                  <div className='m-auto mt-2 mb-5 p-2 flex flex-col justify-center items-center'>
                    <div className='form'>
                      <div className='flex'>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"> Nom</label>
                          <input type="text" name="nomFournisseur" onChange={handleChange} className='bg-gray-50 border border-gris text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-bleu block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" form-control' />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"> Type</label>
                          <input type="text" name="type" onChange={handleChange} className='bg-gray-50 border border-gris text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-bleu block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" form-control' />
                        </div>
                      </div>
                      <div className="text-center">
                        <button type='submit' className="bg-bleu hover:bg-gris text-white font-bold py-2 px-4 rounded duration-500 mr-4 mt-4">
                          Ajouter
                        </button>
                        <button onClick={() => setShow(!show)} className="bg-rouge1 hover:bg-gris text-white font-bold py-2 px-4 rounded duration-500 mr-4 mt-4">
                          Annuler
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            }
            <thead className="bg-bleu items-center">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-white w-full">
                  Nom
                </th>
                <th
                  scope="col"
                  className="px-20 py-3 text-center text-xs font-medium uppercase tracking-wide text-white w-full">
                  Type
                </th>
                <th
                  scope="col"
                  className="px-20 py-3 text-center text-xs font-medium uppercase tracking-wide text-white w-full">
                  Supprimer
                </th>
              </tr>
            </thead>
            {fournisseurs.map((fournisseur) => (
              <tr key={fournisseur.id}>
                <td className="whitespace-nowrap px-8 py-4 text-xl text-black border-solid border-2 bg-white">{fournisseur.nomFournisseur}</td>
                <td className="whitespace-nowrap px-10 py-1 text-xl text-black border-solid border-2 bg-white">
                  <div className="flex">
                    {fournisseur.type}
                  </div>
                </td>
                <td className="whitespace-nowrap px-10 py-4 text-xltext-black border-solid border-2 bg-white">
                  <button className="text-white bg-bleu hover:bg-gris duration-500 rounded-md mr-2 p-1">
                    <FaIconsBootStrap.FaPencilAlt size={24} />
                  </button>
                  <button onClick={() => handleDelete(fournisseur.id)} className="text-white bg-rouge2 hover:bg-gris duration-500 rounded-md mr-2 p-1">
                    <FaIconsBootStrap.FaTrashAlt size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default Fournisseur;