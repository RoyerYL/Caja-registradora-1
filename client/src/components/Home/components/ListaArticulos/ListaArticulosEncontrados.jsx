import React, { useEffect, useState } from 'react';
import style from './ListaArticulos.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import ArticuloEncontrados from './ArticuloEncontrados';
import { add_art, order_articulos, resetArtLike } from '../../../../redux/action';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
export default function ListaArticulosEncontrados(props) {

    const { productos, onClose } = props
    const dispatch = useDispatch()
    const { pathname } = useLocation();
    const { id } = useParams()
    const handleSort = (input) => {
        dispatch(order_articulos(input))
    }
    const handleClick = (id_) => {
        dispatch(resetArtLike())
        dispatch(add_art({
            cantidad: document.getElementById('cantidad').value,
            codBarras: id_,
            page: id
        }))

    }
    const resetEncontrados = () => {
        console.log("cerrar");
        dispatch(resetArtLike())
    }


    return (
        <div className={style.listArticuloEncontrados}>
            <div className={style.container}>

                <button className={style.cerrarButton} onClick={resetEncontrados}>X</button>
                <div className={style.containerLista}>

                    {productos.map((prod, index) => (
                        <div onClick={() => { handleClick(prod.id) }} className={style.articulos} key={prod.id}>
                            <p className={style.codBarras}>{prod.id}</p>

                            <p className={style.nombre}>
                                {prod.name}
                            </p>
                            <p className={style.precio}>${prod.precioVenta}

                            </p>

                        </div>

                    ))}

                </div>
            </div>
        </div>
    )
}