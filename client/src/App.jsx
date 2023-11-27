import React from 'react';
import Navbar from './components/Navbar/Navbar';
import AltaArticulo from './components/AltaArticulo/AltaArticulo';
import Home from './components/Home/Home';
import Ventana from './components/Window/Ventana';

import './index.css';
import { Route, Routes } from 'react-router-dom';

function App() {
   return (
      <div className="App">
         <Navbar />

         <Routes>
            <Route path='/home/:id' element={
               <Home />
            } />
            <Route path='/altaArticulo' element={
               <AltaArticulo />
            } />
            <Route path='/ventana' element={
               <Ventana />
            } />

         </Routes>
      </div>
   );

}

export default App;
