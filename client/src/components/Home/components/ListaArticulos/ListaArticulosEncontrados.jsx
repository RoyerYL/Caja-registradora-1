import React, { useEffect, useState } from 'react';
import style from './ListaArticulos.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ArticuloEncontrados from './ArticuloEncontrados';

export default function ListaArticulosEncontrados(props) {

    const { productos } = props



 

    return (
        <div className={style.listArticulo}>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Código de barras</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                    </tr>
                </thead>
                <tbody>

                    {productos.map((prod, index) => {
                        return (
                            <ArticuloEncontrados key={index} productos={prod} onClose={props.onClose} />
                        )
                    }
                    )}
                </tbody>

            </table>
        </div>



    )
}