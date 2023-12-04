import React, {useEffect, useState } from 'react';
import style from './Venta.module.css'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
export default function Costo() {
    const [collapse, setCollapse] = useState("collapse")
    const producto=useSelector((state)=>state.producto)

    const[costo,setCosto]=useState(
        {
            subTotal:"0.00",
        }
    )

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

            <table className="table table-success table-striped">
                <tbody>
                    <tr>
                        <th scope="row">Subtotal:</th>
                        <td></td>
                        <td>{costo.subTotal}</td>
                    </tr>
                    <tr>
                        <th scope="row">Descuento:</th>
                        <td><select className="form-select form-select-sm" aria-label="Small select example" defaultValue="1">
                            <option value="1">Sin descuento</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th scope="row">Total</th>
                        <td></td>
                        <td id='costoTotal' colSpan="2">{costo.subTotal}</td>
                    </tr>
                </tbody>
            </table>

        </div>


    )
}