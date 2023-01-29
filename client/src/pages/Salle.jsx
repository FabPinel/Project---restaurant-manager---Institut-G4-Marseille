import React from 'react';
import { useState } from "react";

function Salle() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <React.Fragment>
        <section>
              <div className="flex flex-col relative bg-blanc break-all w-full">
          <div className="flex">
            <button
              className={toggleState === 1 ? "tabs p-4 text-center w-28 cursor-pointer box-content relative bg-blanc border-t-4 border-rouge1 duration-500" : "p-4 text-center text-white w-28 cursor-pointer box-content relative bg-bleu border-t-4 border-blanc hover:bg-gris duration-500"}
              onClick={() => toggleTab(1)}
            >
              Salle 1
            </button>
            <button
              className={toggleState === 2 ? "tabs p-4 text-center w-28 cursor-pointer box-content relative bg-blanc border-t-4 border-rouge1 duration-500" : "p-4 text-center text-white w-28 cursor-pointer box-content relative bg-bleu border-t-4 border-blanc hover:bg-gris duration-500"}
              onClick={() => toggleTab(2)}
            >
              Salle 2
            </button>
            <button
              className={toggleState === 3 ? "tabs p-4 text-center w-28 cursor-pointer box-content relative bg-blanc border-t-4 border-rouge1 duration-500" : "p-4 text-center text-white w-28 cursor-pointer box-content relative bg-bleu border-t-4 border-blanc hover:bg-gris duration-500"}
              onClick={() => toggleTab(3)}
            >
              Terasse
            </button>
          </div>

          <div className="flex-grow">
            <div
              className={toggleState === 1 ? "content  block" : "bg-white p-5 w-full h-full hidden"}
            >
              <div className='w-1/6 text-right mr-10 border border-gris rounded-xl mt-20 mb-5'>
              <p className='text-bleu text-center text-2xl'>Salle 1</p>
              </div>
              <button class="bg-bleu hover:bg-gris text-white font-bold py-2 px-4 rounded duration-500 mr-4 ml-4">
                + Table
              </button>
              <button class="bg-bleu hover:bg-gris text-white font-bold py-2 px-4 rounded duration-500">
                Fusion
              </button>
              <div className='w-full text-right mr-10 mt-2 flex flex-row'>
                <div className='w-1/6 text-right mr-10 border border-gris rounded-xl mt-20 basis-1/4 md:basis-1/3'>
                <p className='text-bleu text-center text-2xl'>Réservation: 0</p>
                </div>
                <div className='w-1/6 text-right mr-10 border border-gris rounded-xl mt-20 basis-1/4 md:basis-1/3'>
                <p className='text-bleu text-center text-2xl'>Nbr Couverts: 2</p>
                </div>
                <div className='w-1/6 text-right mr-10 border border-gris rounded-xl mt-20 basis-1/4 md:basis-1/3'>
                <p className='text-bleu text-center text-2xl'>Nbr Tables: 1</p>
                </div>
              </div>
              <div className='w-1/6 text-right mr-10 border border-gris rounded-xl mt-20'>
              <p className='text-bleu text-center text-2xl'>1</p>
              </div>
              <div className='w-1/6 text-right mr-10 border border-gris rounded-xl mt-1'>
              <p className='text-bleu text-center text-2xl'>Satut: Libre</p>
              <p className='text-bleu text-center text-2xl'>Nbr de couverts: 2</p>
              </div>
            </div>

            <div
              className={toggleState === 2 ? "content  block" : "bg-white p-5 w-full h-full hidden"}
            >
              <div className='w-1/6 text-right mr-10 border border-gris rounded-xl mt-20'>
              <p className='text-bleu text-center text-2xl'>Salle 2</p>
              </div>
            </div>

            <div
              className={toggleState === 3 ? "content  block" : "bg-white p-5 w-full h-full hidden"}
            >
              <div className='w-1/6 text-right mr-10 border border-gris rounded-xl mt-20'>
              <p className='text-bleu text-center text-2xl'>Terasse</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default Salle