import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Pie } from "react-chartjs-2";
ChartJs.register(
  Tooltip, Title, ArcElement, Legend
);


const Categories = () => {   //   il faut que ce soit une const et pas une fonction pour avoir des requetes sql

  const [plats, setPlats] = useState([]);

  const [data, setData] = useState({
    datasets: [{
      data: [],
      backgroundColor: [],
    },
    ],
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: []
  });

  useEffect(() => {
    const fetchAllPlats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/categorie-ca");
        setPlats(res.data);
        const label = [];
        const data = [];
        for (var i of res.data) {
          label.push(i.categorie);
          data.push(i.CA)
        }
        setData({
          datasets: [{
            data: data,
            backgroundColor: ['#2b2d42', '#5C6378', '#8d99ae', '#BDC6D1', '#EDF2F4', '#EE8B98', '#ef233c', '#D90429'],
          },
          ],
          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: label,
        })
      } catch (err) {
        console.log(err);
      }

    };
    fetchAllPlats();
  }, [])

  console.log(plats);

  return (
    <React.Fragment>
      <section>

        <div className='flex justify-between mt-10 h-96'>
          <div className='w-4/6'>
            < Pie data={data} />
            {/* < Bar data={dataD} options={options} />  */}

          </div>
          <div className='w-2/6 text-right mr-10 border border-gris rounded-xl'>
            <p className='text-bleu text-center text-2xl'>MENU DU JOUR</p>
          </div>
        </div>



        <div className='w-full h-80 border-double border-8 border-rouge1 mt-10'>test div planning</div>

      </section>
    </React.Fragment>
  );
}

export default Categories