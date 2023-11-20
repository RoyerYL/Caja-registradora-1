import React, { useState } from 'react';
export default function Navbar() {
    const [collapse, setCollapse] = useState("collapse")

    const handleClick = () => {
        collapse === "collapse" ? setCollapse("collapse.show") : setCollapse("collapse")
    }

    return (
        <div >
            <div className="input-group mb-3">
                <span className="input-group-text">DNI/CUIT</span>
                <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                <button type="button" className="btn btn-info">Info</button>
                <button type="button" className="btn btn-danger">Danger</button>


            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Nombre</span>
                <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                <button type="button" className="btn btn-info">Info</button>
            </div>


        </div>


    )
}