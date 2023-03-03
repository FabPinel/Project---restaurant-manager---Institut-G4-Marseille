import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import * as FaIcons from "react-icons/ai";


function Stock() {

  const [showForm, setShowform] = useState(false);
  const open = () => {
    setShowform(true);
  }
  const close = () => {
    setShowform(false);
  }
 
  const [ingredients, setIngredients] = useState([]);
  const [ingredientConso, setIngredientConso] = useState([]);
  const [ingredientBoisson, setIngredientBoisson] = useState([]);
  const navigate = useNavigate();
  const [fournisseurs, setFournisseurs] = useState([]);
  const [categorieStock, setCategorieStock] = useState([]);

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

  useEffect(() => {
    const fetchAllIngredientConso = async () => {
      try {
        const res = await axios.get("http://localhost:5000/ingredientConso"); //le "http://localhost:5000/..." doit être équivalent à celui dans le fichier server.js
        setIngredientConso(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllIngredientConso();
  }, []);


  useEffect(() => {
    const fetchAllIngredientBoisson = async () => {
      try {
        const res = await axios.get("http://localhost:5000/ingredientBoisson"); //le "http://localhost:5000/..." doit être équivalent à celui dans le fichier server.js
        setIngredientBoisson(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllIngredientBoisson();
  }, []);


  // console.log(ingredients);

  const [ingredient, setIngredient] = useState({
    nomIngredient: "",
    datePeremption: "",
    coutIngredient: "",
    fournisseur: "",
    stock: "",
    iconeUrl: "",
    categorieIngredient: "",
  })
  // console.log(ingredient)

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

  const handleDelete = async (nomIngredient) => {
    try {
      await axios.delete("http://localhost:5000/ingredient/"+ nomIngredient);
      window.location.reload()
      navigate(0);
    } catch (err) {
      console.log(err)
    }
  };


  
  useEffect(() => {
    const fetchAllCategorieStock = async () => {
      try {
        const res = await axios.get("http://localhost:5000/categorieStock"); //le "http://localhost:5000/..." doit être équivalent à celui dans le fichier server.js
        setCategorieStock(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCategorieStock();
  }, []);

  const handleEdit = async (nomIngredient, stock) => {
    const nouveauNom = prompt("Entrez le nouveau nom : ");
    const nouveauStock = prompt("Entrez le nouveau stock : ");
    
    if (nouveauNom && nouveauStock) {
        const nouvelleListe = ingredientBoisson.map((ingredientB) => {
            if (ingredientB.nomIngredient === nomIngredient) {
                return {
                    ...ingredientB,
                    nomIngredient: nouveauNom,
                    stock: nouveauStock
                };
            }
            return ingredientB;
        });
        
        setIngredientBoisson(nouvelleListe);
    }

    try {
      await axios.put("http://localhost:5000/modifs-ingredients/"+nomIngredient)
      navigate(0);
    } catch (err){
      console.log(err);
    }
};

  return (
    <React.Fragment>
      <section>
        <div className="w-full h-full">
          <button type='button' onClick={open} className='w-40 h-12 text-white rounded-xl bg-bleu'>Créer un ingrédient</button>
          {showForm && (
            <form action="" className='absolute w-60 bg-white ' onSubmit={handleSubmit}>
              <div className='m-auto'>
                <p className='text-center text-bleu text-lg'>Nom de l'ingrédient</p>
                <input type="text" name='nomIngredient' className='block m-auto my-2 rounded-md border border-gray-300 focus:outline-none focus:border-bleu focus:ring-1 focus:ring-bleu shadow-sm sm-text-md' onChange={handleChange} />
                <p className='text-center text-bleu text-lg'>Date de péremption</p>
                <input type="text" name='datePeremption' className='block m-auto my-2 rounded-md border border-gray-300 focus:outline-none focus:border-bleu focus:ring-1 focus:ring-bleu shadow-sm sm-text-md' onChange={handleChange} />
                <p className='text-center text-bleu text-lg'>Coût de l'ingrédient</p>
                <input type="text" name='coutIngredient' className='block m-auto my-2 rounded-md border border-gray-300 focus:outline-none focus:border-bleu focus:ring-1 focus:ring-bleu shadow-sm sm-text-md' onChange={handleChange} />
                <p className='text-center text-bleu text-lg'>Fournisseur</p>
                <select name="fournisseur" id="fournisseur" className='block m-auto my-2 rounded-md border border-gray-300 focus:outline-none focus:border-bleu focus:ring-1 focus:ring-bleu shadow-sm sm-text-md' onChange={handleChange} >
                  <option>Sélectionner un fournisseur</option>
                  {
                    fournisseurs.map((fournisseur) => (
                      <option key={fournisseur.nomFournisseur} value={fournisseur.nomFournisseur} className='h-10 w-32'>{fournisseur.nomFournisseur}</option>
                    ))
                  }
                </select>
                <p className='text-center text-bleu text-lg'>Stock</p>
                <input type="text" name='stock' className='block m-auto my-2 rounded-md border border-gray-300 focus:outline-none focus:border-bleu focus:ring-1 focus:ring-bleu shadow-sm sm-text-md' onChange={handleChange} />
                <p className='text-center text-bleu text-lg'>Url de l'icone</p>
                <input type="text" name='iconeUrl' className='block m-auto my-2 rounded-md border border-gray-300 focus:outline-none focus:border-bleu focus:ring-1 focus:ring-bleu shadow-sm sm-text-md' onChange={handleChange} />
                <p className='text-center text-bleu text-lg'>Catégorie</p>
                <select name='categorieIngredient' id='categorieIngredient' className='block m-auto my-4' onChange={handleChange}>
                <option>Sélectionner une catégorie</option>
                { 
                categorieStock.map((categ) => (
                      <option key={categ.nom} value={categ.nom} className='h-10 w-32'>{categ.nom}</option>
                )
                )}
               </select>
                <div className='flex justify-center mb-4'>
                  <button type='button' onClick={close} className='rounded-md border border-gray-300 bg-rouge1 py-2 px-4 text-sm font-medium text-white shadow-sm hover-bg-gris focus:outline hover:bg-gris'>
                    Annuler</button>
                  <button type='submit' className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-bleu py-2 px-4 text-sm font-medium text-white hover:bg-gris'>
                    Enregistrer</button>
                </div>
              </div>
            </form>
          )}

          <h2 className='text-center text-2xl'>Ingrédients</h2>

          <div className='flex flex-wrap justify-between border-b border-black'>
            {
              ingredients.map((ingredient) => (
                <div className='w-22 h-26 bg-white border-2 border-gris rounded-xl mx-2 my-2'>
                  <div className='flex justify-center w-full h-10 border-b border-bleu'>
                  <img src={ingredient.iconeUrl} key={ingredient.nomIngredient} alt='pâte' className="text-bleu h-10"></img>
                  <button onClick={() => handleDelete(ingredient.nomIngredient)}>< FaIcons.AiOutlineMinusCircle size={28}/></button>
                  </div>
                    <p className='text-sm text-center'>{ingredient.nomIngredient}</p>
                    <p className='text-sm text-center'>{ingredient.stock}</p>
                </div>
              ))
            }
          </div>

        <h2 className='text-center text-2xl mt-4'>Consommable</h2>

        <div className='flex flex-wrap border-b border-black'>
            {
              ingredientConso.map((ingredientC) => (
                <div className='w-22 h-26 bg-white border-2 border-gris rounded-xl mx-2 my-2'>
                  <div className='flex justify-center w-full h-10 border-b border-bleu'>
                  <img src={ingredientC.iconeUrl} key={ingredientC.nomIngredient} alt='pâte' className="text-bleu h-10"></img>
                  <button onClick={() => handleDelete(ingredientC.nomIngredient)}>< FaIcons.AiOutlineMinusCircle size={28}/></button>
                  </div>
                    <p className='text-sm text-center'>{ingredientC.nomIngredient}</p>
                    <p className='text-sm text-center'>{ingredientC.stock}</p>
                </div>
              ))
            }
          </div>

          <h2 className='text-center text-2xl mt-4'>Boissons</h2>

        <div className='flex flex-wrap border-b border-black'>
            {
              ingredientBoisson.map((ingredientB) => (
                <div className='w-22 h-26 bg-white border-2 border-gris rounded-xl mx-2 my-2'>
                  <div className='flex justify-center w-full h-10 border-b border-bleu'>
                  <img src={ingredientB.iconeUrl} key={ingredientB.nomIngredient} alt='pâte' className="text-bleu h-10"></img>
                  <button onClick={() => handleDelete(ingredientB.nomIngredient)}>< FaIcons.AiOutlineMinusCircle size={28}/></button>
                  </div>
                    <p className='text-sm text-center' onClick={() => handleEdit(ingredientB.nomIngredient)}>{ingredientB.nomIngredient}</p>
                    <p className='text-sm text-center' onClick={() => handleEdit(ingredientB.stock)}>{ingredientB.stock}</p>
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