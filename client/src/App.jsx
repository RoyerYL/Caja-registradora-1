import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Provedor from './components/Proverdor/Provedor';
import Home from './components/Home/Home';
import Ventana from './components/Window/Ventana';

import './index.css';
import { Route, Routes } from 'react-router-dom';

function App() {
   return (
      <div className="App">
         <Navbar />

         <Routes>
            <Route path='/' element={<div>Hola</div>}/>
            <Route path='/home/:id' element={
               <Home />
            } />
            <Route path='/provedor' element={
               <Provedor />
            } />
            <Route path='/ventana' element={
               <Ventana />
            } />

         </Routes>
      </div>
   );

}

export default App;
