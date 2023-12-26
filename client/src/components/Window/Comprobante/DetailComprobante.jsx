import React, {useEffect, useState } from 'react';
import axios from 'axios'
import style from './Comprobante.module.css'
import Cliente from '../Cliente/Cliente';
// const { remote } = window.require('electron');
// const { BrowserWindow } = remote;

function DetailComprobante() {
    const [comprobantes,setComprobantes]=useState([])
    const [vendedor_,setVendedor]=useState("")

    useEffect(()=>{
        axios("http://localhost:3001/tienda/ticket").then(({data})=>{setComprobantes(data);})
    },[])
    async function getVendedor(id) {
        let vendedor=""
        await axios(`http://localhost:3001/tienda/vendedor/${id}`).then(({data})=>{
            setVendedor(data.vendedor)
        })
       
    }
    return (
        <div className={style.Comprobante}>
           hola
        </div>
    );

}

export default DetailComprobante;
