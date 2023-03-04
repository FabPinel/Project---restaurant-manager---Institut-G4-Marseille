/* eslint-disable no-unused-vars */
/* eslint-disable no-sequences */
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import * as FaIcons from 'react-icons/rx';
import { columnData, serviceMidi, serviceSoir} from '../data/Calendrier';
import { Switch } from '@headlessui/react'
 
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
  setSalarie((prev) => ({...prev, [e.target.name]: e.target.value})); 
}

const handleClick2 = async () => {

  try {
    const addS = await axios.post("http://localhost:5000/ajout-salaries", salarie)
      console.log("Les données ont été ajoutées dans la base de données:", addS.data  );
      navigate(0);
    }
    catch(error) {
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

 // Ajoutez des variables d'état pour stocker les valeurs de vos entrées de formulaire
 const [selectedCellId, setSelectedCellId] = useState(null);
 const [data1, setData1] = useState((serviceMidi));
 const [data2, setData2] = useState((serviceSoir));
 const [selectedEmployee, setSelectedEmployee] = useState("");
 const [isImportant, setIsImportant] = useState(false);
 const [employeData, setEmployeData] = useState([]);
 const [formData, setFormData] = useState(null);
 const [selectedCellData, setSelectedCellData] = useState(null);
 

// Mettez à jour les variables d'état lorsque l'utilisateur sélectionne une option dans le menu déroulant ou coche/décoche la case à cocher
const handleEmployeeSelect = (event) => {
  setSelectedEmployee(event.target.value);
}

const handleIsImportantChange = (event) => {
  setIsImportant(event.target.checked);
}

 const handleCellClick = (id) => {
  setSelectedCellId(id);

  const cellData1 = data1.find((item) => item.id === id);
  const cellData2 = data2.find((item) => item.id === id);
  setSelectedCellData({ id, data1: cellData1, data2: cellData2 });
  setFormData({ employee: cellData1.employe, isImportant: cellData1.isImportant });
};


const salariesAvecNomComplet = salaries.map(salarie => {
  return {
    ...salarie,
    nomComplet: `${salarie.prenomSalarie} ${salarie.nomSalarie}`
  };
});

const handleFormSubmit = (e, id) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const employees = salaries.map((salarie) => {
    const employeeId = salarie.id;
    const isImportant = formData.get(`isImportant-${employeeId}`) === "on";
    const employeeName = formData.get(`employee-${employeeId}`);
    const employee = salariesAvecNomComplet.find((salarie) => salarie.nomSalarie === employeeName)?.nomComplet;
    return { id: employeeId, employee, isImportant };
      
  });

  console.log(employees);

  const cell = employees.find((item) => item.id === id);

  const updatedData1 = data1.map((item) =>
    item.id === selectedCellId ? { ...item, employees } : item
  );
  const updatedData2 = data2.map((item) =>
    item.id === selectedCellId ? { ...item, employees } : item
  );

  setData1(updatedData1);
  setData2(updatedData2);
  setSelectedCellId(null);

  

  setSelectedEmployee("");
  setIsImportant(false);
  setSelectedCellId(null);
  setEmployeData(employees);
  setSelectedCellData(null);
}


const handleFormCancel = () => {
  setSelectedCellData(null);
};


return (
  <React.Fragment>
    
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
{/* formulaire events calendrier */}
      
        <table className="w-10/12 text-right table-fixed">
          <thead>
            <tr className="bg-white">
              <th className="w-32 border border-gray-300" key={columnData.columns['column-1'].id}>{columnData.columns['column-1'].title}</th>
              <th className="w-32 border border-gray-300 text-center" key={columnData.columns['column-2'].id}>{columnData.columns['column-2'].title}</th>
              <th className="w-32 border border-gray-300 text-center" key={columnData.columns['column-3'].id}>{columnData.columns['column-3'].title}</th>
              <th className="w-32 border border-gray-300 text-center" key={columnData.columns['column-4'].id}>{columnData.columns['column-4'].title}</th>
              <th className="w-32 border border-gray-300 text-center" key={columnData.columns['column-5'].id}>{columnData.columns['column-5'].title}</th>
              <th className="w-32 border border-gray-300 text-center" key={columnData.columns['column-6'].id}>{columnData.columns['column-6'].title}</th>
              <th className="w-32 border border-gray-300 text-center" key={columnData.columns['column-7'].id}>{columnData.columns['column-7'].title}</th>
              <th className="w-32 border border-gray-300 text-center" key={columnData.columns['column-8'].id}>{columnData.columns['column-8'].title}</th>
            </tr>
          </thead>
          <tbody>


          <tr className='bg-white h-56'>
            <td className="border-y border-r border-gray-300 font-bold py-2 text-center">Service du midi</td>
              <th key={data1.id} className="border border-gray-300 py-2" onClick={() => handleCellClick(data1.id)}>
              {selectedCellData && selectedCellData.id === data1.id && (
                <div>
                  <p>{selectedEmployee}</p>
                  <p>{selectedCellData.id}</p>
                </div>
              )}
              </th>
              <th key={data1.id} className="border border-gray-300 py-2" onClick={() => handleCellClick(data1.id)}>
                {selectedCellData && selectedCellData.id === data1.id && (
                <div>
                  <p>{selectedEmployee}</p>
                  <p>{selectedCellData.id}</p>
                </div>
              )}</th>
              <th key={data1.id} className="border border-gray-300 py-2" onClick={() => handleCellClick(data1.id)}>
              {selectedCellData && selectedCellData.id === data1.id && (
                <div>
                  <p>{selectedEmployee}</p>
                  <p>{selectedCellData.id}</p>
                </div>
              )}
              </th>
              <th key={data1.id} className="border border-gray-300 py-2" onClick={() => handleCellClick(data1.id)}>
              {selectedCellData && selectedCellData.id === data1.id && (
                <div>
                  <p>{selectedEmployee}</p>
                  <p>{selectedCellData.id}</p>
                </div>
              )}
              </th>
              <th key={data1.id} className="border border-gray-300 py-2" onClick={() => handleCellClick(data1.id)}>
              {selectedCellData && selectedCellData.id === data1.id && (
                <div>
                  <p>{selectedEmployee}</p>
                  <p>{selectedCellData.id}</p>
                </div>
              )}
              </th>
              <th key={data1.id} className="border border-gray-300 py-2" onClick={() => handleCellClick(data1.id)}>
              {selectedCellData && selectedCellData.id === data1.id && (
                <div>
                  <p>{selectedEmployee}</p>
                  <p>{selectedCellData.id}</p>
                </div>
              )}
              </th>
              <th key={data1.id} className="border border-gray-300 py-2" onClick={() => handleCellClick(data1.id)}>
              {selectedCellData && selectedCellData.id === data1.id && (
                <div>
                  <p>{selectedEmployee}</p>
                  <p>{selectedCellData.id}</p>
                </div>
              )}
              </th>
          </tr>

<tr className='bg-white h-56'>
  <td className="border-y border-r border-gray-300 font-bold py-2 text-center">Service du midi</td>
  {data2.map((item) => {
    const employees = employeData || []; // récupération des données du tableau employees
    return (
      <td key={item.id} className="border border-gray-300 py-2" onClick={() => handleCellClick(item.id)}>
        {employees.map((employee) => {
          return (
            <div key={employee.id} className={`${employee.isImportant ? "bg-red-300" : "bg-lime-200"}`}>
              <p className='text-center font-medium'>{employee.employee}</p>
            </div>
          );
        })}
      </td>
    );
  })}
</tr>

</tbody>
</table>

      {
      selectedCellData && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <form
            className="bg-white p-4 rounded-lg shadow-lg"
            onSubmit={handleFormSubmit}
          >
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Salarié
              </label>
              
                {
                  salaries.map((selectSalarie)=>(
                    <>
                    <select id={`employee-${selectSalarie.id}`}
                    name={`employee-${selectSalarie.id}`} autoComplete="name" onChange={handleEmployeeSelect}
                      className="mt-1 block w-full h-8 rounded-md border border-gray-300 focus:outline-none focus:border-bleu focus:ring-1 focus:ring-bleu shadow-sm sm:text-md"
                    >
                      <option key={selectSalarie.id} value={selectSalarie.nomSalarie}>{selectSalarie.nomSalarie}</option>
                      </select>
                  <input
                    type="checkbox"
                    id={`isImportant-${selectSalarie.id}`}
                    name={`isImportant-${selectSalarie.id}`}
                    className="form-checkbox"
                    onChange={handleIsImportantChange}
                  />
                  
                  </>
                  ))
                }
                
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="rounded-md border border-gray-300 bg-rouge1 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gris focus:outline-none"
                onClick={handleFormCancel}
              >
                Annuler
              </button>
              <button type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-bleu py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gris focus:outline-none">
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      )};
      


    <div className='w-2/12 bg-white ml-4 rounded-xl shadow-sm'>
      <div className='flex border-b justify-between'>
        <p className='text-lg text-center'>Liste des salariés</p>
        <button className='w-8 h-8 bg-bleu hover:bg-gris text-white font-bold rounded-full duration-500' onClick={handleClick}>+</button>
      </div>
      
        { 
          salaries.map((salari)=>(
            <div className='border border-gris rounded-lg mt-4 mx-2 shadow-sm shadow-rouge1'>
              <button className='bg bg-rouge1 text-white rounded-lg ml-1' onClick={() => handleDelete(salari.id)}><FaIcons.RxCross2/></button>
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
</React.Fragment>
);
};

export default Planning;