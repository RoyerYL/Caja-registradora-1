import React, { useEffect, useState } from 'react';
import style from "./Login.module.css"

import { useDispatch, useSelector } from 'react-redux';
import { add_cotizacion, add_vendedor, cajaAbierta } from '../../redux/action';
import axios from 'axios';
export default function Login(props) {

    const dispatch = useDispatch()
    const Vendedor = useSelector((state) => state.Vendedor)
    const caja = useSelector((state) => state.caja)
    const [cajaAbierta_, setCajaAbierta] = useState(0)
    const [Cotizacion, setCotizacion] = useState({
        precioInicial: 0,
        precioFinal: 0,
        cotizacionBlue: Number.parseFloat(0).toFixed(2),
        cotizacionMep: Number.parseFloat(0).toFixed(2),

    })

    const [vendedores, setVendedores] = useState([])


    useEffect(() => {

        axios("http://localhost:3001/tienda/vendedor").then(({ data }) => {
            console.log(data[0].id);
            dispatch(add_vendedor(data[0].id))
            setVendedores(data)
        })
        axios("http://localhost:3001/tienda/caja").then(({ data }) => {
            if (data.length > 0) {

                if (data[0].apertura) {
                    dispatch(cajaAbierta(data[0].id))
                    setCotizacion(prevCotizacion => ({ ...prevCotizacion, precioInicial: data[0].precioInicial }));
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

    const submitHandler = (event) => {
        axios.post("http://localhost:3001/tienda/cotizacion", {
            cotizacionBlue: Cotizacion.cotizacionBlue,
            cotizacionMep: Cotizacion.cotizacionMep
        })


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
                    caja !== 0 ?
                        (<>
                            <div>

                                <label>Precio Inicial</label>
                                <input name='precioInicial' value={Cotizacion.precioInicial} readOnly />
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
                    <input name='cotizacionMep' value={Cotizacion.cotizacionMep} onChange={handleChange} />
                </div>
                <div>
                    <label >Cotizacion dolar BLUE : </label>
                    <input name='cotizacionBlue' value={Cotizacion.cotizacionBlue} onChange={handleChange} />
                </div>

                <div >

                    <button onClick={submitHandler}> Confirmar </button>
                </div>

            </div>
        </div>
    )

}