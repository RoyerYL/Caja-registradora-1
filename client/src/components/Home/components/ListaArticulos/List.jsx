import React, { useEffect, useState } from 'react';
import style from './ListaArticulos.module.css'
import Articulo from './Articulo';
 

export default function ListaArticulos(props) {



    return (
        <>
            {props.producto.map((prod, id) =>

                <Articulo key={id} id={id} productos={prod} onClose={props.onClose} />

            )}

        </>



    )
}