import axios from "axios";
import React, { useState, useEffect } from "react";
import style from './VentasPorCategoria.module.css';

export default function VentasPorCategoria() {
    const [ventasPorCategoria, setVentasPorCategoria] = useState([]);

    useEffect(() => {
        axios("http://localhost:3001/tienda/ticket/ticketByCategory")
            .then(({ data }) => {
                console.log(data);
                setVentasPorCategoria(data.ventas);
            })
            .catch((error) => console.error("Error fetching ventas por categoria:", error));
    }, []);

    return (
        <div className={style.VentasPorCategoria}>
            <h2>Ventas por Categoría de Producto</h2>
            <ul>
                {ventasPorCategoria.map((categoria) => (
                    <li key={categoria.CategoriaId}>
                        {categoria.Categorium?.nameCategoria
                        }: {categoria.totalVentas} unidades vendidas
                    </li>
                ))}
            </ul>
        </div>
    );
}
