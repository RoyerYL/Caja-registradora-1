import React, { useEffect, useState } from 'react';
import ListaArticulosEncontrados from '../Home/components/ListaArticulos/ListaArticulosEncontrados';
import axios from 'axios';
import style from "./ListaArticulos.module.css"
import { Link } from 'react-router-dom';

export default function ListaArticulos(props) {
    const [allProductos, setAllProductos] = useState([])
    const currentUrl = window.location.href;

    // Hacer algo con la URL

    useEffect(() => {
        axios(`http://localhost:3001/tienda/articulo`).then(({ data }) => {
            setAllProductos(data)
        })
    }, [])
    return (
        <div className={style.listaArticulos}>
            <div className={style.listArticuloEncontrados}>


                {allProductos.map((prod, index) => (
                    <Link key={prod.id} to={`/detail/${prod.id}`}>
                    <div className={style.articulos} key={prod.id}>
                        <p className={style.codBarras}>{prod.id}</p>

                        <p className={style.nombre}>
                            {prod.name}
                        </p>
                        <p className={style.precio}>${prod.precioVenta}

                        </p>

                    </div>

                    </Link>
                ))}



            </div>
        </div>
    )

}