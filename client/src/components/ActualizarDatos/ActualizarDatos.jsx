import React, { useEffect, useState } from 'react';
import style from "./ActualizarDatos.module.css"
import ListaArticulosEncontrados from '../Home/components/ListaArticulos/ListaArticulosEncontrados';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { articuloActualizar, filterArtLike, getAll, order_articulos } from '../../redux/action';


export default function ActualizarDatos() {
    const dispatch = useDispatch()
    const articulos = useSelector((state) => state.productoLike)
    const articulosActualizar = useSelector((state) => state.articulosActualizar)
    const [categoria, setCategoria] = useState([])
    const [provedor, setProvedor] = useState([])

    const [articulosSeleccionados, setArticulosSeleccionados] = useState([]);
    const [seleccionando, setSeleccionando] = useState(false);

    const [buscador, setBuscador] = useState("")
    const [order, setOrder] = useState("A")
    const [form, setForm] = useState({
        name: "",
        id: "",
        stock: 0,
        stockMin: 0,
        costoPeso: Number.parseFloat(0).toFixed(2),
        costoPesoPorcentaje: 0,
        costoDolar: Number.parseFloat(0).toFixed(2),
        costoDolarPorcentaje: 0,
        precioVenta: Number.parseFloat(0).toFixed(2),
        precioVentaPorcentaje: 0,
        ganancia: 0,
        precioVenta_2: Number.parseFloat(0).toFixed(2),
        ganancia_2: 0,
        descripcion: "",
        iva: 21,
        img: "",
        activo: true,
        CategoriaId: 0,
        ProvedorId: 1,
        precioEnDolar: false

    })

    const handleToggleSeleccion = (articulo) => {
        // Verificar si el artículo ya está seleccionado
        const estaSeleccionado = articulosSeleccionados.includes(articulo);
        if (estaSeleccionado) {
            // Si está seleccionado, quitarlo de la lista
            setArticulosSeleccionados(articulosSeleccionados.filter(item => item.id !== articulo.id));
        } else {
            // Si no está seleccionado, agregarlo a la lista
            setArticulosSeleccionados([...articulosSeleccionados, articulo]);
        }
    };

    useEffect(() => {
        axios("http://localhost:3001/tienda/provedor").then(({ data }) => {

            setProvedor(data)
        }
        )
        axios("http://localhost:3001/tienda/categoria").then(({ data }) => {

            setCategoria(data)
        })
        dispatch(getAll())
    }, [])

    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        if (property === "precioEnDolar") {
            setForm({ ...form, [property]: !form.precioEnDolar });//cambio Form..
            return ""
        }
        if (property === "activo") {
            setForm({ ...form, [property]: !form.activo });//cambio Form..
            return ""
        }
        setForm({ ...form, [property]: value });//cambio Form..
    }
    const addArticulosActualizar = () => {
        dispatch(articuloActualizar(articulosSeleccionados))
        setArticulosSeleccionados([])
    }
    const addArticulosAll = () => {
        dispatch(articuloActualizar(articulos))
    }

    const actualizar = async (e) => {

        const nombre = e.target.name
        switch (nombre) {
            case "precioVenta":
                for (const prod of articulosActualizar) {
                    await axios.post("http://localhost:3001/tienda/actualizprecio", {
                        articuloId: prod.id,
                        nuevoPrecio: form.precioVenta

                    });
                }

                break;
            case "precioVentaPorcentaje":
                console.log("hola");
                for (const prod of articulosActualizar) {
                    await axios.post("http://localhost:3001/tienda/actualizprecioPorcentaje", {
                        id: prod.id,
                        porcentajeAumento: form.precioVentaPorcentaje

                    });
                    console.log(form.precioVentaPorcentaje);
                    console.log("---------------------");
                }

                break;
            case "categoria":
                for (const prod of articulosActualizar) {
                    await axios.post("http://localhost:3001/tienda/actualizarCategoria", {
                        articuloId: prod.id,
                        categoriaId: form.CategoriaId

                    });
                }

                break;
            case "provedor":
                for (const prod of articulosActualizar) {
                    await axios.post("http://localhost:3001/tienda/actualizarProvedor", {
                        articuloId: prod.id,
                        provedorId: form.ProvedorId

                    });
                }

                break;
            case "costoDolar":
                for (const prod of articulosActualizar) {
                    await axios.post("http://localhost:3001/tienda/actualizarCostoDolar", {
                        articuloId: prod.id,
                        costoDolar: form.costoDolar

                    });
                }

                break;
            case "costoDolarPorcentaje":
                for (const prod of articulosActualizar) {
                    await axios.post("http://localhost:3001/tienda/actualizarPorcentajeDolar", {
                        id: prod.id,
                        porcentajeAumento: form.costoDolarPorcentaje

                    });
                }

                break;
            case "costoPeso":
                for (const prod of articulosActualizar) {
                    await axios.post("http://localhost:3001/tienda/actualizarCostoPeso", {
                        articuloId: prod.id,
                        costoPeso: form.costoPeso

                    });
                }

                break;
            case "costoPesoPorcentaje":
                for (const prod of articulosActualizar) {
                    await axios.post("http://localhost:3001/tienda/actualizarPorcentajePeso", {
                        id: prod.id,
                        porcentajeAumento: form.costoPesoPorcentaje

                    });
                }

                break;
            case "ganancia":
                for (const prod of articulosActualizar) {
                    await axios.post("http://localhost:3001/tienda/actualizarGanancia", {
                        articuloId: prod.id,
                        ganancia: form.ganancia

                    });
                }

                break;
            case "iva":
                for (const prod of articulosActualizar) {
                    await axios.post("http://localhost:3001/tienda/actualizarIva", {
                        articuloId: prod.id,
                        iva: form.iva

                    });
                }

                break;
            case "stock":
                for (const prod of articulosActualizar) {
                    await axios.post("http://localhost:3001/tienda/actualizarStock", {
                        articuloId: prod.id,
                        stock: form.stock

                    });
                }

                break;
            case "stockMin":
                for (const prod of articulosActualizar) {
                    await axios.post("http://localhost:3001/tienda/actualizarStockMin", {
                        articuloId: prod.id,
                        stockMin: form.stockMin

                    });
                }

                break;
            case "activo":
                for (const prod of articulosActualizar) {
                    await axios.post("http://localhost:3001/tienda/actualizarActivo", {
                        articuloId: prod.id,
                        activo: form.activo

                    });
                }

                break;
            case "precioEnDolar":
                for (const prod of articulosActualizar) {
                    await axios.post("http://localhost:3001/tienda/actualizarPrecioEnDolares", {
                        articuloId: prod.id,
                        precioEnDolar: form.precioEnDolar

                    });
                }

                break;

            default:
                break;
        }


    }
    const search = (e) => {
        const value = e.target.value
        setBuscador(value)
        dispatch(filterArtLike(e.target.value))
    }
    const ordenar = () => {
        order ? dispatch(order_articulos("A")) : dispatch(order_articulos("D"))
        setOrder(!order)
    }
    return (<>
        <div className={style.ActualizarDatos}>
            <div className={style.containerListArticulos}>
                <div>
                    <input type="text" name='buscador' placeholder='nombre' value={buscador} onChange={search} />
                    <button onClick={ordenar}>{order ? "asc" : "desc"}</button>
                </div>

                <p>Lista de Artículos</p>
                <ul>
                    {articulos.map((articulo) => (
                        <li
                            className={`${style.elemento} ${articulosSeleccionados.includes(articulo) ? style.seleccionado : ''}`}
                            key={articulo.id}
                            onClick={() => handleToggleSeleccion(articulo)}
                        >
                            <p className={style.articulo}>{articulo.id} - {articulo.name}</p>
                            {/* Otros elementos de texto y formatos según tus necesidades */}
                        </li>
                    ))}
                </ul>
            </div>
            <div className='flex-2'>
                <button onClick={addArticulosActualizar}>{`->`}</button>
                <button onClick={addArticulosAll}>{`Todos`}</button>
            </div>
            <div className={style.containerListArticulos}>

                <p>Lista de Artículos</p>
                <ul>
                    {articulosActualizar.map((articulo) => (
                        <li
                            className={`${style.elemento} ${articulosSeleccionados.includes(articulo.id) ? style.seleccionado : ''}`}
                            key={articulo.id}

                        >
                            <p className={style.articulo}>{articulo.id} - {articulo.name}</p>
                            {/* Otros elementos de texto y formatos según tus necesidades */}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={style.containerForm}>
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
                    <button name='provedor' onClick={actualizar}>actualizar</button>
                </div>
                <div>
                    <span>Categoria:</span>
                    <select value={form.CategoriaId} name='CategoriaId' onChange={handleChange}>
                        {
                            categoria.map((cate) => {
                                return (
                                    <option key={cate.id} value={cate.id}>{cate.nameCategoria}</option>
                                )
                            })
                        }
                    </select>
                    <button name='categoria' onClick={actualizar}>actualizar</button>
                </div>
                <div>
                    <span>stock</span>
                    <input type="text" name='stock' value={form.stock} onChange={handleChange} />
                    <button name='stock' onClick={actualizar}>actualizar</button>
                </div>
                <div>
                    <span>stock min</span>
                    <input type="text" name='stockMin' value={form.stockMin} onChange={handleChange} />
                    <button name='stockMin' onClick={actualizar}>actualizar</button>
                </div>
                <div>
                    <span>Cost peso</span>
                    <input type="text" name='costoPeso' value={form.costoPeso} onChange={handleChange} />
                    <button name='costoPeso' onClick={actualizar}>actualizar</button>

                    <span>Cost peso %</span>
                    <input type="text" name='costoPesoPorcentaje' value={form.costoPesoPorcentaje} onChange={handleChange} />
                    <button name='costoPesoPorcentaje' onClick={actualizar}>actualizar</button>
                </div>
                <div>
                    <span>Costo dolar</span>
                    <input type="text" name='costoDolar' value={form.costoDolar} onChange={handleChange} />
                    <button name='costoDolar' onClick={actualizar}>actualizar</button>

                    <span>Costo dolar %</span>
                    <input type="text" name='costoDolarPorcentaje' value={form.costoDolarPorcentaje} onChange={handleChange} />
                    <button name='costoDolarPorcentaje' onClick={actualizar}>actualizar</button>
                </div>
                <div>
                    <span>Precio venta</span>
                    <input type="text" name='precioVenta' value={form.precioVenta} onChange={handleChange} />
                    <button name='precioVenta' onClick={actualizar}>actualizar</button>

                    <span>Precio venta %</span>
                    <input type="text" name='precioVentaPorcentaje' value={form.precioVentaPorcentaje} onChange={handleChange} />
                    <button name='precioVentaPorcentaje' onClick={actualizar}>actualizar</button>
                </div>
                <div>
                    <span>iva</span>
                    <input type="text" name='iva' value={form.iva} onChange={handleChange} />
                    <button name='iva' onClick={actualizar}>actualizar</button>
                </div>
                <div>
                    <span>ganancia</span>
                    <input type="text" name='ganancia' value={form.ganancia} onChange={handleChange} />
                    <button name='ganancia' onClick={actualizar}>actualizar</button>
                </div>
                <div>
                    <span>activo</span>
                    <input type="checkbox" name='activo' checked={form.activo} onChange={handleChange} />
                    <button name='activo' onClick={actualizar}>actualizar</button>
                </div>
                <div className='flex-1'>
                    <div>
                        <input type="checkbox" name='precioEnDolar' checked={form.precioEnDolar} onChange={handleChange} />
                        <label>
                            Dolar
                        </label>
                    </div>
                    <div>
                        <input type="checkbox" name="precioEnDolar" checked={!form.precioEnDolar} onChange={handleChange} />
                        <label>
                            Peso
                        </label>
                    </div>
                    <button name='precioEnDolar' onClick={actualizar}>actualizar</button>
                </div>

            </div>

            <div>

            </div>

        </div>
    </>
    )
}