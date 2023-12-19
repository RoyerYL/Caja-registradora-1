import React, { useEffect, useState } from 'react';
import style from './Condicion.module.css'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { add_vendedor } from '../../redux/action';
export default function Condicion() {
    const [collapse, setCollapse] = useState("collapse")
    const dispatch = useDispatch()
    const vendedor = useSelector((state) => state.Vendedor)
    const [vendedores, setVendedores] = useState([])
    useEffect(() => {
        axios("http://localhost:3001/tienda/vendedor").then(({ data }) => { setVendedores(data) })
    }, [])

    const changeVendedor = (e) => {
        dispatch(add_vendedor(e.target.value))
    }
    return (
        <div className={style.condicion}>
            <div className={style.observaciones}>
                <label >Observaciones</label>
                <textarea rows="4" cols="30"></textarea>
            </div>
            <div>

                <select onChange={changeVendedor} value={vendedor}>
                    {
                        vendedores.map((vendedor) => {
                            return (
                                <option key={vendedor.id} value={vendedor.id}>{vendedor.vendedor}</option>
                            )
                        })
                    }
                </select>
            </div>
        </div>
    )
}