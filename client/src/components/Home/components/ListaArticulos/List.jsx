import React, { useEffect, useState } from 'react';
import style from './ListaArticulos.module.css'
import Articulo from './Articulo';
import { useDispatch, useSelector } from 'react-redux';
import { get, remove_fav } from '../../../../redux/action';
import { useParams } from 'react-router-dom';

export default function ListaArticulos(props) {



    return (
        <>
            {props.producto.map((prod, id) =>

                <Articulo key={id} id={id} productos={prod} onClose={props.onClose} />

            )}

        </>



    )
}