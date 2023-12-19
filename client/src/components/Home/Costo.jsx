import React, {useEffect, useState } from 'react';
import style from './Venta.module.css'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
export default function Costo(props) {
    const [collapse, setCollapse] = useState("collapse")
    const producto=useSelector((state)=>state.producto)

    const{costo,setCosto}=props
    

    const{id}=useParams
    useEffect(()=>{
        let total=0
        producto.map((prod)=>{
             total+=(prod.cantidad*prod.producto.precioVenta)
            ;})

        setCosto({
            subTotal:Number.parseFloat(total).toFixed(2)
        })
    },[id,producto])

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
                        <td><select defaultValue="1">
                            <option value="1">Sin descuento</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th >Total</th>
                        <td></td>
                        <td id='costoTotal' colSpan="2">{costo.subTotal}</td>
                    </tr>
                </tbody>
            </table>

        </div>


    )
}