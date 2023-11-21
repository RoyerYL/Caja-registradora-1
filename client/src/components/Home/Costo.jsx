import React, { useState } from 'react';
import style from './Home.module.css'
export default function Costo() {
    const [collapse, setCollapse] = useState("collapse")

    const handleClick = () => {
        collapse === "collapse" ? setCollapse("collapse.show") : setCollapse("collapse")
    }

    return (
        <div className={style.Costo}>

            <table className="table table-success table-striped">
                <tbody>
                    <tr>
                        <th scope="row">Subtotal:</th>
                        <td>Mark</td>
                        <td>0.00</td>
                    </tr>
                    <tr>
                        <th scope="row">Descuento:</th>
                        <td><select className="form-select form-select-sm" aria-label="Small select example" defaultValue="1">
                            <option value="1">Sin descuento</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select></td>
                        <td>0.00</td>
                    </tr>
                    <tr>
                        <th scope="row">Total</th>
                        <td colSpan="2">0.00</td>
                    </tr>
                </tbody>
            </table>

        </div>


    )
}