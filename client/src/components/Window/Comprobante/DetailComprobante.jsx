import React, { useEffect, useState } from 'react';
import axios from 'axios'
import style from './Comprobante.module.css'
import Cliente from '../Cliente/Cliente';
import { Link, useLocation, useParams } from 'react-router-dom';
// const { remote } = window.require('electron');
// const { BrowserWindow } = remote;

export default function DetailComprobante() {
    const [compras, setAllCompras] = useState([])
    const { id, desc } = useParams()
    let location = useLocation

    let total = 0
    useEffect(() => {
        axios(`http://localhost:3001/tienda/compra/${id}`).then(({ data }) => {
            setAllCompras(data)

        })
    }, [id])

    const cancelarTicket=()=>{
        console.log(id);
    }
    
    return (
        <>
            <div className={style.DetailComprobante}>
                <div className='flex-1'>

                    <p className={style.codBarras}>{String(id).padStart(12, '0')}</p>
                    <button onClick={cancelarTicket}>Cancelar ticket</button>
                </div>
                <div className={style.listaArticulos}>
                    {
                        compras.map((prod, index) => {
                            total += prod.subTotal
                            return (

                                <Link key={prod.id} to={`/detail/${prod.Articulo.id}`}>
                                    <div className={`${style.articulos} `} key={prod.id}>

                                        <p className={style.codBarras}>{prod.Articulo.id}</p>

                                        <p className={style.nombre}>{prod.Articulo.name}</p>

                                        <p className={style.cantidad}>{prod.cantidad}</p>

                                        <p className={style.precio}>${prod.Articulo.precioVenta}</p>
                                        <p className={style.precio}>${prod.subTotal}</p>

                                    </div>
                                </Link>
                            )
                        }
                        )
                    }
                </div>
                <div className={style.total}>
                    <span>Descuento: {desc}</span>
                    <span>Total: {Number.parseFloat(total * ((100 - desc) / 100)).toFixed(2)
                        || 0}</span>
                </div>
            </div>
        </>
    );

}

