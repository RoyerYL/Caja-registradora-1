import React, { useEffect, useState } from 'react'
import ListaArticulos from '../ListaDeArticulos/ListaArticulos'
import axios from 'axios'
import style from './IngresoMercaderia.module.css'
import { Link } from 'react-router-dom'
export default function IngresoMercaderia() {
    const [allProductos, setAllProductos] = useState([])
    const [productosSeleccionados, setSeleccionados] = useState([])
    const [allProductosAux, setAllProductosAux] = useState([])
    const [buscador,setBuscador]=useState("")
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
    const filter=(e)=>{
        const value=e.target.value
        setBuscador(value)

        
        const newList=[...allProductos].filter((prod)=>
        {
            return prod.id===value || prod.name===value
        })
        console.log(newList);
    }

    return (
        <div>
            <div>
                <input type="text" name='buscador' value={buscador} onChange={filter} />
                <button>buscar</button>
            </div>
            <div className='flex-1'>
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
                                        <div className={style.articulos} key={prod.id}>
                                            <p className={style.codBarras}>{prod.id}</p>
                                            <p className={style.nombre}>{prod.name}</p>
                                            <p>{prod.stock}</p>
                                            <p className={style.precio}>${prod.precioVenta}</p>
                                        </div>
                                ))
                            }


                        </div>
                    </div>
                </div>
                <div className='flex-2'>
                    <button>{`->`}</button>
                    <button>Todo</button>
                </div>
                <div>
                    <div className={style.listaArticulos}>
                        <div className={style.listArticuloEncontrados}>

                            <div className='flex-1'>
                                <p >codigo de Barras</p>
                                <p >Nombre</p>
                                <p >Cantidad</p>
                                <p >precio</p>
                            </div>
                            {
                                productosSeleccionados.map((prod, index) => (
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
                    <div>

                        <div>
                            <label htmlFor="">Comentarios</label>
                            <input type="text" />

                        </div>
                        <div>
                            <label htmlFor="">Sub total</label>
                            <input type="text" />

                        </div>
                        <div>
                            <label htmlFor="">Descuento</label>
                            <input type="text" />

                        </div>
                        <div>
                            <label htmlFor="">Total iva</label>
                            <input type="text" />

                        </div>
                        <div>
                            <label htmlFor="">Percepciones</label>
                            <input type="text" />

                        </div>
                        <div>
                            <label htmlFor="">Total</label>
                            <input type="text" />

                        </div>
                    </div>
                </div>

            </div>
            <div>

            </div>

        </div>
    )
}