import React from 'react'
import { useState } from 'react'



function Plat() {
  const [data, setData] = useState([
    {
      id: 1,
      day: 'Lundi',
      midi: '',
      soir: '',
    },
    {
      id: 2,
      day: 'Mardi',
      midi: '',
      soir: '',
    },
    {
      id: 3,
      day: 'Mercredi',
      midi: '',
      soir: '',
    },
    {
      id: 4,
      day: 'Jeudi',
      midi: '',
      soir: '',
    },
    {
      id: 5,
      day: 'Vendredi',
      midi: '',
      soir: '',
    },
    {
      id: 6,
      day: 'Samedi',
      midi: '',
      soir: '',
    },
    {
      id: 7,
      day: 'Dimanche',
      midi: '',
      soir: '',
    },
  ]);

  const handleCellClick = (id, time) => {
    const newData = [...data];
    const cell = newData.find((cell) => cell.id === id);
    const input = prompt('Entrez une valeur :');
    if (input) {
      cell[time] = input;
      setData(newData);
    }
  };

  return (
    <React.Fragment>
        <section>
        <table>
      <thead>
        <tr>
          <th></th>
          <th>Lundi</th>
          <th>Mardi</th>
          <th>Mercredi</th>
          <th>Jeudi</th>
          <th>Vendredi</th>
          <th>Samedi</th>
          <th>Dimanche</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Service midi</td>
          {data.map((cell) => (
            <td key={cell.id} onClick={() => handleCellClick(cell.id, 'midi')}>
              {cell.midi}
            </td>
          ))}
        </tr>
        <tr>
          <td>Service soir</td>
          {data.map((cell) => (
            <td key={cell.id} onClick={() => handleCellClick(cell.id, 'soir')}>
              {cell.soir}
            </td>
          ))}
        </tr>
      </tbody>
    </table>

        </section>
    </React.Fragment>
  )
}

export default Plat