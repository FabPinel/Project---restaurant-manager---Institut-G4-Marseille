import React from 'react';

const Planning = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-x-scroll">
        <table className="w-10/12 text-right table-fixed mt-8">
          <thead>
            <tr className="bg-white">
              <th className="w-32 border border-gray-300"></th>
              <th className="w-32 border border-gray-300 text-center">Lundi</th>
              <th className="w-32 border border-gray-300 text-center">Mardi</th>
              <th className="w-32 border border-gray-300 text-center">Mercredi</th>
              <th className="w-32 border border-gray-300 text-center">Jeudi</th>
              <th className="w-32 border border-gray-300 text-center">Vendredi</th>
              <th className="w-32 border border-gray-300 text-center">Samedi</th>
              <th className="w-32 border border-gray-300 text-center">Dimanche</th>
            </tr>
          </thead>
          <tbody>
            <tr className='bg-white h-56'>
              <td className="border-y border-r border-gray-300 font-bold py-2 text-center">Service du midi</td>
              <td className="border border-gray-300 py-2"></td>
              <td className="border border-gray-300 py-2"></td>
              <td className="border border-gray-300 py-2"></td>
              <td className="border border-gray-300 py-2"></td>
              <td className="border border-gray-300 py-2"></td>
              <td className="border border-gray-300 py-2"></td>
              <td className="border border-gray-300 py-2"></td>
            </tr>
            <tr className='bg-white h-56'>
              <td className="border-y border-r border-gray-300 font-bold py-2 text-center">Service du soir</td>
              <td className="border border-gray-300 py-2"></td>
              <td className="border border-gray-300 py-2"></td>
              <td className="border border-gray-300 py-2"></td>
              <td className="border border-gray-300 py-2"></td>
              <td className="border border-gray-300 py-2"></td>
              <td className="border border-gray-300 py-2"></td>
              <td className="border border-gray-300 py-2"></td>
              </tr>
</tbody>
</table>
</div>
    <div></div>
</div>
);
};

export default Planning;