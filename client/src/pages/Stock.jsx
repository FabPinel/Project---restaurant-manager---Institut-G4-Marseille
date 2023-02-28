import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { GiSaucepan } from "react-icons/gi";


function Stock() {

  const [showForm, setShowform] = useState(false);
  const open = () => {
    setShowform(true);
  }
  const close = () => {
    setShowform(false);
  }
  const [ingredients, setIngredients] = useState([]);
  const navigate = useNavigate();
  const [fournisseurs, setFournisseurs] = useState([]);

  useEffect(() => {
    const fetchAllIngredients = async () => {
      try {
        const res = await axios.get("http://localhost:5000/ingredients"); //le "http://localhost:5000/..." doit être équivalent à celui dans le fichier server.js
        setIngredients(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllIngredients();
  }, []);

  // console.log(ingredients);

  const [ingredient, setIngredient] = useState({
    nomIngredient: "",
    datePeremption: "",
    coutIngredient: "",
    fournisseur: "",
    stock: "",
    iconeUrl: "",
  })

  const handleChange = (e) => {
    setIngredient((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async () => {
    try {
      const addI = await axios.post("http://localhost:5000/ajout-ingredients", ingredient)
      console.log("Les ingrédients ont été ajoutés :", addI.data);
      navigate(0)
    }
    catch (error) {
      console.log("Error adding ingredient data :", error);
    };
    console.log(ingredient)
  }

  useEffect(() => {
    const fetchAllFournisseurs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/fournisseur"); //le "http://localhost:5000/..." doit être équivalent à celui dans le fichier server.js
        setFournisseurs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllFournisseurs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios("http://localhost:500/fournisseur/" + id);
      window.location.reload()
      navigate(0);
    } catch (err) {
      console.log(err)
    }
  };


  return (
    <React.Fragment>
      <section>
        <div className="bg-gris w-full h-full">
          <button type='button' onClick={open} className='w-40 h-12 text-white rounded-xl bg-bleu'>Créer un ingrédient</button>
          {showForm && (
            <form action="" className='absolute w-60 bg-white' onSubmit={handleSubmit}>
              <div className='m-auto'>
                <p className='text-center text-bleu text-lg'>Nom de l'ingrédient</p>
                <input type="text" name='nomIngredient' className='mx-auto' onChange={handleChange} />
                <p className='text-center text-bleu text-lg'>Date de péremption</p>
                <input type="text" name='datePeremption' className='mx-auto' onChange={handleChange} />
                <p className='text-center text-bleu text-lg'>Coût de l'ingrédient</p>
                <input type="text" name='coutIngredient' className='mx-auto' onChange={handleChange} />
                <p className='text-center text-bleu text-lg'>Fournisseur</p>
                <select name="fournisseur" id="fournisser" className='mx-auto' onChange={handleChange} >
                  {
                    fournisseurs.map((fournisseur) => (
                      <option key={fournisseur.nomFournisseur} value={fournisseur.nomFournisseur} className='h-10 w-32'>{fournisseur.nomFournisseur}</option>
                    ))
                  }
                </select>
                <p className='text-center text-bleu text-lg'>Stock</p>
                <input type="text" name='stock' className='mx-auto' onChange={handleChange} />
                <p className='text-center text-bleu text-lg'>Url de l'icone</p>
                <input type="text" name='iconeUrl' className='mx-auto' onChange={handleChange} />
                <div className='flex justify-center'>
                  <button type='button' onClick={close} className='rounded-md border border-gray-300 bg-rouge1 py-2 px-4 text-sm font-medium text-white shadow-sm hover-bg-gris focus:outline'>
                    Annuler</button>
                  <button type='submit' className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-bleu py-2 px-4 text-sm font-medium text-white'>
                    Enregistrer</button>
                </div>
              </div>
            </form>
          )}


          <div className='flex flex-wrap'>
            {
              ingredients.map((ingredient) => (
                <div className='w-60 flex flex-wrap bg-white border-2 rounded-xl m-auto mb-2 mt-2'>
                  <img src={ingredient.iconeUrl} key={ingredient.nomIngredient} alt='pâte' className="text-bleu h-10 m-auto w-1/4">
                  </img>
                  <div className='w-"3/4 flex'>
                    <p className='text-center ml-2'>{ingredient.nomIngredient}</p>
                    <p className='text-center ml-2'>{ingredient.stock}</p>
                    <button onClick={handleDelete}>< GiSaucepan /></button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default Stock