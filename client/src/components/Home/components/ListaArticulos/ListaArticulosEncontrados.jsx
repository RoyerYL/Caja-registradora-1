import React, { useEffect, useState } from 'react';
import style from './ListaArticulos.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import ArticuloEncontrados from './ArticuloEncontrados';
import { add_art, order_articulos, resetArtLike } from '../../../../redux/action';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
export default function ListaArticulosEncontrados(props) {

    const { productos, onClose } = props
    const dispatch = useDispatch()
    const { pathname } = useLocation();
    const { id } = useParams()
    const handleSort = (input) => {
        dispatch(order_articulos(input))
    }
    const handleClick = (id_) => {
        dispatch(resetArtLike())
        dispatch(add_art({
            cantidad: document.getElementById('cantidad').value,
            codBarras: id_,
            page: id
        }))

    }

    return (
        <div className={style.listArticuloEncontrados}>
          
                    <AutoSizer>
                        {({ height, width }) => (
                            <>
                                {productos.map((prod, index) => (
                                    <div key={prod.id}>
                                        <p>{prod.id}</p>

                                        <p>
                                            <Link to={`/detail/${prod.id}`}>
                                                {prod.name}
                                            </Link>
                                        </p>
                                        <p>${prod.precioVenta}
                                            {
                                                pathname !== '/listaArticulos' &&
                                                <button type="button" className="btn btn-success" onClick={()=>{handleClick(prod.id)}}>Agregar</button>
                                            }
                                        </p>

                                    </div>

                                ))}
                            </>
                        )}
                    </AutoSizer>
                    
        </div>



    )
}