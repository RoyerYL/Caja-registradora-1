import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ListCliente from './ListCliente';
import style from './Cliente.module.css';

export default function Navbar(props) {
    const [collapse, setCollapse] = useState("collapse");
    const { setClienteForm, clienteForm, handleChange } = props;
    const [cliente, setCliente] = useState([]);

    const handleClick = (e) => {
        e.stopPropagation();
        setCollapse(collapse === "collapse" ? "collapse.show" : "collapse");
    };

    useEffect(() => {
        axios("/tienda/cliente").then(({ data }) => {
            setCliente(data);
        });

        const cerrar = () => {
            setCollapse("collapse");
        };

        document.addEventListener('click', cerrar);
        return () => {
            document.removeEventListener('click', cerrar);
        };
    }, []);

    return (
        <div className={style.cliente}>
            <p>Cliente</p>
            <div className={style.containerNombre}>
                <div className={style.nombre}>
                    <span>Nombre:</span>
                    <input name='nombre' value={clienteForm.nombre} onChange={handleChange} />
                </div>
                <button onClick={handleClick}>Info</button>
            </div>
            <div className={`${collapse} ${style.tablaCliente}`}>
                <ListCliente cliente={cliente} setClienteForm={setClienteForm} clienteForm={clienteForm} />
            </div>
        </div>
    );
}
