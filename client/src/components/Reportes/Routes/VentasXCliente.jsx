import axios from "axios"
import React, { useState, useEffect } from "react"
import style from '../Reportes.module.css'
export default function VentasXCliente() {
    const [cliente, setCliente] = useState([])
    const [ventas, setVentas] = useState([])
    useEffect(() => {
        axios("http://localhost:3001/tienda/cliente").then(({ data }) => {
            setCliente(data)
        })
    }, [])
    async function getVentas(id) {
        const { data } = await axios(`http://localhost:3001/tienda/ventasCliente/${id}`);
        setVentas((prevVentas) => [...prevVentas, data]);

    }
    useEffect(() => {
        cliente.forEach((client) => {
            getVentas(client.id)
        });
    }, [cliente])


    return (
        <div className={style.VentasXCliente}>
            {
                ventas.map((c) => {
                    return (
                        <details key={c.cliente.id} className={style.details}>
                            <summary>{c.cliente.nombre} ({c.tickets.length})</summary>
                            {
                                c.tickets.map((ticket) => {
                                    return (
                                        <div key={ticket.id}>
                                            <p>{ticket.id}</p>
                                            <p>{ticket.fecha}</p>
                                        </div>
                                    )
                                })
                            }
                         </details>
                    )
                })
            }
        </div>
    )
}