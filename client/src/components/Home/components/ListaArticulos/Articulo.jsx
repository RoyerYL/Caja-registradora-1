import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import style from "./Articulo.module.css"
export default function Articulo(props) {
    const { productos, id } = props
    const { cantidad, producto } = productos
    const { data } = producto
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

            <td className={style.cantidad}>
                <div>
                    {cantidad}

                </div>
                <div>

                    <button type="button" className="btn btn-success" onClick={() => { console.log(); }}>+</button>
                    <button type="button" className="btn btn-danger" onClick={() => { console.log(); }}>-</button>
                </div>

            </td>
            <td>$ {data.precioVenta}</td>
            <td>$ {data.precioVenta * cantidad}</td>
            <td >
                <Link to={`/detail/${data.id}`}>

                    <button type="button" className="btn btn-danger" onClick={() => { console.log(); }}>🗑</button>

                </Link>
            </td>
        </tr>
    )

}