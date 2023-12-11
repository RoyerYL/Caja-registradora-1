import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ListCliente from './ListCliente';
import style from './Cliente.module.css'
export default function Navbar(props) {

    const [collapse, setCollapse] = useState("collapse")

    const {setClienteForm,clienteForm} = props
    const {  handleChange } = props

    const [cliente, setCliente] = useState([])

    const handleClick = (e) => {
        e.stopPropagation()
        collapse==="collapse"?setCollapse("collapse.show"):setCollapse("collapse")
        // collapse === "collapse" ? setCollapse("collapse.show") : setCollapse("collapse")
    }

    useEffect(() => {
        axios("http://localhost:3001/tienda/cliente").then(({ data }) => {
            // console.log(data);
            setCliente(data)
        })

        const cerrar=()=>{
            setCollapse("collapse")
        }

        document.addEventListener('click',cerrar)
        return()=>{
            document.removeEventListener('click',cerrar)

        }
    }, [])

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
            <div className={`${collapse} ${style.tablaCliente}`}>
                <ListCliente cliente={cliente} setClienteForm={setClienteForm} clienteForm={clienteForm}/>
            </div>
        </>

    )
}