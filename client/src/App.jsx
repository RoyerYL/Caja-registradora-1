import React ,{useState,useEffect} from 'react';
import Navbar from './components/Navbar/Navbar';
import AltaArticulo from './components/AltaArticulo/AltaArticulo';
import Venta from './components/Home/Venta';
import Provedor from './components/Window/Provedor';
import Ventana from './components/Window/Ventana';

import './index.css';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Detail from './components/Home/components/Detail/detail';
import ListaArticulos from './components/ListaDeArticulos/ListaArticulos';
import Login from './components/Login/Login';
import Cliente from './components/Window/Cliente/Cliente';


function App() {
   const navigate = useNavigate();
   /************ SEGURIDAD ************/

   const [access,setAccess] = useState(false)

 

   // useEffect(() => {
   //       !access && navigate("/");
   //    }, [access]);



   return (
      <div className="App">
         <Navbar />
         <Routes>
            <Route path='/' element={
               <Login />
            } />
            <Route path='/ventana/:id' element={
               <Venta />
            } />
            <Route path='/listaArticulos' element={
               <ListaArticulos />
            } />
            <Route path='/altaArticulo' element={
               <AltaArticulo />
            } />
            <Route path='/ventana' element={
               <Ventana />
            } />
            <Route path='/provedor' element={
               <Provedor />
            } />
            {/* <Route path='/categoria' element={
               // <Ventana />
            } /> */}
            <Route path='/cliente' element={
               <Cliente />
            } />
            <Route path='/detail/:id' element={
               <Detail />
            } />

         </Routes>
      </div>
   );

}

export default App;
