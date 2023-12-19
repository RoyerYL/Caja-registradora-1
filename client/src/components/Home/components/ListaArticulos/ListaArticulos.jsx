import React, { useEffect,useState } from 'react';
import style from './ListaArticulos.module.css'
import Articulo from './Articulo';
import List from './List';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function ListaArticulos(props) {

    const{productos}=props
    

    return (
        <div className={style.listArticulo}>
            <table>
                <thead>
                    <tr>
                        <th >#</th>
                        <th >Código de barras</th>
                        <th >Nombre</th>
                        <th >Cantidad</th>
                        <th >Precio</th>
                        <th>Subtotal</th>
                        <th >-</th>
                    </tr>
                </thead>
                <tbody>
                     <List  producto={productos}/>
                </tbody>

            </table>
        </div>



    )
}