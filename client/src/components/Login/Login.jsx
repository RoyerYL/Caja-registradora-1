import React, { useEffect, useState } from 'react';
import style from "./Login.module.css"

import { useDispatch, useSelector } from 'react-redux';
import { add_cotizacion, add_vendedor, cajaAbierta } from '../../redux/action';
import axios from 'axios';
import Caja from './Caja/Caja';
export default function Login(props) {
    const { Cotizacion, setCotizacion } = props
    const dispatch = useDispatch()
    const Vendedor = useSelector((state) => state.Vendedor)
    const caja = useSelector((state) => state.caja)
    const [cajaAbierta_, setCajaAbierta] = useState(0)

    const [vendedores, setVendedores] = useState([])

    useEffect(() => {
        axios("http://localhost:3001/tienda/caja").then(({ data }) => {
            if (data.length > 0) {

                if (data[0].apertura) {
                    dispatch(cajaAbierta(data[0].id))
                    setCotizacion(prevCotizacion => ({ ...prevCotizacion, precioInicial: data[0].precioInicial, apertura: data[0].apertura }));
                }
            }
        })
        axios("http://localhost:3001/tienda/cotizacion").then(({ data }) => {
            if (data.length > 0) {

                setCotizacion(prevCotizacion => ({
                    ...prevCotizacion,
                    cotizacionBlue: data[0].cotizacionBlue,
                    cotizacionMep: data[0].cotizacionMep,
                }));
            }
        })
    }, [cajaAbierta_])
    useEffect(() => {

        axios("http://localhost:3001/tienda/vendedor").then(({ data }) => {
            console.log(data);
            dispatch(add_vendedor(data[0].id))
            setVendedores(data)
        })


    }, [])

    const submitHandler = (event) => {
        axios.post("http://localhost:3001/tienda/cotizacion", {
            cotizacionBlue: Cotizacion.cotizacionBlue,
            cotizacionMep: Cotizacion.cotizacionMep
        })

        actualizarPrecios()
        event.preventDefault()//evitamos que submit recargue la pagina
    }

    const handleChange = (event) => {



        const value = event.target.value;
        const property = event.target.name;
        if (property === "vendedor") {
            dispatch(add_vendedor(value))
            return ""
        }

        setCotizacion({ ...Cotizacion, [property]: value })

    }
    const apertura = () => {
        axios.post("http://localhost:3001/tienda/caja", {
            precioInicial: Cotizacion.precioInicial,
            fechaApertura: new Date()
        }).then(() => {
            setCajaAbierta(1);
        });
    }

    const cierre = () => {
        axios.post("http://localhost:3001/tienda/cerrarCaja", {
            id: caja,
            precioFinal: Cotizacion.precioFinal,
            fechaCierre: new Date()
        }).then(() => {
            setCajaAbierta(2);
            setCotizacion({ ...Cotizacion, apertura: false });
        });
    }

    const actualizarPrecios = () => {
        axios.post("http://localhost:3001/tienda/calcularPrecioVentaPorDolar")
    }
    return (
        <div className={style.login}>
            <div className={style.cajaApertura}>

                {
                    Cotizacion.apertura ?
                        (<>
                            <span>Caja abierta</span>
                            <div className={style.precioInicial}>

                                <label>Precio Inicial: </label>
                                <label >{Number.parseFloat(Cotizacion.precioInicial).toFixed(2) } </label>
                                <label> $</label>
                            </div>
                            <div>

                                <label>Precio Final: </label>
                                <input name='precioFinal' value={Number.parseFloat(Cotizacion.precioFinal).toFixed(2)} onChange={handleChange} />
                                <label> $</label>
                            </div>
                            <div >

                                <button type='submit' onClick={cierre}> Cerrar caja </button>
                            </div>

                        </>)
                        : (<>
                            <label>Precio Inicial</label>
                            <input name='precioInicial' value={Number.parseFloat(Cotizacion.precioInicial).toFixed(2)} onChange={handleChange} />
                            <div >

                                <button type='submit' onClick={apertura}> Apertura </button>
                            </div>

                        </>)
                }
            </div>
            <div className={style.Cotizacion}>

                <div>

                    <label htmlFor="">Vendedor: </label>
                    <select id='vendedor' value={Vendedor} name='vendedor' onChange={handleChange}>
                        {
                            vendedores.map((vendedor) => {
                                return (
                                    <option key={vendedor.id} value={vendedor.id}>{vendedor.vendedor}</option>
                                )
                            })
                        }
                    </select>

                </div>

                <div>
                    <label>Cotizacion dolar: </label>
                    <input name='cotizacionMep' value={Cotizacion.cotizacionMep} onClick={(event) => { event.target.value = "" }} onChange={handleChange} />
                    <label> $</label>
                </div>

                <div className={style.botonCotizacion}>

                    <button onClick={submitHandler}> Actualizar precios </button>
                </div>
            </div>
            
            <Caja cajaAbierta={cajaAbierta_} />
        </div>
    )

}