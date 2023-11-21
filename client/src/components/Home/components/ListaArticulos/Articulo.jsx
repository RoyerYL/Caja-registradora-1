import React, { useState } from 'react';

export default function Articulo(props) {
    const { productos, onClose,id } = props
    return (
        <tr>
            <th scope="row">{id}</th>
            <td>{productos.codBarras}</td>
            <td>@twitter</td>
            <td>{productos.cantidad}</td>
            <td>@twitter</td>
            <td>@twitter</td>
            <td >
                <button type="button" className="btn btn-success" onClick={() => { onClose(productos.id) }}>➕ Cantidad</button>
            </td>
        </tr>
    )

}