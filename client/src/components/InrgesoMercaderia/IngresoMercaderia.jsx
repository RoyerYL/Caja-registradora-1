import React, { useEffect, useState } from 'react';
import ListaArticulos from '../ListaDeArticulos/ListaArticulos';
import axios from 'axios';
import style from './IngresoMercaderia.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function IngresoMercaderia() {
    const [provedor, setProvedor] = useState([]);
    const [vendedor, setVendedor] = useState([]);
    const [listMercaderia, setListMercaderia] = useState([]);
    const [allProductos, setAllProductos] = useState([]);
    const [productosSeleccionados, setSeleccionados] = useState([]);
    const [allProductosAux, setAllProductosAux] = useState([]);
    const [cantidad, setCantidad] = useState(1);
    const [buscador, setBuscador] = useState("");
    const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
    const [totalPages, setTotalPages] = useState(1); // Estado para el total de páginas
    const Vendedor = useSelector((state) => state.Vendedor);

    const pageSize = 50; // Tamaño de página por defecto
    const maxButtons = 5; // Cantidad máxima de botones de paginación
    const [filters, setFilters] = useState({
        name: "",
        id: "",
        pageSize: 50,
        page: 1
    });

    const [form, setForm] = useState({
        comentarios: "",
        ProvedorId: 1,
        subTotal: 0,
        descuento: 0,
        iva: 0,
        percepciones: 0,
        total: 0
    });

    useEffect(() => {
        axios("http://localhost:3001/tienda/provedores").then(({ data }) => {
            setProvedor(data);
        });
        axios("http://localhost:3001/tienda/vendedor").then(({ data }) => {
            setVendedor(data);
        });
    }, []);


    const filter = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setBuscador(value);

        setFilters({
            ...filters,
            [name]: value,
            page: 1 // Reset page to 1 when filtering
        });
    };

    const getArticulos = async (page = 1) => {

        const queryString = Object.keys(filters)
            .map(key => `${key}=${encodeURIComponent(filters[key])}`)
            .join('&');

        await axios(`http://localhost:3001/tienda/articulo?${queryString}`).then(({ data }) => {
            setAllProductos(data.items);
            setAllProductosAux(data.items);
            setCurrentPage(data.currentPage);
            setTotalPages(data.totalPages);
        });
    };

    const setArticulo = (prod) => {
        const findedIndex = productosSeleccionados.findIndex((p) => p.id === prod.id);
        if (findedIndex === -1) {
            const newProd = { ...prod, stock: 1 };
            const nuevosSeleccionados = [...productosSeleccionados, newProd];
            setSeleccionados(nuevosSeleccionados);
        } else {
            const nuevosSeleccionados = [...productosSeleccionados];
            const { stock } = nuevosSeleccionados[findedIndex];
            nuevosSeleccionados[findedIndex] = { ...prod, stock: Number(stock) + 1 };
            setSeleccionados(nuevosSeleccionados);
        }
    };

    const addCantidad = (index, e, cant) => {
        const name = e.target.name;
        if (name === "input") {
            const value = e.target.value;
            const nuevosSeleccionados = [...productosSeleccionados];
            const { stock } = nuevosSeleccionados[index];
            nuevosSeleccionados[index] = { ...nuevosSeleccionados[index], stock: Number(value) };
            setSeleccionados(nuevosSeleccionados);
        }
        if (name === "button") {
            const nuevosSeleccionados = [...productosSeleccionados];
            const { stock } = nuevosSeleccionados[index];
            nuevosSeleccionados[index] = { ...nuevosSeleccionados[index], stock: Number(stock) + Number(cant) };
            setSeleccionados(nuevosSeleccionados);
        }
    };

    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        if (property === "activo") {
            setForm({ ...form, [property]: !form.activo });
            return "";
        }
        setForm({ ...form, [property]: value });
    };

    const handleClick = async () => {
        const fecha = new Date();
        const listArticulo = [];
        for (const prod of productosSeleccionados) {
            const { id, name, stock, precioVenta } = prod;
            const art = { id, stock, name, precioVenta };
            axios.post("http://localhost:3001/tienda/aumentarStock", { id, stock });
            listArticulo.push(art);
        }
        await axios.post("http://localhost:3001/tienda/mercaderia", {
            articulos: { listArticulo, fecha },
            vendedorId: Vendedor,
            provedorId: form.ProvedorId,
            comentarios: form.comentarios,
            subTotal: form.subTotal,
            descuento: form.descuento,
            iva: form.iva,
            percepciones: form.percepciones,
            total: form.total,
        });
        setSeleccionados([]);
    };

    const getHistorial = async () => {
        axios("http://localhost:3001/tienda/mercaderia").then(({ data }) => {
            setListMercaderia(data);
        });
    };

    const handlePageChange = (page) => {
        setFilters({
            ...filters,
            page
        });
    };

    useEffect(() => {
        getArticulos(currentPage);
    }, [filters, currentPage]);

    // Función para renderizar botones de paginación
    const renderPaginationButtons = () => {
        const pages = [];

        const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        const endPage = Math.min(totalPages, startPage + maxButtons - 1);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={i === currentPage ? style.button : style.buttonDes}
                >
                    {i}
                </button>
            );
        }

        return pages;
    };
    const getAll = () => {
        setFilters(
            {
                ...filters,
                name: "",
                id: "",
                page: 1
            }
        )

    }
    return (
        <div className={style.container}>
            <div className={style.leftContainer}>
                <div className={style.searchContainer}>
                    <div>
                        <span>Nombre: </span>
                        <input type="text" name='name' value={filters.name} onChange={filter} placeholder="Buscar por nombre" />
                    </div>
                    <div>
                        <span>id: </span>
                        <input type="text" name='id' value={filters.id} onChange={filter} placeholder="Buscar por ID" />
                    </div>
                    <button className={style.button} onClick={() => getAll(1)}>Todo</button>
                    <button className={style.button} onClick={getHistorial}>Historial</button>
                </div>
                <div className={style.productList}>
                    {allProductos.map((prod, index) => (
                        <div className={style.productItem} key={prod.id} >
                            <div>

                                <p>{prod.name}</p>
                                <p>Stock: {prod.stock}</p>
                                <p>Precio: ${prod.precioVenta}</p>
                            </div>
                            <button onClick={() => setArticulo(prod)}>Añadir</button>
                        </div>
                    ))}
                </div>
                <div className={style.pagination}>
                    {renderPaginationButtons()}
                </div>
            </div>
            <div className={style.rightContainer}>
                <div className={style.selectedList}>
                    <div className={style.header}>
                        <p >Producto</p>
                        <p>Cantidad</p>
                        <p>Precio</p>
                    </div>
                    {productosSeleccionados.map((prod, index) => (
                        <div className={style.selectedItem} key={prod.id}>
                            <p className={style.headerProducto}>{prod.name}</p>
                            <div className={style.quantityControls}>
                                <input type="number" value={prod.stock} onChange={(e) => addCantidad(index, e)} name='input' />
                            </div>
                            <p>${prod.precioVenta}</p>
                        </div>
                    ))}
                </div>
                <div className={style.form}>
                    <form>
                        <label htmlFor='comentarios'>Comentarios</label>
                        <textarea id="comentarios" value={form.comentarios} name="comentarios" onChange={handleChange}></textarea>
                        <label htmlFor='ProvedorId'>Proveedor</label>
                        <select id='ProvedorId' value={form.ProvedorId} name="ProvedorId" onChange={handleChange}>
                            {provedor.map(prov => (
                                <option key={prov.id} value={prov.id}>{prov.name}</option>
                            ))}
                        </select>
                        <label htmlFor='subTotal'>Subtotal</label>
                        <input type="number" value={form.subTotal} name="subTotal" onChange={handleChange} />
                        <label htmlFor='descuento'>Descuento</label>
                        <input type="number" value={form.descuento} name="descuento" onChange={handleChange} />
                        <label htmlFor='iva'>IVA</label>
                        <input type="number" value={form.iva} name="iva" onChange={handleChange} />
                        <label htmlFor='percepciones'>Percepciones</label>
                        <input type="number" value={form.percepciones} name="percepciones" onChange={handleChange} />
                        <label htmlFor='total'>Total</label>
                        <input type="number" value={form.total} name="total" onChange={handleChange} />
                    </form>
                    <button className={style.button} onClick={handleClick}>Enviar</button>
                </div>
            </div>
        </div>

    );
}
