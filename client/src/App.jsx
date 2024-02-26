import React ,{useState,useEffect} from 'react';
import Navbar from './components/Navbar/Navbar';
import AltaArticulo from './components/AltaArticulo/AltaArticulo';
import Venta from './components/Home/Venta';
import Provedor from './components/Window/Provedor/Provedor';
import Comprobante from './components/Window/Comprobante/Comprobante';


import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Detail from './components/Home/components/Detail/detail';
import ListaArticulos from './components/ListaDeArticulos/ListaArticulos';
import Login from './components/Login/Login';
import Cliente from './components/Window/Cliente/Cliente';
import Categoria from './components/Window/Categoria/Categoria';
import ActualizarDatos from './components/ActualizarDatos/ActualizarDatos';
import DetailClient from './components/Window/Cliente/DetailCliente';
import Reportes from './components/Reportes/Reportes';
import Vendedor from './components/Window/Vendedor/Vendedor';
import Operaciones from './components/Window/Operaciones/Operaciones';
import IngresoMercaderia from './components/InrgesoMercaderia/IngresoMercaderia';
import axios from 'axios';
import LandingPage from './components/LandingPage/LandingPage';
import Administracion from './components/Administracion/Administracion';



function App() {
   const navigate = useNavigate();
   const {pathname}=useLocation()
   /************ SEGURIDAD ************/

   const [access,setAccess] = useState(false)

 
   const [Cotizacion, setCotizacion] = useState({
      apertura:false,
      precioInicial: 0,
      precioFinal: 0,
      cotizacionBlue: Number.parseFloat(0).toFixed(2),
      cotizacionMep: Number.parseFloat(0).toFixed(2),

  })
   useEffect(() => {
         navigate("/");
      }, []);



   return (
      <div className="App">
         {
            pathname!=="/" &&
         <Navbar Cotizacion={Cotizacion}/>
         }
         <Routes>
            
            <Route path='/' element={
               <LandingPage/>
            } />
            <Route path='/HomePage' element={
               <Login Cotizacion={Cotizacion}  setCotizacion={setCotizacion}/>
            } />
            <Route path='/ventana/:id' element={
               <Venta />
            } />
            <Route path='/listaArticulos' element={
               <ListaArticulos/>
            } />
            <Route path='/altaArticulo' element={
               <AltaArticulo />
            } />
            <Route path='/comprobantes/*' element={
               <Comprobante />
            } />
            <Route path='/operaciones/*' element={
               <Operaciones />
            } />
            <Route path='/detail/:id' element={
               <Detail />
            } />
            <Route path='/cliente/:id' element={
               <DetailClient />
            } />
            <Route path='/actualizarArticulo' element={
               <ActualizarDatos />
            } />
            <Route path='/reportes/*' element={
               <Reportes />
            } />
            <Route path='/mercaderia' element={
               <IngresoMercaderia />
            } />
            
            <Route path='/administracion' element={
               <Administracion />
            } />

         </Routes>
      </div>
   );

}

export default App;
