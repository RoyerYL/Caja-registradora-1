import React, { useState } from 'react';
import style from './Navbar.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [collapse, setCollapse] = useState("collapse")
    const id=1
    const handleClick = () => {
        collapse === "collapse" ? setCollapse("collapse.show") : setCollapse("collapse")
    }

    return (
        <div className={style.Navbar}>


            <nav className="navbar navbar-dark bg-dark">
                <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <button type="button" className="btn btn-outline-primary">Ventas</button>
                    <button type="button" className="btn btn-outline-primary">Caja</button>
                    <button type="button" className="btn btn-outline-primary">Clientes</button>
                    <button type="button" className="btn btn-outline-primary">Provedores</button>
                    <button type="button" className="btn btn-outline-primary">Estadisticas</button>
                    <button type="button" className="btn btn-outline-primary">Reportes</button>
                    <button type="button" className="btn btn-outline-primary">Articulos</button>
                    <button type="button" className="btn btn-outline-primary">Operaciones</button>
                    <button type="button" className="btn btn-outline-primary">Administracón</button>
                </div>
            </nav>


            <nav className="navbar navbar-dark bg-dark">
                <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <Link to={`/home/${id}`}>
                        <button type="button" className="btn btn-outline-primary">Nuevo</button>
                    </Link>
                    <Link to="/provedor">
                        <button type="button" className="btn btn-outline-primary">Comprobantes</button>
                    </Link>

                </div>
            </nav>
        </div>
    )
}