import React, { useEffect, useState } from 'react';
import axios from 'axios'
import style from './Comprobante.module.css'
import Cliente from '../Cliente/Cliente';
import { Link } from 'react-router-dom';
// const { remote } = window.require('electron');
// const { BrowserWindow } = remote;

function Comprobante() {
    const [comprobantes, setComprobantes] = useState([])
    const [vendedor_, setVendedor] = useState("")

    useEffect(() => {
        axios("http://localhost:3001/tienda/ticket").then(({ data }) => { setComprobantes(data); })
    }, [])

    return (
        <div className={style.Comprobante}>
            {
                comprobantes.map((comprobante) => {
                    return (
                        <Link key={comprobante.id} to={``}>
                            <div className={style.tickets} key={comprobante.id}>
                                <span># {comprobante.id}</span>
                                <span>fecha: {comprobante.fecha}</span>
                                {
                                    comprobante.ClienteId !== 1 &&
                                    <span>cliente: {comprobante.ClienteId}</span>
                                }
                                <span>Vendedor: {comprobante.Vendedor.vendedor}</span>

                                <span>Valor Total:$ {comprobante.valorTotal}</span>
                            </div>
                        </Link>
                    )
                })
            }

        </div>
    );

}

export default Comprobante;
