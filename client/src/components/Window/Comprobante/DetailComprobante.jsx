import React, { useEffect, useState } from 'react';
import axios from 'axios'
import style from './Comprobante.module.css'
import Cliente from '../Cliente/Cliente';
import { Link, useLocation, useParams } from 'react-router-dom';
// const { remote } = window.require('electron');
// const { BrowserWindow } = remote;

export default function DetailComprobante(props) {
    const{actualizar,setActualizar}=props
    const [compras, setAllCompras] = useState([])
    const { id, desc } = useParams()
    let location = useLocation
 

    let total = 0
    useEffect(() => {
        axios(`http://localhost:3001/tienda/compra/${id}`).then(({ data }) => {
            setAllCompras(data)

        })
    }, [id,actualizar])

    const cancelarTicket = async() => {
        await axios.post(`http://localhost:3001/tienda/cancelarTicket/${id}`)
        setActualizar(actualizar+1)
    }
    const imprimirRecibo = () => {
        window.electronAPI.executeTicketCreate(id)

    }
    return (
        <>
            <div className={style.DetailComprobante}>
                <div className={style.header}>

                    <p className={style.id}>N°{String(id).padStart(12, '0')}</p>
                    <div>
                        <button onClick={imprimirRecibo}>Imprimir ticket</button>
                        <button onClick={cancelarTicket}>Cancelar ticket</button>
                    </div>
                </div>
                <div className={style.indice}>
                    <p>Cod Barras</p>
                    <p className={style.nameIndice}>Nombre</p>
                    <p>subTotal</p>
                    <p>Cantidad</p>
                    <p className={style.totalIndice}>Total</p>

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

                                        <p className={style.precio}>${prod.subTotal / prod.cantidad}</p>
                                        <p className={style.cantidad}>x{prod.cantidad}</p>

                                        <p className={style.precio}>${prod.subTotal}</p>

                                    </div>
                                </Link>
                            )
                        }
                        )
                    }
                </div>
                <div className={style.total}>
                    <span>SubTotal: ${Number.parseFloat(total).toFixed(2)}</span>
                    {
                        desc === 0 ?
                            <span className={style.descuento}>{`Descuento: ${desc} `}</span>
                            : <span className={style.descuento}>{`Descuento: ${desc}%`}</span>
                    }
                    <span>Total: ${Number.parseFloat(total * ((100 - desc) / 100)).toFixed(2)
                        || 0}</span>
                </div>
            </div>
        </>
    );

}

