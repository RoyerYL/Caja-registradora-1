import React, {useEffect, useState } from 'react';
import axios from 'axios'
// const { remote } = window.require('electron');
// const { BrowserWindow } = remote;

function Comprobante() {
    const[collapse,setCollapse]=useState("collapse")
    const [comprobantes,setComprobantes]=useState([])

    useEffect(()=>{
        axios("http://localhost:3001/tienda/ticket").then(({data})=>{setComprobantes(data);})
    },[])

    const handleClick=()=>{
        collapse==="collapse"?setCollapse("collapse.show"):setCollapse("collapse")
    }
    const openNewWindow=()=>{
        console.log(window);
        window.electron.openNewWindow()
    }
    
    return (
        <div>
            {
                comprobantes.map((comprobante)=>{
                    return(
                        <>
                            <span>{comprobante.id}</span>
                            <br />
                            <span>{comprobante.fecha}</span>
                            <br />
                            <span>{comprobante.ClienteId}</span>
                            <br />
                            <span>{comprobante.valorTotal}</span>
                            <br />
                            <br />
                        </>
                    )
                })
            }

        </div>
    );

}

export default Comprobante;
