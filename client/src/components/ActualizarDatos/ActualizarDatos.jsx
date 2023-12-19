import React, { useEffect, useState } from 'react';
import style from "./ActualizarDatos.module.css"
import ListaArticulosEncontrados from '../Home/components/ListaArticulos/ListaArticulosEncontrados';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { articuloActualizar } from '../../redux/action';


export default function ActualizarDatos() {
    const dispatch = useDispatch()
    const articulos = useSelector((state) => state.productoLike)
    const articulosActualizar = useSelector((state) => state.articulosActualizar)
    const [categoria, setCategoria] = useState([])
    const [provedor, setProvedor] = useState([])
    const [articulosSeleccionados, setArticulosSeleccionados] = useState([]);
    const [form, setForm] = useState({
        name: "",
        id: "",
        stock: 0,
        stockMin: 0,
        costoPeso: Number.parseFloat(0).toFixed(2),
        costoDolar: Number.parseFloat(0).toFixed(2),
        precioVenta: Number.parseFloat(0).toFixed(2),
        ganancia: 0,
        precioVenta_2: Number.parseFloat(0).toFixed(2),
        ganancia_2: 0,
        descripcion: "",
        iva: 21,
        img: "",
        activo: true,
        CategoriaId: 0,
        ProvedorId: 1

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

    }, [])

    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setForm({ ...form, [property]: value });//cambio Form..
    }
    const addArticulosActualizar = () => {
        dispatch(articuloActualizar(articulosSeleccionados))
    }

    const actualizar = async(e) => {

        const nombre=e.target.name
        switch (nombre) {
            case "precioVenta":
                for (const prod of articulosActualizar) {
                    await axios.post("http://localhost:3001/tienda/actualizprecio", {
                        articuloId: prod.id,
                        nuevoPrecio:form.precioVenta
                        
                    });
                }
                
                break;
            case "categoria":
                for (const prod of articulosActualizar) {
                    await axios.post("http://localhost:3001/tienda/actualizarCategoria", {
                        articuloId: prod.id,
                        categoriaId:form.CategoriaId
                        
                    });
                }
                
                break;
            
            default:
                break;
        }


    }

    return (<>
        <div className={style.ActualizarDatos}>
            <div className={style.containerListArticulos}>

                <h2>Lista de Artículos</h2>
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
            <div>
                <button onClick={addArticulosActualizar}>{`->`}</button>
            </div>
            <div className={style.containerListArticulos}>

                <h2>Lista de Artículos</h2>
                <ul>
                    {articulosActualizar.map((articulo) => (
                        <li
                            className={`${style.elemento} ${articulosSeleccionados.includes(articulo.id) ? style.seleccionado : ''}`}
                            key={articulo.id}
                            onClick={() => handleToggleSeleccion(articulo.id)}
                        >
                            <p className={style.articulo}>{articulo.id} - {articulo.name}</p>
                            {/* Otros elementos de texto y formatos según tus necesidades */}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={style.containerForm}>
                <div>

                    <select value={form.ProvedorId} name='ProvedorId' onChange={handleChange}>
                        {
                            provedor.map((prov) => {
                                return (
                                    <option key={prov.id} value={prov.id}>{prov.razonSocial}</option>
                                )
                            })
                        }
                    </select>
                    <button>actualizar</button>
                </div>
                <div>

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
                    <input type="text" />
                    <button>actualizar</button>
                </div>
                <div>
                    <span>stock min</span>
                    <input type="text" />
                    <button>actualizar</button>
                </div>
                <div>
                    <span>Cost peso</span>
                    <input type="text" />
                    <button>actualizar</button>
                    <span>Cost peso %</span>
                    <input type="text" />
                    <button>actualizar</button>
                </div>
                <div>
                    <span>Costo dolar</span>
                    <input type="text" />
                    <button>actualizar</button>
                    <span>Costo dolar%</span>
                    <input type="text" />
                    <button>actualizar</button>
                </div>
                <div>
                    <span>Precio venta</span>
                    <input type="text" name='precioVenta' value={form.precioVenta} onChange={handleChange} />
                    <button name='precioVenta' onClick={actualizar}>actualizar</button>
                </div>
                <div>
                    <span>iva</span>
                    <input type="text" />
                    <button>actualizar</button>
                </div>
                <div>
                    <span>ganancia</span>
                    <input type="text" />
                    <button>actualizar</button>
                </div>
                <div>
                    <span>activo</span>
                    <input type="checkbox" />
                    <button>actualizar</button>
                </div>

            </div>

            <div>

            </div>

        </div>
    </>
    )
}