import React, { useEffect, useState } from 'react'
import ListaArticulos from '../ListaDeArticulos/ListaArticulos'
import axios from 'axios'
import style from './IngresoMercaderia.module.css'
import { Link } from 'react-router-dom'
export default function IngresoMercaderia() {
    const [allProductos, setAllProductos] = useState([])
    const [allProductosAux, setAllProductosAux] = useState([])
    useEffect(() => {
        axios(`http://localhost:3001/tienda/articulo`).then(({ data }) => {
            setAllProductos(data)
            setAllProductosAux(data)
        })
    }, [])
    const order = () => {
        const newList = [...allProductosAux].sort((a, b) => a.id.toString().localeCompare(b.id.toString()))
        setAllProductos(newList)
    }
    const order_1 = () => {
        const newList = [...allProductosAux].sort((a, b) => a.name.toString().localeCompare(b.name.toString()));
        setAllProductos(newList);
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
        <div>
            <div>
                <div>
                    <input type="text" />
                    <button>buscar</button>
                </div>
                <div>
                    <div className={style.listaArticulos}>
                        <div className={style.listArticuloEncontrados}>

                            <div className='flex-1'>
                                <p onClick={order}>codigo de Barras</p>
                                <p onClick={order_1}>Nombre</p>
                                <p onClick={order_3}>Cantidad</p>
                                <p onClick={order_2}>precio</p>
                                <button>todo</button>
                            </div>
                            {
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
                            }


                        </div>
                    </div>
                </div>

            </div>
            <div>

            </div>

        </div>
    )
}