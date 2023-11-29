import React, { useState } from 'react';

export default function ArticuloEncontrados(props) {
    const { productos } = props
    return (
        <tr>
            <td>{productos.id}</td>
            <td>{productos.name}</td>
            <td>{productos.precioVenta}</td>
            
        </tr>
    )

}