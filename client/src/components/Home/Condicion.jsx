import React, { useEffect, useState } from 'react';
import style from './Condicion.module.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { add_vendedor } from '../../redux/action';

export default function Condicion({contado,handleChange}) {
    const [collapse, setCollapse] = useState("collapse");
    const dispatch = useDispatch();
    const vendedor = useSelector((state) => state.Vendedor);
    const [vendedores, setVendedores] = useState([]);

    useEffect(() => {
        axios("/tienda/vendedor").then(({ data }) => {
            setVendedores(data);
        });
    }, []);

    const changeVendedor = (e) => {
        dispatch(add_vendedor(e.target.value));
    };

    return (
        <div className={style.condicion}>
            <div className={style.selectContainer}>
                <label className={style.selectLabel}>Seleccionar Vendedor</label>
                <select onChange={changeVendedor} value={vendedor} className={style.select}>
                    {vendedores.map((vendedor) => (
                        <option key={vendedor.id} value={vendedor.id}>{vendedor.vendedor}</option>
                    ))}
                </select>
            </div>
            <div className={style.paymentOption}>
                <p>Contado</p>
                <input type="checkbox" name='contado' checked={contado} onChange={handleChange} />
            </div>
            <div className={style.paymentOption}>
                <p>Cuenta Corriente</p>
                <input type="checkbox" name='contado' checked={!contado} onChange={handleChange} />
            </div>
            <div className={style.observacionesContainer}>
                <label className={style.observacionesLabel}>Observaciones</label>
                <textarea rows="4" cols="30" className={style.observacionesTextarea}></textarea>
            </div>
        </div>
    );
}
