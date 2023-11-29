import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { add_art } from '../../../../redux/action';
import { useParams } from 'react-router-dom';

export default function ArticuloEncontrados(props) {
    const { productos } = props

    const dispatch =useDispatch()
    const {id}=useParams()


    const handleClick =()=>{
        console.log(document.getElementById('cantidad'));
        dispatch(add_art({
            cantidad:document.getElementById('cantidad').value,
            codBarras:productos.id,
            page:id
        }))

    }

    return (
        <tr>
            <td>{productos.id}</td>
            <td>{productos.name}</td>
            <td>${productos.precioVenta}
            <button type="button" className="btn btn-success" onClick={handleClick}>Agregar</button>
            </td>
            
        </tr>
    )

}