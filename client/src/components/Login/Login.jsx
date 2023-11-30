import React,{useEffect,useState} from 'react';
import style from "./Login.module.css"

import { useDispatch, useSelector } from 'react-redux';
import { add_cotizacion, add_vendedor } from '../../redux/action';
export default function Login(props) {

    const Vendedor = useSelector((state) => state.Vendedor)
    const cotizacionDolar = useSelector((state) => state.cotizacionDolar)
    const [Cotizacion,setCotizacion] = useState({
        mep:Number.parseFloat(cotizacionDolar.mep).toFixed(2),
        blue:Number.parseFloat(cotizacionDolar.blue).toFixed(2),

    })

 

    const dispatch = useDispatch()
    const submitHandler = (event) => {

        dispatch(add_cotizacion(Cotizacion))

        event.preventDefault()//evitamos que submit recargue la pagina
        setValidado(false)
    }

    const handleChange = (event) => {



        const value = event.target.value;
        const property = event.target.name;
        if (property==="vendedor") {
            
            dispatch(add_vendedor(value))
        return ""
        }
    
        setCotizacion({...Cotizacion,[property]:value})

    }

    return (
        <div className={style.login}>
            <div>


                <select id='vendedor' className="form-select form-select-sm" aria-label="Small select example" defaultValue={Vendedor} name='vendedor' onChange={handleChange}>
                    <option value="A">Administrador</option>
                    <option value="1">Vendedor 1</option>
                    <option value="2">Vendedor 2</option>
                    <option value="3">Vendedor 3</option>
                </select>


                <div>
                    <label htmlFor="password">Cotizacion dolar MEP : </label>
                    <input  name='mep' value={Cotizacion.mep} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="password">Cotizacion dolar BLUE : </label>
                    <input  name='blue' value={Cotizacion.blue} onChange={handleChange}/>
                </div>

                <div >

                    <button type='submit' onClick={submitHandler}> Confirmar </button>
                </div>
            
            </div>
        </div>
    )

}