import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './Comprobante.module.css';
import { Link, Route, Routes } from 'react-router-dom';
import DetailComprobante from './DetailComprobante';
import moment from 'moment';

function Comprobante() {
    const [comprobantes, setComprobantes] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [order, setOrder] = useState("fecha");
    const [orderDirection, setOrderDirection] = useState("DESC");
    const [actualizar, setActualizar] = useState(0);

    useEffect(() => {
        fetchComprobantes();
    }, [page, limit, order, orderDirection, actualizar]);

    const fetchComprobantes = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3001/tienda/ticket`, {
                params: { page, limit, order, orderDirection }
            });
            setComprobantes(data.tickets);
        } catch (error) {
            console.error("Error fetching tickets:", error);
        }
    };

    const succesStyle = (param) => {
        return param === null ? style.cancel : style.success;
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handleOrderChange = (event) => {
        setOrder(event.target.value);
    };

    const handleOrderDirectionChange = (event) => {
        setOrderDirection(event.target.value);
    };

    return (
        <div className={style.container}>
            <div className={style.listContainer}>
                {
                    comprobantes.map((comprobante) => {
                        return (
                            <Link key={comprobante.id} to={`comprobantes/${comprobante.id}/${comprobante.descuento}`}>
                                <div className={`${style.tickets} ${succesStyle(comprobante.CajaId)}`} key={comprobante.id}>
                                    <div>
                                        <span># {comprobante.id}</span>
                                        <span>Fecha: {moment(comprobante.fecha).format('DD/MM/YYYY HH:mm')}</span>
                                    </div>
                                    <div>
                                        {comprobante.ClienteId !== 1 &&
                                            <span>Cliente: {comprobante.Cliente.nombre}</span>
                                        }
                                        <span>Vendedor: {comprobante.Vendedor.vendedor}</span>
                                        <span>Valor Total: $ {comprobante.valorTotal}</span>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
                <div className={style.paginationControls}>
                    <label>
                        Items per page:
                        <select value={limit} onChange={handleLimitChange}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                    </label>
                    <label>
                        Order by:
                        <select value={order} onChange={handleOrderChange}>
                            <option value="fecha">Fecha</option>
                            <option value="valorTotal">Valor Total</option>
                        </select>
                    </label>
                    <label>
                        Order direction:
                        <select value={orderDirection} onChange={handleOrderDirectionChange}>
                            <option value="ASC">Ascending</option>
                            <option value="DESC">Descending</option>
                        </select>
                    </label>
                    <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
                    <button onClick={() => handlePageChange(page + 1)}>Next</button>
                </div>
            </div>
            <div className={style.detailContainer}>
                <Routes>
                    <Route path="comprobantes/:id/:desc" element={<DetailComprobante actualizar={actualizar} setActualizar={setActualizar} />} />
                </Routes>
            </div>
        </div>
    );
}

export default Comprobante;
