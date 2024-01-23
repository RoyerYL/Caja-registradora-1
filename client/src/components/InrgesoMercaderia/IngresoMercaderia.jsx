import React, { useEffect, useState } from 'react'
import ListaArticulos from '../ListaDeArticulos/ListaArticulos'
import axios from 'axios'
import style from './IngresoMercaderia.module.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function IngresoMercaderia() {
    const [provedor, setProvedor] = useState([])
    const [vendedor, setVendedor] = useState([])
    const [listMercaderia, setListMercaderia] = useState([])
    const [allProductos, setAllProductos] = useState([])
    const [productosSeleccionados, setSeleccionados] = useState([])
    const [allProductosAux, setAllProductosAux] = useState([])
    const [cantidad, setCantidad] = useState(1)
    const [buscador, setBuscador] = useState("")
    const Vendedor = useSelector((state) => state.Vendedor)


    const [form, setForm] = useState({
        comentarios: "",
        ProvedorId: 1,
        subTotal: 0,
        descuento: 0,
        iva: 0,
        percepciones: 0,
        total: 0

    })
    useEffect(() => {
        axios("http://localhost:3001/tienda/provedor").then(({ data }) => {
            console.log(data);
            setProvedor(data)
        }
        )
        axios("http://localhost:3001/tienda/vendedor").then(({ data }) => {

            setVendedor(data)
        }
        )
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
    const addCantidad = (index, e, cant) => {
        const name = e.target.name
        if (name === "input") {
            const value = e.target.value
            const nuevosSeleccionados = [...productosSeleccionados];
            const { stock } = nuevosSeleccionados[index]
            nuevosSeleccionados[index] = { ...nuevosSeleccionados[index], stock: Number(value) };
            setSeleccionados(nuevosSeleccionados);

        }
        if (name === "button") {

            const nuevosSeleccionados = [...productosSeleccionados];
            const { stock } = nuevosSeleccionados[index]
            nuevosSeleccionados[index] = { ...nuevosSeleccionados[index], stock: Number(stock) + Number(cant) };
            setSeleccionados(nuevosSeleccionados);
        }
        // !cant?
        // productosSeleccionados[index]={...productosSeleccionados[index],stock:value}
        // :productosSeleccionados[index]={...productosSeleccionados[index],stock:value}
    }
    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        if (property === "activo") {
            setForm({ ...form, [property]: !form.activo });//cambio Form..
            return ""
        }
        setForm({ ...form, [property]: value });//cambio Form..
    }
    const handleClick = async () => {

        const listArticulo = []
        for (const prod of productosSeleccionados) {
            const { id, name, stock, precioVenta } = prod
            const art = { id, stock, name, precioVenta }
            axios.post("http://localhost:3001/tienda/aumentarStock", {
                id,
                stock,
            })
            listArticulo.push(art)
        }
        await axios.post("http://localhost:3001/tienda/mercaderia",
            {
                articulos: { listArticulo },
                vendedorId: Vendedor,
                provedorId: form.ProvedorId,
                comentarios: form.comentarios,
                subTotal: form.subTotal,
                descuento: form.descuento,
                iva: form.iva,
                percepciones: form.percepciones,
                total: form.total
            });
        setSeleccionados([])

    }
    const getHistorial =async () => {
        axios("http://localhost:3001/tienda/mercaderia").then(({data})=>{
            setListMercaderia(data)
        })
    }
    return (
        <div>
            <div className={style.search}>
                <input type="text" name='buscador' value={buscador} onChange={filter} />
                <button>buscar</button>
                <button onClick={getAll}>todo</button>
                <button onClick={getHistorial}>historial</button>

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
                                                <button name="button" onClick={(e) => addCantidad(index, e, 1)}>+</button>
                                                <button name="button" onClick={(e) => addCantidad(index, e, -1)}>-</button>
                                            </div>
                                        </div>
                                        <p>${prod.precioVenta * prod.stock}</p>
                                    </div>
                                ))
                            }


                        </div>
                    </div>
                    <div className={style.containerTotal}>
                        <div>
                            <div>

                                <span>Provedor:</span>
                                <select value={form.ProvedorId} name='ProvedorId' onChange={handleChange}>
                                    {
                                        provedor.map((prov) => {
                                            return (
                                                <option key={prov.id} value={prov.id}>{prov.razonSocial}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div>

                                <span>Vendedor:</span>
                                <select value={Vendedor} name='vendedor' onChange={handleChange}>
                                    {
                                        vendedor.map((vendedor) => {
                                            return (
                                                <option key={vendedor.id} value={vendedor.id}>{vendedor.vendedor}</option>
                                            )
                                        })
                                    }
                                </select>

                            </div>
                        </div>
                        <div className='flex-2'>
                            <label htmlFor="">Comentarios</label>
                            <textarea name="comentarios" id="" cols="30" rows="10" onChange={handleChange} value={form.comentarios}></textarea>

                        </div>
                        <div className={style.total}>

                            <div>
                                <label htmlFor="">Sub total</label>
                                <input type="text" name='subTotal' value={form.subTotal} onChange={handleChange} />

                            </div>
                            <div>
                                <label htmlFor="">Descuento</label>
                                <input type="text" name='descuento' value={form.descuento} onChange={handleChange} />

                            </div>
                            <div>
                                <label htmlFor="">Total iva</label>
                                <input type="text" name='iva' value={form.iva} onChange={handleChange} />

                            </div>
                            <div>
                                <label htmlFor="">Percepciones</label>
                                <input type="text" name='percepciones' value={form.percepciones} onChange={handleChange} />

                            </div>
                            <div>
                                <label htmlFor="">Total</label>
                                <input type="text" name='total' value={form.total} onChange={handleChange} />

                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <button onClick={handleClick}>Ingresar</button>
            </div>
            {
                listMercaderia.length>0 && listMercaderia.map((mercaderia)=>{
                    console.log(mercaderia);
                    return <div key={mercaderia.id}>
                        {mercaderia.id}
                        </div>
                })
            }
        </div>
    )
}