import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import MasVendidos from "./Routes/MasVendidos";
import VentasXCliente from "./Routes/VentasXCliente";
import style from "./Reportes.module.css";
import VentasXVendedor from "./Routes/VentasXVendedor";
import VentasPorCategoria from "./Routes/VentasPorCategoria";

export default function Reportes() {
    return (
        <div className={style.container}>
            <div className={style.sidebar}>
                <Link to="reportes/masVendidos" className={style.link}>
                    <span>Productos más vendidos</span>
                </Link>
                <Link to="reportes/ventasXCliente" className={style.link}>
                    <span>Ventas x cliente</span>
                </Link>
                <Link to="reportes/ventasXVendedor" className={style.link}>
                    <span>Ventas x vendedor</span>
                </Link>
                <Link to="reportes/VentasPorCategoria" className={style.link}>
                    <span>Cantidad ventas x categoria</span>
                </Link>
                {/* <Link to="reportes/mercaderia" className={style.link}>
                    <span>Ventas x mercadería</span>
                </Link> */}
            </div>
            <div className={style.content}>
                <Routes>
                    <Route path="reportes/masVendidos" element={<MasVendidos />} />
                    <Route path="reportes/ventasXCliente" element={<VentasXCliente />} />
                    <Route path="reportes/ventasXVendedor" element={<VentasXVendedor />} />
                    <Route path="reportes/VentasPorCategoria" element={<VentasPorCategoria />} />
                </Routes>
            </div>
        </div>
    );
}
