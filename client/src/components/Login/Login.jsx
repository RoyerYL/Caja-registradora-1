import React, { useEffect, useState } from 'react';
import style from "./Login.module.css"

import { useDispatch, useSelector } from 'react-redux';
import { add_cotizacion, add_vendedor } from '../../redux/action';
import axios from 'axios';
export default function Login(props) {

    const Vendedor = useSelector((state) => state.Vendedor)
    const cotizacionDolar = useSelector((state) => state.cotizacionDolar)
    const [Cotizacion, setCotizacion] = useState({
        precioInicial:0,
        mep: Number.parseFloat(cotizacionDolar.mep).toFixed(2),
        blue: Number.parseFloat(cotizacionDolar.blue).toFixed(2),

    })

    const vendedor = useSelector((state) => state.Vendedor)
    const [vendedores, setVendedores] = useState([])
    useEffect(() => {
        axios("http://localhost:3001/tienda/vendedor").then(({ data }) => { setVendedores(data) })
    }, [])

    const dispatch = useDispatch()
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
    const apertura=()=>{
        axios.post("http://localhost:3001/tienda/caja",{
            precioInicial:Cotizacion.precioInicial,
            fechaApertura:new Date()
        }).then(({data})=>{console.log(data);})
    }

    return (
        <div className={style.login}>
            <div>

                    <label>Precio Inicial</label>
                    <input name='precioInicial' value={Cotizacion.precioInicial} onChange={handleChange} />
                    <div >

                    <button type='submit' onClick={apertura}> Apertura </button>
                </div>
                
            </div>
            <div>


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