import React from 'react'
import { Routes, Route } from "react-router-dom";
import Categories from '../pages/Dashboard';
import Salle from '../pages/Salle';
import Reservation from '../pages/Reservation';
import Stock from '../pages/Stock';
import Menu from '../pages/Menu';
import Plat from '../pages/Plat';
import Planning from '../pages/Planning';
import Fournisseur from '../pages/Fournisseur';


const RoutePage = () => {
  return (
    <React.Fragment>
      
      <section>
          <Routes>
          <Route path='/' element={<Categories/>}/>
          <Route path='/Salle' element={<Salle/>}/>
          <Route path='/Reservation' element={<Reservation/>}/>
          <Route path='/Stock' element={<Stock/>}/>
          <Route path='/Menu' element={<Menu/>}/>
          <Route path='/Plat' element={<Plat/>}/>
          <Route path='/Planning' element={<Planning/>}/>
          <Route path='/Fournisseur' element={<Fournisseur/>}/>
        </Routes>   
      </section>
      
    </React.Fragment>
  )
}

export default RoutePage