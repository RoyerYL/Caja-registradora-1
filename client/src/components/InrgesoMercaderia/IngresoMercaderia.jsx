import React, { useEffect, useState } from 'react'
import ListaArticulos from '../ListaDeArticulos/ListaArticulos'
import axios from 'axios'
import style from './IngresoMercaderia.module.css'
import { Link } from 'react-router-dom'
export default function IngresoMercaderia() {
    const [allProductos, setAllProductos] = useState([])
    const [productosSeleccionados, setSeleccionados] = useState([])
    const [allProductosAux, setAllProductosAux] = useState([])
    const [cantidad, setCantidad] = useState(1)
    const [buscador, setBuscador] = useState("")
    useEffect(() => {

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
    const filter = (e) => {
        const value = e.target.value
        setBuscador(value)

        const newList = [...allProductos].filter((prod) => {
            // prod.name.toLowerCase().includes(payload)
            return prod.id.toLowerCase().includes(value.toLowerCase()) || prod.name.toLowerCase().includes(value.toLowerCase())
        })
        setAllProductos(newList)
        setAllProductosAux(newList)

    }
    const getAll = async () => {
        await axios(`http://localhost:3001/tienda/articulo`).then(({ data }) => {
            setAllProductos(data)
            setAllProductosAux(data)
        })
    }

    const setArticulo = (prod) => {
        const findedIndex = productosSeleccionados.findIndex((p) => p.id === prod.id);
        if (findedIndex === -1) {
            const newProd = { ...prod, stock: 1 }
            const nuevosSeleccionados = [...productosSeleccionados, newProd];
            setSeleccionados(nuevosSeleccionados)
        } else {
            const nuevosSeleccionados = [...productosSeleccionados];
            const { stock } = nuevosSeleccionados[findedIndex]
            nuevosSeleccionados[findedIndex] = { ...prod, stock: Number(stock) + 1 };
            setSeleccionados(nuevosSeleccionados);

        }
    }
    const addCantidad = (index, e,cant) => {
        const name=e.target.name
        if (name==="input") {
            const value = e.target.value
            const nuevosSeleccionados = [...productosSeleccionados];
            const { stock } = nuevosSeleccionados[index]
            nuevosSeleccionados[index] = { ...nuevosSeleccionados[index], stock: Number(value) };
            setSeleccionados(nuevosSeleccionados);
            
        }
        if (name==="button") {

            const nuevosSeleccionados = [...productosSeleccionados];
            const { stock } = nuevosSeleccionados[index]
            nuevosSeleccionados[index] = { ...nuevosSeleccionados[index], stock: Number(stock)+Number(cant) };
            setSeleccionados(nuevosSeleccionados);
        }
        // !cant?
        // productosSeleccionados[index]={...productosSeleccionados[index],stock:value}
        // :productosSeleccionados[index]={...productosSeleccionados[index],stock:value}
    }

    return (
        <div>
            <div className={style.search}>
                <input type="text" name='buscador' value={buscador} onChange={filter} />
                <button>buscar</button>
                <button onClick={getAll}>todo</button>

            </div>
            <div className={style.container}>
                <div className={style.listaArticulos}>

                    <div className='flex-1'>
                        <p onClick={order}>codigo de Barras</p>
                        <p onClick={order_1}>Nombre</p>
                        <p onClick={order_3}>Cantidad</p>
                        <p onClick={order_2}>precio</p>
                    </div>
                    {
                        allProductos.map((prod, index) => (
                            <div className={style.articulos} key={prod.id} onClick={() => setArticulo(prod)}>
                                <div>
                                    <p className={style.codBarras}>{prod.id}</p>
                                    <p className={style.nombre}>{prod.name}</p>

                                </div>
                                <div className={style.containerCantPrecio}>
                                    <div className={style.cantidad}>
                                        <p>stock</p>
                                        <p>{prod.stock}</p>
                                    </div>
                                    <p className={style.precio}>${prod.precioVenta}</p>

                                </div>
                            </div>
                        ))
                    }
                </div>
                <div>
                    <div className={style.listaArticulos2}>
                        <div className={style.listArticuloEncontrados}>

                            <div className='flex-1'>
                                <p >codigo de Barras</p>
                                <p >Nombre</p>
                                <p >Cantidad</p>
                                <p >precio</p>
                            </div>
                            {
                                productosSeleccionados.map((prod, index) => (
                                    <div className={style.articulos} key={prod.id}>
                                        <Link key={prod.id} to={`/detail/${prod.id}`}>
                                            <p className={style.codBarras}>{prod.id}</p>
                                            <p className={style.nombre}>{prod.name}</p>
                                        </Link>
                                        <p className={style.precio}>${prod.precioVenta}</p>
                                        <div className='flex-1'>

                                            <input name="input" onChange={(e) => addCantidad(index, e)} value={prod.stock} />
                                            <div>
                                                <button name="button" onClick={(e) => addCantidad(index, e,1)}>+</button>
                                                <button name="button" onClick={(e) => addCantidad(index, e,-1)}>-</button>
                                            </div>
                                        </div>
                                        <p>${prod.precioVenta * prod.stock}</p>
                                    </div>
                                ))
                            }


                        </div>
                    </div>
                    <div className={style.containerTotal}>

                        <div className='flex-2'>
                            <label htmlFor="">Comentarios</label>
                            <textarea name="comentarios" id="" cols="30" rows="10"></textarea>

                        </div>
                        <div className={style.total}>

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

            </div>
            <div>

            </div>

        </div>
    )
}