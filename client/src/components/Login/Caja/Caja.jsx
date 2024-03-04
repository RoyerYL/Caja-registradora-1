import React, { useEffect, useState } from 'react';
import style from "../Login.module.css"
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import formatoPrecio from '../../../Utils/formatoPrecio';
export default function Caja(props) {

    const dispatch = useDispatch()
    const Vendedor = useSelector((state) => state.Vendedor)
    const [caja, setCaja] = useState([])



    useEffect(() => {

       
        axios("http://localhost:3001/tienda/caja").then(({ data }) => {
           setCaja(data)
        })

    }, [props.cajaAbierta])

    
    return (
        <div className={style.containerCaja}>
           {
            caja.map((c)=>{
                return(
                    <div key={c.id} className={`${style.cajas} ${!c.apertura ? style.abierto:style.cerrado}`}>
                        <p className={style.cajaId}>{c.id}</p>
                        <p className={style.cajaFechaApertura}>{moment(c.fechaApertura).format('DD/MM/YYYY HH:mm')}</p>
                        <p className={style.cajaFechaCierre}>{ c.fechaCierre ? moment(c.fechaCierre).format('DD/MM/YYYY HH:mm') : "Abierto"}</p>
                        <p className={style.cajaPrecioInicial}>{formatoPrecio(c.precioInicial)} $</p>
                        <p className={style.cajaPrecioFinalCaja}> {c.precioFinalCaja>=0 ? formatoPrecio(c.precioFinalCaja) :"Abierto"}</p>
                        <p className={style.cajaPrecio}>{c.precioFinal>=0 ?formatoPrecio(c.precioFinal): "Abierto.."}</p>

                    </div>
                )
            })
           }
        </div>
    )

}