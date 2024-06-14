import axios from "axios";
import React, { useState, useEffect } from "react";
import style from './VentasXVendedor.module.css';

export default function VentasXVendedor() {
    const [vendedores, setVendedores] = useState([]);
    const [selectedVendedor, setSelectedVendedor] = useState(null);
    const [ventas, setVentas] = useState([]);

    useEffect(() => {
        axios("http://localhost:3001/tienda/vendedor") // Suponiendo que tienes un endpoint para obtener los vendedores
            .then(({ data }) => {
                console.log(data);
                setVendedores(data);
            })
            .catch((error) => console.error("Error fetching vendedores:", error));
    }, []);

    async function handleVendedorClick(id) {
        try {
            const { data } = await axios(`http://localhost:3001/tienda/ticket/ticketByVendedor/${id}`);
            console.log(data);
            setSelectedVendedor(id);
            setVentas(data);
        } catch (error) {
            console.error("Error fetching ventas:", error);
        }
    }

    return (
        <div className={style.VentasXVendedor}>
            <h2>Lista de Vendedores</h2>
            <ul className={style.vendedoresList}>
                {vendedores.map((vendedor) => (
                    <li key={vendedor.id} onClick={() => handleVendedorClick(vendedor.id)} className={style.vendedorItem}>
                        {vendedor.vendedor}
                    </li>
                ))}
            </ul>

            {selectedVendedor && (
                <div className={style.ventasContainer}>
                    {ventas.tickets.map((ticket) => (
                        <div key={ticket.id} className={style.ticket}>
                            <p>ID: {ticket.id}</p>
                            <p>Fecha: {new Date(ticket.fecha).toLocaleDateString()}</p>
                            <p>Cliente: {ticket.Cliente.nombre}</p>
                            <p>Valor Total: {ticket.valorTotal}</p>
                            <p>Descuento: {ticket.descuento}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
