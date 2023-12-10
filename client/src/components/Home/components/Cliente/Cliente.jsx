import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ListCliente from './ListCliente';
export default function Navbar(props) {

    const {setClienteForm,ClienteForm} = props
    const [collapse, setCollapse] = useState("collapse")
    const handleClick = () => {
        collapse === "collapse" ? setCollapse("collapse.show") : setCollapse("collapse")
    }
    const [cliente, setCliente] = useState([])

    useEffect(() => {
        axios("http://localhost:3001/tienda/cliente").then(({ data }) => {
            console.log(data);
            setCliente(data)
        })
    }, [])

    const { clienteForm, handleChange } = props
    return (
        <>
            <div >
                <div className="input-group mb-3">
                    <span className="input-group-text">DNI/CUIT</span>
                    <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" name='dni' value={clienteForm.dni} onChange={handleChange} />


                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Nombre</span>
                    <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" name='nombre' value={clienteForm.nombre} onChange={handleChange} />
                </div>
                <button type="button" className="btn btn-info" onClick={handleClick}>Info</button>


            </div>
            <div className={`${collapse}`}>
                <ListCliente cliente={cliente} setClienteForm={setClienteForm} clienteForm={ClienteForm}/>
            </div>
        </>

    )
}