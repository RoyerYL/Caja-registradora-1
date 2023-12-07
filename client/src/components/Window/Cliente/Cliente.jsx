import React, { useState } from 'react';
import style from "./Cliente.module.css"
import Form from './Form';
import ListClientes from './ListCliente';
export default function Cliente() {
    const [collapse, setCollapse] = useState("collapse")
    const [form, setForm] = useState({
        name: "",
        id: "",
        stock: 0,
        stockMin: 0,
        costoPeso: Number.parseFloat(0).toFixed(2),
        costoDolar: Number.parseFloat(0).toFixed(2),
        precioVenta: Number.parseFloat(0).toFixed(2),
        descripcion: "",
        iva: 0

    })
    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setForm({ ...form, [property]: value });//cambio Form..
    }
    const handleClick = () => {
        collapse === "collapse" ? setCollapse("collapse.show") : setCollapse("collapse")
    }
    return (

        <div className={style.AltaArticulo}>
            <h2>Alta Articulos</h2>
            <div>

                <div>

                    <ListClientes />
                </div>
                <div>

                    <Form />
                </div>
            </div>
        </div>
    );
}

