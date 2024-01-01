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



function App() {
   const navigate = useLocation();
   /************ SEGURIDAD ************/

   const [access,setAccess] = useState(false)

 

   // useEffect(() => {
   //       !access && navigate("/");
   //    }, [access]);

   const [allProductos, setAllProductos] = useState([])
   const [allProductosAux, setAllProductosAux] = useState([])
   useEffect(() => {
      axios(`http://localhost:3001/tienda/articulo`).then(({ data }) => {
          setAllProductos(data)
          setAllProductosAux(data)
      })
  }, [])


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
               <ListaArticulos allProductos={allProductos} allProductosAux={allProductosAux} setAllProductos={setAllProductos}/>
            } />
            <Route path='/altaArticulo' element={
               <AltaArticulo />
            } />
            <Route path='/comprobantes' element={
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

         </Routes>
      </div>
   );

}

export default App;
