import React, { useEffect, useState } from 'react';
import style from './ListaArticulos.module.css'
import Articulo from './Articulo';
import { useSelector } from 'react-redux';


export default function ListaArticulos(props) {
    const productos = useSelector((state) => state.producto)
    const [prod,setProd]=useState([])
    useEffect(()=>{
        console.log("actualizado");
        setProd(productos.productos)
    },[productos])
    return (
        <>
        
            {prod && prod.map((prod, id) => {
                return (
                    <Articulo key={id} id={id} data={prod} />
                )
            }
            )}

        </>



    )
}