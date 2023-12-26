import React, { useEffect, useState } from 'react';
import style from './Venta.module.css'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
export default function Costo(props) {
    const [collapse, setCollapse] = useState("collapse")
    const producto = useSelector((state) => state.producto)

    const { costo, setCosto } = props


    const { id } = useParams
    useEffect(() => {
        let total = 0
        producto.map((prod) => {
            total += (prod.cantidad * prod.producto.precioVenta)
                ;
        })

        setCosto({...costo,
            subTotal: Number.parseFloat(total).toFixed(2)
        })
    }, [id, producto])
    const handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name

        
        setCosto({ ...costo, [name]: value })
    }
    const handleClick = () => {
        collapse === "collapse" ? setCollapse("collapse.show") : setCollapse("collapse")
    }
    return (
        <div className={style.Costo}>

            <table >
                <tbody>
                    <tr>
                        <th >Subtotal:</th>
                        <td></td>
                        <td>{costo.subTotal}</td>
                    </tr>
                    <tr>
                        <th >Descuento:</th>
                        <td>
                            <select name='descuento' value={costo.descuento} onChange={handleChange}>
                                <option value={0}>Sin descuento</option>
                                <option value={100}>100%</option>
                                <option value={50}>50%</option>
                                <option value={30}>30%</option>
                                <option value={25}>25%</option>
                                <option value={10}>10%</option>
                                <option value={5}>5%</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <th >Total</th>
                        <td></td>
                        <td id='costoTotal' colSpan="2">{
                        Number.parseFloat(costo.subTotal-(costo.subTotal* costo.descuento/100)).toFixed(2)
                         ||0}</td>
                    </tr>
                </tbody>
            </table>

        </div>


    )
}