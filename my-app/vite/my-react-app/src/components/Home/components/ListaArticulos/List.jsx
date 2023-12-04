import React, { useEffect, useState } from 'react';
import style from './ListaArticulos.module.css'
import Articulo from './Articulo';


export default function ListaArticulos(props) {

    const { producto } = props

    return (
        <>
            {producto.map((prod, id) => {
                return (
                    <Articulo key={id} id={id} data={prod} />
                )
            }
            )}

        </>



    )
}