import React, { useEffect, useState } from 'react';
import style from './ListaArticulos.module.css'
import Articulo from './Articulo';
import List from './List';
import { useDispatch, useSelector } from 'react-redux';
import { remove_fav } from '../../../../redux/action';
import { useParams } from 'react-router-dom';
import ArticuloEncontrados from './ArticuloEncontrados';

export default function ListaArticulosEncontrados(props) {

    const { productos } = props

    const listProductos = useSelector((state) => state.listProductos);
    const { id } = useParams()
    const dispatch = useDispatch()



    const onClose = (id) => {
        dispatch(remove_fav(id))
    }

    return (
        <div className={style.listArticulo}>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Código de barras</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                    </tr>
                </thead>
                <tbody>

                    {productos.map((prod, index) => {
                        return (
                            <ArticuloEncontrados key={index} productos={prod} onClose={props.onClose} />
                        )
                    }
                    )}
                </tbody>

            </table>
        </div>



    )
}