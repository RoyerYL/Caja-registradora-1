import React, { useState } from 'react';
import style from './Home.module.css'
import Articulo from './components/Articulo/Articulo';
import ListaArticulos from './components/ListaArticulos/ListaArticulos';
import Cliente from './components/Cliente/Cliente';
import Costo from './Costo';
import Condicion from './Condicion';
import { useSelector } from 'react-redux';
export default function Navbar() {
    const [collapse, setCollapse] = useState("collapse")
    const productos = useSelector((state) => { state.listProductos })
    
    const handleClick = () => {
        collapse === "collapse" ? setCollapse("collapse.show") : setCollapse("collapse")
    }

    return (
        <div className={style.Home}>

            <div className={style.registrarCompra}>
                <div className={style.addArticulo}>
                    <h2>Ingrese un articulo</h2>
                    <Articulo />
                    <div className={style.cliente}>
                        <h2>Cliente</h2>
                        <Cliente />
                    </div>

                </div>
                <div className={style.ListArticulo}>

                    <ListaArticulos articulos={productos}/>
                    <div className={style.info}>
                        <Condicion />
                        <Costo />

                    </div>


                </div>
            </div>
            <div >

            </div>

        </div>
    )
}