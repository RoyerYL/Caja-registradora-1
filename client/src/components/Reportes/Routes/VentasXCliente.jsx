import axios from "axios";
import React, { useState, useEffect } from "react";
import style from './VentasxCliente.module.css';

export default function VentasXCliente() {
    const [clientes, setClientes] = useState([]);
    const [ventas, setVentas] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        axios("http://localhost:3001/tienda/cliente").then(({ data }) => {
            setClientes(data);
        });
    }, []);

    async function getVentas(id, page = 1) {
        const { data } = await axios(`http://localhost:3001/tienda/cliente/ventasCliente/${id}?page=${page}`);
        setVentas(prevVentas => ({
            ...prevVentas,
            [id]: {
                ...data,
                tickets: page === 1 ? data.tickets : [...prevVentas[id].tickets, ...data.tickets]
            }
        }));
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
    }

    return (
        <div className={style.VentasXCliente}>
            {clientes.map(cliente => (
                <details key={cliente.id} className={style.details} onToggle={() => getVentas(cliente.id)}>
                    <summary>
                        {cliente.nombre} ({ventas[cliente.id]?.tickets.length || 0})
                    </summary>
                    <div className={style.ticketList}>
                        {ventas[cliente.id]?.tickets.map(ticket => (
                            <div key={ticket.id} className={style.ticket}>
                                <p>ID: {ticket.id}</p>
                                <p>Fecha: {new Date(ticket.fecha).toLocaleDateString()}</p>
                                <p>Valor Total: ${ticket.valorTotal}</p>
                            </div>
                        ))}
                        {ventas[cliente.id]?.currentPage < ventas[cliente.id]?.totalPages && (
                            <button
                                className={style.loadMore}
                                onClick={() => getVentas(cliente.id, ventas[cliente.id].currentPage + 1)}
                            >
                                Cargar más
                            </button>
                        )}
                    </div>
                </details>
            ))}
        </div>
    );
}
