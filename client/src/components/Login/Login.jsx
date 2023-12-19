import React, { useEffect, useState } from 'react';
import style from "./Login.module.css"

import { useDispatch, useSelector } from 'react-redux';
import { add_cotizacion, add_vendedor, cajaAbierta } from '../../redux/action';
import axios from 'axios';
export default function Login(props) {

    const dispatch = useDispatch()
    const Vendedor = useSelector((state) => state.Vendedor)
    const cotizacionDolar = useSelector((state) => state.cotizacionDolar)
    const caja = useSelector((state) => state.caja)
    const [cajaAbierta_,setCajaAbierta]=useState(0)
    const [Cotizacion, setCotizacion] = useState({
        precioInicial: 0,
        precioFinal: 0,
        mep: Number.parseFloat(cotizacionDolar.mep).toFixed(2),
        blue: Number.parseFloat(cotizacionDolar.blue).toFixed(2),

    })

    const vendedor = useSelector((state) => state.Vendedor)
    const [vendedores, setVendedores] = useState([])
    useEffect(() => {
        axios("http://localhost:3001/tienda/vendedor").then(({ data }) => { setVendedores(data) })
        axios("http://localhost:3001/tienda/caja").then(({ data }) => {
            if (data[0].apertura) {
                
                dispatch(cajaAbierta(data[0].id))
                setCotizacion({ ...Cotizacion, precioInicial: data[0].precioInicial })
            }else{
                setCotizacion({ ...Cotizacion, precioInicial:0 })
                dispatch(cajaAbierta(0))
            }
        })

    }, [cajaAbierta_])

    const submitHandler = (event) => {

        dispatch(add_cotizacion(Cotizacion))

        event.preventDefault()//evitamos que submit recargue la pagina
        setValidado(false)
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
        }).then(({ data }) => { setCajaAbierta(1) })
    }
    const cierre = () => {
        axios.post("http://localhost:3001/tienda/cerrarCaja", {
            id: caja,
            precioFinal: Cotizacion.precioFinal,
            fechaCierre: new Date()
        }).then(({ data }) => { setCajaAbierta(2) })
    }
    return (
        <div className={style.login}>
            <div className={style.cajaApertura}>

                {
                    caja!==0 ?
                        (<>
                            <div>

                                <label>Precio Inicial</label>
                                <input name='precioInicial' value={Cotizacion.precioInicial} readOnly/>
                            </div>
                            <div>

                                <label>Precio Final</label>
                                <input name='precioFinal' value={Cotizacion.precioFinal} onChange={handleChange} />
                            </div>
                            <div >

                                <button type='submit' onClick={cierre}> Cierre </button>
                            </div>

                        </>)
                        : (<>
                            <label>Precio Inicial</label>
                            <input name='precioInicial' value={Cotizacion.precioInicial} onChange={handleChange} />
                            <div >

                                <button type='submit' onClick={apertura}> Apertura </button>
                            </div>

                        </>)
                }
            </div>
            <div className={style.Cotizacion}>


                <select id='vendedor' value={Vendedor} name='vendedor' onChange={handleChange}>
                    {
                        vendedores.map((vendedor) => {
                            return (
                                <option key={vendedor.id} value={vendedor.id}>{vendedor.vendedor}</option>
                            )
                        })
                    }
                </select>


                <div>
                    <label>Cotizacion dolar MEP : </label>
                    <input name='mep' value={Cotizacion.mep} onChange={handleChange} />
                </div>
                <div>
                    <label >Cotizacion dolar BLUE : </label>
                    <input name='blue' value={Cotizacion.blue} onChange={handleChange} />
                </div>

                <div >

                    <button onClick={submitHandler}> Confirmar </button>
                </div>

            </div>
        </div>
    )

}