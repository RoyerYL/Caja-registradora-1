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
    const onClose=(idFilter)=>{
        console.log(idFilter);
        console.log(button);
        const newButtons=button.filter((b)=>b.id!==idFilter)
        setButton(newButtons)
    }
    return (
        <div className={style.Navbar}>


            <nav className="navbar ">
                <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <button type="button" className="btn btn-sm btn-outline-secondary">Ventas</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary">Caja</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary">Clientes</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary">Provedores</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary">Estadisticas</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary">Reportes</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary">Articulos</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary">Operaciones</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary">Administracón</button>
                </div>
            </nav>


            <nav className="navbar">
                <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <Link to="/login">
                        <button type="button" className="btn btn-outline-primary">Caja</button>
                    </Link>
                    
                        <button type="button" className="btn btn-outline-primary" onClick={handleClick}>Nuevo</button>
                    
                    <Link to="/altaArticulo">
                        <button type="button" className="btn btn-outline-primary">Alta de articulo</button>
                    </Link>
                    <Link to="/ventana">
                        <button type="button" className="btn btn-outline-primary">Comprobantes</button>
                    </Link>
                    <Link to="/listaArticulos">
                        <button type="button" className="btn btn-outline-primary">Lista de articulos</button>
                    </Link>

                </div>  

            </nav>
            <nav className={style.pageArticulo}>

                {button.map((prod,id) => (
                        <PageArticulo key={id} id={prod.id} onClose={onClose}/>
                    ))}
            </nav>
        </div>
    )
}