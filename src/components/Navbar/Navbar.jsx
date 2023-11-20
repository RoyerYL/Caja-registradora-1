import React, { useState } from 'react';
import style from './Navbar.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import PageArticulo from '../Home/components/ListaArticulos/PageArticulo';

export default function Navbar() {
    const [id_, setID] = useState(0)
    const [button, setButton] = useState([])
    const handleClick = () => {
        setButton([...button,{id:id_}])
        setID(id_+1)
        
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
                    
                        <button type="button" className="btn btn-outline-primary" onClick={handleClick}>Nuevo</button>
                    
                    <Link to="/provedor">
                        <button type="button" className="btn btn-outline-primary">Comprobantes</button>
                    </Link>
                    <Link to="/ventana">
                        <button type="button" className="btn btn-outline-primary">Comprobantes</button>
                    </Link>

                </div>  
                {button.map((prod,id) => (
                        <PageArticulo key={id} id={id}/>
                    ))}

            </nav>
        </div>
    )
}