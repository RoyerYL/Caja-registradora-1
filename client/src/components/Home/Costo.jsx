import React, { useEffect } from 'react';
import style from './Venta.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import redondearPrecio from '../../Utils/redondearPrecio';

export default function Costo(props) {
    const producto = useSelector((state) => state.producto);
    const { costo, setCosto } = props;

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value);
    };

    useEffect(() => {
        let i = redondearPrecio(costo.subTotal);
    }, [costo]);

    const { id } = useParams();

    useEffect(() => {
        let total = 0;
        producto?.productos?.forEach((prod) => {
            total += (prod.cantidad * prod.producto.precioVenta);
        });
        setCosto({ ...costo, subTotal: Number.parseFloat(total).toFixed(2) });
    }, [id, producto, setCosto]);

    const handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        setCosto({ ...costo, [name]: value });
    };

    return (
        <div className={style.Costo}>
            <table className={style.CostoTable}>
                <tbody>
                    <tr>
                        <th>Subtotal:</th>
                        <td>{formatCurrency(costo.subTotal)}</td>
                    </tr>
                    <tr>
                        <th>Descuento:</th>
                        <td>
                            <select name='descuento' value={costo.descuento} onChange={handleChange} className={style.select}>
                                <option value={0}>Sin descuento</option>
                                <option value={100}>100%</option>
                                <option value={50}>50%</option>
                                <option value={30}>30%</option>
                                <option value={25}>25%</option>
                                <option value={10}>10%</option>
                                <option value={5}>5%</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>Total:</th>
                        <td>{formatCurrency(costo.subTotal * ((100 - costo.descuento) / 100)) || formatCurrency(0)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
