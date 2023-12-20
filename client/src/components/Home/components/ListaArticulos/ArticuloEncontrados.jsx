import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { add_art, resetArtLike } from '../../../../redux/action';
import { Link, useLocation, useParams } from 'react-router-dom';

export default function ArticuloEncontrados(props) {
    const { productos } = props
    const { pathname } = useLocation();
    const dispatch = useDispatch()
    const { id } = useParams()


    const handleClick = () => {
        dispatch(resetArtLike())
        dispatch(add_art({
            cantidad: document.getElementById('cantidad').value,
            codBarras: productos.id,
            page: id
        }))

    }

    return (
        <tr>
            <td>{productos.id}</td>

            <td>
                <Link to={`/detail/${productos.id}`}>
                    {productos.name}
                </Link>
            </td>
            <td>${productos.precioVenta}
                {
                    pathname !== '/listaArticulos' &&
                    <button type="button" className="btn btn-success" onClick={handleClick}>Agregar</button>
                }
            </td>

        </tr>
    )

}