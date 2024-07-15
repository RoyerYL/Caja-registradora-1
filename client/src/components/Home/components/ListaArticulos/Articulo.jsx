import React, { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import style from "./Articulo.module.css"
import { useDispatch } from 'react-redux';
import { modificar_cant, remove_art } from '../../../../redux/action';
export default function Articulo(props) {
    const page = useParams()
    const { data, id } = props
    const { cantidad, producto } = data

    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(modificar_cant({
            id,
            cant: 1,
            page
        }))
    }
    const handleClickMenos = () => {
        dispatch(modificar_cant({
            id,
            cant: -1,
            page
        }))
    }
    const onClose = () => {
        dispatch(remove_art({
            id: props.id,
            page: page.id
        }))
    }

    return (
        <tr >
            <th >{id+1}</th>
            <td className={style.containerProducto}>
                <Link to={`/detail/${producto.id}`}>
                    {producto.id}
                </Link>
            </td>
            <td className={style.containerProducto}>
                <Link to={`/detail/${producto.id}`}>
                    {producto.name}
                </Link>
            </td>

            <td id='cantidadArticulo' className={style.cantidad}>
                <div>
                    {cantidad}

                </div>
                <div className={style.buttonsAdd}>

                    <p  onClick={handleClick}>▲</p>
                    <p onClick={handleClickMenos }>▼</p>
                </div>

            </td>
            <td>$ {producto.precioVenta}</td>
            <td>$ {producto.precioVenta * cantidad}</td>
            <td >

                <p className={style.cros} onClick={onClose}>🗑️</p>

            </td>
        </tr>
    )

}