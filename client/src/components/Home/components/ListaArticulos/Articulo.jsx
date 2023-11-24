import React, { useState } from 'react';

export default function Articulo(props) {
    const { productos, onClose,id } = props
    const {cantidad,producto,subTotal}=productos
    const {data}=producto
    // const subtotal=cantidad*Number(data.costoPeso)
    return (
        <tr>
            <th scope="row">{id}</th>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{cantidad}</td>
            <td>$ {data.precioVenta}</td>
            <td>$ {subTotal}</td>
            <td >
                <button type="button" className="btn btn-success" onClick={() => {console.log(data); }}>➕ Cantidad</button>
            </td>
        </tr>
    )

}