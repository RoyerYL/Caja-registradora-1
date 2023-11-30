import React, { useState } from 'react';
import style from './Venta.module.css'
export default function Condicion() {
    const [collapse, setCollapse] = useState("collapse")

    const handleClick = () => {
        collapse === "collapse" ? setCollapse("collapse.show") : setCollapse("collapse")
    }

    return (
        <div className={style.condicion}>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Observaciones</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="4" cols="30"></textarea>
            </div>
            <div>

            <select className="form-select form-select-sm" aria-label="Small select example" defaultValue="A">
                <option value="A">Administrador</option>
                <option value="1">Vendedor 1</option>
                <option value="2">Vendedor 2</option>
                <option value="3">Vendedor 3</option>
            </select>
            <select className="form-select form-select-sm" aria-label="Small select example" defaultValue="1">
                <option value="1">Lista de Precios 1</option>
                <option value="1">Lista de Precios 2</option>
                <option value="1">Lista de Precios 3</option>
            </select>
            </div>
        </div>
    )
}