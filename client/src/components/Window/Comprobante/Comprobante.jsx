import React, { useEffect, useState } from 'react';
import axios from 'axios'
import style from './Comprobante.module.css'
import Cliente from '../Cliente/Cliente';
import { Link, Route, Routes } from 'react-router-dom';
import DetailComprobante from './DetailComprobante';
// const { remote } = window.require('electron');
// const { BrowserWindow } = remote;

function Comprobante() {
    const [comprobantes, setComprobantes] = useState([])
    const [vendedor_, setVendedor] = useState("")
    const [actualizar,setActualizar]=useState(0)
    useEffect(() => {

        axios("http://localhost:3001/tienda/ticket").then(({ data }) => { setComprobantes(data); })
    }, [actualizar])
    const succesStyle = (param) => {
        return param === null ? style.cancel : style.success
    }
    return (
        <div className={style.container}>

            <div className={style.Comprobante}>
                {
                    comprobantes.map((comprobante) => {
                        return (
                            <Link key={comprobante.id} to={`comprobantes/${comprobante.id}/${comprobante.descuento}`}>
                                <div className={`${style.tickets} ${succesStyle(comprobante.CajaId)}`} key={comprobante.id}>
                                    <div className='flex-1'>

                                        <span># {comprobante.id}</span>
                                        <span>fecha: {comprobante.fecha}</span>
                                    </div>
                                    <div className='flex-1'>

                                        {
                                            comprobante.ClienteId !== 1 &&
                                            <span>cliente: {comprobante.ClienteId}</span>
                                        }
                                        <span>Vendedor: {comprobante.Vendedor.vendedor}</span>

                                        <span>Valor Total:$ {comprobante.valorTotal}</span>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }

            </div>
            <Routes>
                <Route path="comprobantes/:id/:desc" element={<DetailComprobante actualizar={actualizar} setActualizar={setActualizar}/>} />
            </Routes>
        </div>

    );

}

export default Comprobante;
