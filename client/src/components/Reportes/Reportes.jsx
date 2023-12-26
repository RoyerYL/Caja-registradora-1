import React from "react"
import MasVendidos from "./Routes/MasVendidos"
import { Link, Route, Routes } from "react-router-dom"
import style from "./Reportes.module.css"
import CantidadVentas from "./Routes/CantidadVentas"
import VentasXCliente from "./Routes/VentasXCliente"
export default function Reportes() {

    return (
        <div className="flex-1">
            <div className= {style.reportesButtons}>
                <Link to={"reportes/cantidadVentas"}>
                <span>Cantidad ventas x producto</span>
                </Link>
                <Link to={"reportes/masVendidos"}>
                <span>Productos más vendidos</span>
                </Link>
                <Link to={"reportes/ventasXCliente"}>
                <span>Ventas x cliente</span>
                </Link>
                <Link to={"reportes/ventasXVendedor"}>
                <span>Ventas x vendedor</span>
                </Link>
            </div>
            <Routes>
                
            <Route path="reportes/masVendidos" element={
                
                <MasVendidos/>
            } />
            <Route path="reportes/ventasXCliente" element={
                
                <VentasXCliente/>
            } />
            <Route path="reportes/ventasXVendedor" element={
                
                <CantidadVentas/>
            } />
            <Route path="reportes/cantidadVentas" element={
                
                <CantidadVentas/>
            } />
            

            </Routes>

        </div>
    )
}