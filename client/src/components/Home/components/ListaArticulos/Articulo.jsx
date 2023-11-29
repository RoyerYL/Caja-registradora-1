import React, { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import style from "./Articulo.module.css"
import { useDispatch } from 'react-redux';
import { remove_art } from '../../../../redux/action';
export default function Articulo(props) {
    const page=useParams()
    const { productos, id } = props
    const { cantidad, producto } = productos
    const { data } = producto
    const dispatch =useDispatch()

    const onClose=()=>{
        dispatch(remove_art({
            id:props.id,
            page:page.id}))
    }

    return (
        <tr >
            <th scope="row">{id}</th>
            <td className={style.containerProducto}>
                <Link to={`/detail/${data.id}`}>
                    {data.id}
                </Link>
            </td>
            <td className={style.containerProducto}>
                <Link to={`/detail/${data.id}`}>
                    {data.name}
                </Link>
            </td>

            <td id='cantidadArticulo' className={style.cantidad}>
                <div>
                    {cantidad}

                </div>
                <div>

                    <button type="button" className="btn btn-success" onClick={() => { console.log(document.getElementById('cantidadArticulo')); }}>+</button>
                    <button type="button" className="btn btn-danger" onClick={() => { console.log(); }}>-</button>
                </div>

            </td>
            <td>$ {data.precioVenta}</td>
            <td>$ {data.precioVenta * cantidad}</td>
            <td >

                    <button type="button" className="btn btn-danger" onClick={onClose}>🗑</button>

            </td>
        </tr>
    )

}