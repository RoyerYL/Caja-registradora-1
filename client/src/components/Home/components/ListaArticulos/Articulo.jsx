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
            cant: 1
        }))
    }
    const handleClickMenos = () => {
        dispatch(modificar_cant({
            id,
            cant: -1
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
            <th >{id}</th>
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
                <div>

                    <button  onClick={handleClick}>+</button>
                    <button onClick={handleClickMenos }>-</button>
                </div>

            </td>
            <td>$ {producto.precioVenta}</td>
            <td>$ {producto.precioVenta * cantidad}</td>
            <td >

                <button className={style.cros} onClick={onClose}>X</button>

            </td>
        </tr>
    )

}