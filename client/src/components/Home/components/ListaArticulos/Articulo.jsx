import React, { useState } from 'react';

export default function Articulo(props) {
    const { productos, onClose,id } = props
    const {cantidad,producto,page}=productos
    const {data}=producto
    const subtotal=Number(cantidad)*Number(data.cantidad)
    return (
        <tr>
            <th scope="row">{id}</th>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{cantidad}</td>
            <td>{data.precio}</td>
            <td>{subtotal}</td>
            <td >
                <button type="button" className="btn btn-success" onClick={() => { onClose(productos.id) }}>➕ Cantidad</button>
            </td>
        </tr>
    )

}