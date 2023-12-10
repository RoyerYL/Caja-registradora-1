import React, { useEffect, useState } from 'react';
import style from './ListaArticulos.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ArticuloEncontrados from './ArticuloEncontrados';
import { order_articulos } from '../../../../redux/action';

export default function ListaArticulosEncontrados(props) {

    const { productos } = props
    const dispatch =useDispatch()

    const handleSort=(input)=>{
        dispatch(order_articulos(input))
    }
 

    return (
        <div className={style.listArticuloEncontrados}>
            <table className="table">
                <thead>
                    <tr className={style.nomFilas}>
                        <th scope="col">Código de barras  <button type="button" onClick={()=>{handleSort("A")}} >🔀</button> </th>
                        <th scope="col">Nombre <button type="button"  onClick={()=>{handleSort("B")}}>🔀</button></th>
                        <th scope="col">Precio </th>
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