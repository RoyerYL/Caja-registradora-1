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


        axios("/tienda/caja").then(({ data }) => {
            setCaja(data)
        })

    }, [props.cajaAbierta])


    return (
        <div className={style.containerCaja}>
            <div className={style.index}>
                <p className={style.cajaId}>id</p>
                <p className={style.cajaFechaApertura}>Fecha de apertura</p>
                <p className={style.cajaFechaCierre}>Fecha de cierre</p>
                <p className={style.cajaPrecioInicial}>Precio inicial</p>
                <p className={style.cajaPrecioFinalCaja}>Precio final en caja</p>
                <p className={style.cajaPrecio}>Precio final</p>
                <p className={style.cajaPrecio}>Diferencia de precios</p>
            </div>
            <div className={style.cajaList}>

                {
                    caja.map((c) => {
                        return (
                            <div key={c.id} className={`${style.cajas} ${!c.apertura ? style.abierto : style.cerrado}`}>
                                <p className={style.cajaId}>{c.id}</p>
                                <p className={style.cajaFechaApertura}>{moment(c.fechaApertura).format('DD/MM/YYYY HH:mm')}</p>
                                <p className={style.cajaFechaCierre}>{c.fechaCierre ? moment(c.fechaCierre).format('DD/MM/YYYY HH:mm') : "Abierto"}</p>
                                <p className={style.cajaPrecioInicial}>{formatoPrecio(c.precioInicial)} $</p>
                                <p className={style.cajaPrecioFinalCaja}> {c.precioFinalCaja >= 0 ? formatoPrecio(c.precioFinalCaja) : "Abierto"}</p>
                                <p className={style.cajaPrecio}>{c.precioFinal >= 0 ? formatoPrecio(c.precioFinal) : "Abierto.."}</p>
                                <p className={style.cajaPrecio}>{c.precioFinal >= 0 ? formatoPrecio(Number(c.precioFinal)-Number(c.precioFinalCaja)) : "Abierto.."}</p>

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )

}