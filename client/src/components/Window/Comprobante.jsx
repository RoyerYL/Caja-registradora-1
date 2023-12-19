import React, {useEffect, useState } from 'react';
import axios from 'axios'
// const { remote } = window.require('electron');
// const { BrowserWindow } = remote;

function Comprobante() {
    const [comprobantes,setComprobantes]=useState([])

    useEffect(()=>{
        axios("http://localhost:3001/tienda/ticket").then(({data})=>{setComprobantes(data);})
    },[])
    
    return (
        <div>
            {
                comprobantes.map((comprobante)=>{
                    return(
                        <div key={comprobante.id}>
                            <span># {comprobante.id}</span>
                            <br />
                            <span>fecha: {comprobante.fecha}</span>
                            <br />
                            <span>cliente: {comprobante.ClienteId}</span>
                            <br />
                            <span>Valor Total:$ {comprobante.valorTotal}</span>
                            <br />
                            <br />
                        </div>
                    )
                })
            }

        </div>
    );

}

export default Comprobante;
