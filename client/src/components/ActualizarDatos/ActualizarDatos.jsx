import React, { useEffect, useState } from 'react';
import style from "./ActualizarDatos.module.css"
import ListaArticulosEncontrados from '../Home/components/ListaArticulos/ListaArticulosEncontrados';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { articuloActualizar, filterArtLike, getAll, order_articulos } from '../../redux/action';
import buildQueryParams from '../../Utils/QueryFilterPath';

export default function ActualizarDatos() {
    const dispatch = useDispatch();

    // const articulos = useSelector((state) => state.productoLike);
    const [articulos, setArticulo] = useState([]);
    const articulosActualizar = useSelector((state) => state.articulosActualizar);

    const [categoria, setCategoria] = useState([]);
    const [provedor, setProvedor] = useState([]);
    const [articulosSeleccionados, setArticulosSeleccionados] = useState([]);
    const [buscador, setBuscador] = useState("");
    const [order, setOrder] = useState("A");
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
    });
    const [filters, setFilter] = useState({
        name: "",
        id: "",
        page: 1,
        pageSize: 50,
        orderBy: 'id',
        orderDirection: ''
    })

    const [pageNumber, setpageNumber] = useState(0)

    useEffect(() => {
        const fetchArticulos = async () => {
            const { data: articulo } = await axios("/tienda/articulo"+ buildQueryParams(filters))
            setArticulo(articulo.items)
        }

        fetchArticulos();

        const fetchData = async () => {
            const { data: provedores } = await axios("/tienda/provedor");
            setProvedor(provedores);

            const { data: categorias } = await axios("/tienda/categoria");
            setCategoria(categorias);
        };

        fetchData();
        dispatch(getAll());
    }, []);

    const handleToggleSeleccion = (articulo) => {
        const estaSeleccionado = articulosSeleccionados.some(item => item.id === articulo.id);
        if (estaSeleccionado) {
            setArticulosSeleccionados(articulosSeleccionados.filter(item => item.id !== articulo.id));
        } else {
            setArticulosSeleccionados([...articulosSeleccionados, articulo]);
        }
    };

    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        if (property === "precioEnDolar" || property === "activo") {
            setForm({ ...form, [property]: event.target.checked });
            return;
        }

        setForm({ ...form, [property]: value });
    };

    const addArticulosActualizar = () => {
        dispatch(articuloActualizar(articulosSeleccionados));
        setArticulosSeleccionados([]);
    };

    const addArticulosAll = () => {
        dispatch(articuloActualizar(articulos));
    };

    const actualizar = async (e) => {
        const nombre = e.target.name;

        for (const prod of articulosActualizar) {
            let payload;
            switch (nombre) {
                case "precioVenta":
                    payload = { articuloId: prod.id, nuevoPrecio: form.precioVenta };
                    await axios.post("/tienda/articulo/actualizprecio", payload);
                    break;
                case "precioVentaPorcentaje":
                    payload = { id: prod.id, porcentajeAumento: form.precioVentaPorcentaje };
                    await axios.post("/tienda/articulo/actualizprecioPorcentaje", payload);
                    break;
                case "categoria":
                    payload = { articuloId: prod.id, categoriaId: form.CategoriaId };
                    await axios.post("/tienda/articulo/actualizarCategoria", payload);
                    break;
                case "provedor":
                    payload = { articuloId: prod.id, provedorId: form.ProvedorId };
                    await axios.post("/tienda/articulo/actualizarProvedor", payload);
                    break;
                case "costoDolar":
                    payload = { articuloId: prod.id, costoDolar: form.costoDolar };
                    await axios.post("/tienda/articulo/actualizarCostoDolar", payload);
                    break;
                case "costoDolarPorcentaje":
                    payload = { id: prod.id, porcentajeAumento: form.costoDolarPorcentaje };
                    await axios.post("/tienda/articulo/actualizarPorcentajeDolar", payload);
                    break;
                case "costoPeso":
                    payload = { articuloId: prod.id, costoPeso: form.costoPeso };
                    await axios.post("/tienda/articulo/actualizarCostoPeso", payload);
                    break;
                case "costoPesoPorcentaje":
                    payload = { id: prod.id, porcentajeAumento: form.costoPesoPorcentaje };
                    await axios.post("/tienda/articulo/actualizarPorcentajePeso", payload);
                    break;
                case "ganancia":
                    payload = { articuloId: prod.id, ganancia: form.ganancia };
                    await axios.post("/tienda/articulo/actualizarGanancia", payload);
                    break;
                case "iva":
                    payload = { articuloId: prod.id, iva: form.iva };
                    await axios.post("/tienda/articulo/actualizarIva", payload);
                    break;
                case "stock":
                    payload = { articuloId: prod.id, stock: form.stock };
                    await axios.post("/tienda/articulo/actualizarStock", payload);
                    break;
                case "stockMin":
                    payload = { articuloId: prod.id, stockMin: form.stockMin };
                    await axios.post("/tienda/articulo/actualizarStockMin", payload);
                    break;
                case "activo":
                    payload = { articuloId: prod.id, activo: form.activo };
                    await axios.post("/tienda/articulo/actualizarActivo", payload);
                    break;
                case "precioEnDolar":
                    payload = { articuloId: prod.id, precioEnDolar: form.precioEnDolar };
                    await axios.post("/tienda/articulo/actualizarPrecioEnDolares", payload);
                    break;
                default:
                    break;
            }
        }
    };

    const search = (e) => {
        const value = e.target.value;
        setBuscador(value);
        dispatch(filterArtLike(value));
    };

    const ordenar = () => {
        dispatch(order_articulos(order ? "A" : "D"));
        setOrder(!order);
    };

    return (
        <div className={style.ActualizarDatos}>

            <div>
                <div className={style.containerListArticulos}>
                    <div>
                        <input type="text" name="buscador" placeholder="nombre" value={buscador} onChange={search} />
                        <button onClick={ordenar}>{order ? "asc" : "desc"}</button>
                        <select name="categoria" onChange={handleChange}>
                            {categoria.map((c) => (
                                <option key={c.id} value={c.id}>{c.nameCategoria}</option>
                            ))}
                        </select>

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
                            </li>
                        ))}
                    </ul>
                </div>
                <p onClick={()=>{setFilter({...filters,page:filters.page-1})}}>anterior</p>
                <p onClick={()=>{setFilter({...filters,page:filters.page+1})}}>siguiente</p>
            </div>
            <div>
                <button onClick={addArticulosActualizar}>{`->`}</button>
                <button onClick={addArticulosAll}>{`Todos`}</button>
            </div>
            <div className={style.containerListArticulos}>
                <p>Artículos seleccionados</p>
                <ul>
                    {articulosActualizar.map((articulo) => (
                        <li
                            className={`${style.elemento} ${articulosSeleccionados.includes(articulo) ? style.seleccionado : ''}`}
                            key={articulo.id}
                        >
                            <p className={style.articulo}>{articulo.id} - {articulo.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={style.containerForm}>
                <div>
                    <span>Precio Venta</span>
                    <input type="text" name="precioVenta" onChange={handleChange} />
                    <button name="precioVenta" onClick={actualizar}>Actualizar Precio</button>
                </div>
                <div>
                    <span>Precio Venta %</span>
                    <input type="text" name="precioVentaPorcentaje" onChange={handleChange} />
                    <button name="precioVentaPorcentaje" onClick={actualizar}>Actualizar</button>
                </div>
                <div>
                    <span>Costo Dolar</span>
                    <input type="text" name="costoDolar" onChange={handleChange} />
                    <button name="costoDolar" onClick={actualizar}>Actualizar Costo Dolar</button>
                </div>
                <div>
                    <span>Costo Dolar %</span>
                    <input type="text" name="costoDolarPorcentaje" onChange={handleChange} />
                    <button name="costoDolarPorcentaje" onClick={actualizar}>Actualizar Costo Dolar</button>
                </div>
                <div>
                    <span>Costo Peso</span>
                    <input type="text" name="costoPeso" onChange={handleChange} />
                    <button name="costoPeso" onClick={actualizar}>Actualizar Costo Peso</button>
                </div>
                <div>
                    <span>Costo Peso %</span>
                    <input type="text" name="costoPesoPorcentaje" onChange={handleChange} />
                    <button name="costoPesoPorcentaje" onClick={actualizar}>Actualizar Costo Peso</button>
                </div>
                <div>
                    <span>Stock</span>
                    <input type="text" name="stock" onChange={handleChange} />
                    <button name="stock" onClick={actualizar}>Actualizar Stock</button>
                </div>
                <div>
                    <span>Stock Min</span>
                    <input type="text" name="stockMin" onChange={handleChange} />
                    <button name="stockMin" onClick={actualizar}>Actualizar Stock Min</button>
                </div>
                <div>
                    <span>Ganancia</span>
                    <input type="text" name="ganancia" onChange={handleChange} />
                    <button name="ganancia" onClick={actualizar}>Actualizar Ganancia</button>
                </div>
                <div>
                    <span>Categoria</span>
                    <select name="CategoriaId" onChange={handleChange}>
                        {categoria.map((c) => (
                            <option key={c.id} value={c.id}>{c.nameCategoria}</option>
                        ))}
                    </select>
                    <button name="categoria" onClick={actualizar}>Actualizar Categoria</button>
                </div>
                <div>
                    <span>Provedor</span>
                    <select name="ProvedorId" onChange={handleChange}>
                        {provedor.map((p) => (
                            <option key={p.id} value={p.id}>{p.nameProvedor}</option>
                        ))}
                    </select>
                    <button name="provedor" onClick={actualizar}>Actualizar Provedor</button>
                </div>
                <div>
                    <span>Iva</span>
                    <input type="text" name="iva" onChange={handleChange} />
                    <button name="iva" onClick={actualizar}>Actualizar Iva</button>
                </div>
                <div>
                    <span>Activo</span>
                    <input type="checkbox" name="activo" checked={form.activo} onChange={handleChange} />
                    <button name="activo" onClick={actualizar}>Actualizar Activo</button>
                </div>
                <div>
                    <span>Precio en Dolar</span>
                    <input type="checkbox" name="precioEnDolar" checked={form.precioEnDolar} onChange={handleChange} />
                    <button name="precioEnDolar" onClick={actualizar}>Actualizar Precio en Dolar</button>
                </div>
            </div>
        </div>
    );
}
