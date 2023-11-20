import React, { useState } from 'react';
import style from './ListaArticulos.module.css'
import Articulo from './Articulo';
import { useDispatch, useSelector } from 'react-redux';
import { remove_fav } from '../../../../redux/action';

export default function ListaArticulos(props) {
    const productos=useSelector((state)=>state.listProductos);

    const dispatch=useDispatch()

   const onClose=(id)=>{
    dispatch(remove_fav(id))
   }

    return (
        <div className={style.listArticulo}>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Código de barras</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Subtotal</th>
                        <th scope="col">-</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((prod,id) => (
                        <Articulo key={id} id={id}  productos={prod} onClose={onClose}/>
                    ))}
                </tbody>

            </table>
        </div>



    )
}