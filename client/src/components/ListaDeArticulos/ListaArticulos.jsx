import React, { useEffect, useState } from 'react';
import ListaArticulosEncontrados from '../Home/components/ListaArticulos/ListaArticulosEncontrados';
import axios from 'axios';
import style from "./ListaArticulos.module.css"
import { Link } from 'react-router-dom';

export default function ListaArticulos(props) {
    const [allProductos, setAllProductos] = useState([])
    const [allProductosAux, setAllProductosAux] = useState([])
    const currentUrl = window.location.href;
    const [loading, setLoading] = useState(false);
    // Hacer algo con la URL

    useEffect(() => {
        setLoading(true);
        axios(`http://localhost:3001/tienda/articulo`).then(({ data }) => {
            setAllProductos(data)
            setAllProductosAux(data)
        })
            .finally(() => setLoading(false));
    }, [])

    const order = () => {
        const newList = [...allProductosAux].sort((a, b) => a.id.toString().localeCompare(b.id.toString()))
        setAllProductos(newList)
    }
    const order_1 = () => {
        setLoading(true);
        const newList = [...allProductosAux].sort((a, b) => a.name.toString().localeCompare(b.name.toString()));
        setAllProductos(newList);
        setLoading(false);
    };
    const order_2 = () => {
        const newList = [...allProductosAux].sort((a, b) => a.precioVenta - b.precioVenta)
        setAllProductos(newList)
    }
    const order_3 = () => {
        const newList = [...allProductosAux].sort((a, b) => a.stock - b.stock)
        setAllProductos(newList)
    }

    return (
        <div className={style.listaArticulos}>
            <div className={style.listArticuloEncontrados}>

                <div className='flex-1'>
                    <p onClick={order}>codigo de Barras</p>
                    <p onClick={order_1}>Nombre</p>
                    <p onClick={order_3}>Cantidad</p>
                    <p onClick={order_2}>precio</p>
                </div>
                {loading ? (
                    // Show loading image while sorting
                    <img src="./img.webp" alt="Loading" />
                ) : (
                    allProductos.map((prod, index) => (
                        <Link key={prod.id} to={`/detail/${prod.id}`}>
                            <div className={style.articulos} key={prod.id}>
                                <p className={style.codBarras}>{prod.id}</p>
                                <p className={style.nombre}>{prod.name}</p>
                                <p>{prod.stock}</p>
                                <p className={style.precio}>${prod.precioVenta}</p>
                            </div>
                        </Link>
                    ))
                )}


            </div>
        </div>
    )

}