import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import style from "./ListaArticulos.module.css";
import buildQueryParams from '../../Utils/QueryFilterPath';

export default function ListaArticulos(props) {
    const [filters, setFilters] = useState({
        name: "",
        id: "",
        pageSize: 50,
        page: 1,
        orderBy: "",
        orderDirection: "ASC"
    });

    const [allProductos, setAllProductos] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
     

        axios(`/tienda/articulo${buildQueryParams(filters)}`).then(({ data }) => {
            setAllProductos(data.items);
            setTotalPages(Math.ceil(data.totalItems / filters.pageSize));
        });
    }, [filters]);

    const filter = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
            page: 1 // Reset to first page when filters change
        });
    };

    const changeOrderBy = (orderBy) => {
        const orderDirection = filters.orderBy === orderBy && filters.orderDirection === "asc" ? "desc" : "asc";
        setFilters({
            ...filters,
            orderBy,
            orderDirection
        });
    };

    const handlePageChange = (newPage) => {
        setFilters({
            ...filters,
            page: newPage
        });
    };

    const renderPaginationButtons = () => {
        const pagesToShow = 5;
        const halfPagesToShow = Math.floor(pagesToShow / 2);
        let startPage = Math.max(filters.page - halfPagesToShow, 1);
        let endPage = Math.min(startPage + pagesToShow - 1, totalPages);

        if (endPage - startPage < pagesToShow - 1) {
            startPage = Math.max(endPage - pagesToShow + 1, 1);
        }

        const buttons = [];

        if (startPage > 1) {
            buttons.push(
                <button key="first" onClick={() => handlePageChange(1)}>{'<<'}</button>,
                <button key="prev" onClick={() => handlePageChange(filters.page - 1)}>{'<'}</button>
            );
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={filters.page === i ? style.activePage : ''}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            buttons.push(
                <button key="next" onClick={() => handlePageChange(filters.page + 1)}>{'>'}</button>,
                <button key="last" onClick={() => handlePageChange(totalPages)}>{'>>'}</button>
            );
        }

        return buttons;
    };

    return (
        <div className={style.container}>
            <div className={style.searchContainer}>
                <input type="text" name='name' value={filters.name} onChange={filter} placeholder="Buscar por nombre" />
                <input type="text" name='id' value={filters.id} onChange={filter} placeholder="Buscar por ID" />
                <button className={style.button} onClick={() => setFilters({ ...filters, name: '', id: '' })}>Limpiar</button>
            </div>
            <div className={style.header}>
                <p  onClick={() => changeOrderBy('id')}>Código de Barras</p>
                <p onClick={() => changeOrderBy('name')}>Nombre</p>
                <p onClick={() => changeOrderBy('stock')}>Cantidad</p>
                <p onClick={() => changeOrderBy('precioVenta')}>Precio</p>
            </div>
            <div className={style.productList}>
                {allProductos.map((prod) => (
                    <Link key={prod.id} to={`/detail/${prod.id}`} className={style.productItem}>
                        <p className={style.id}>{prod.id}</p>
                        <p className={style.name}>{prod.name}</p>
                        <p className={style.stock}>{prod.stock}</p>
                        <p>${prod.precioVenta}</p>
                    </Link>
                ))}
            </div>
            <div className={style.pagination}>
                {renderPaginationButtons()}
            </div>
        </div>
    );
}
