import React, { useState } from 'react';
import style from './Navbar.module.css'
import { Link,useNavigate  } from 'react-router-dom';
import PageArticulo from '../Home/components/ListaArticulos/PageArticulo';
import { useDispatch } from 'react-redux';
import { get_list } from '../../redux/action';

export default function Navbar(props) {

    const {Cotizacion}=props
    const [id_, setID] = useState(0)
    const dispatch = useDispatch()
    const [button, setButton] = useState([])
    const navigate = useNavigate();
    const handleClick = () => {
        if(Cotizacion.apertura){

            setButton([...button, { id: id_ }])
            setID(id_ + 1)
            dispatch(get_list(id_))
        }
            
    }
    const onClose = (idFilter) => {
        const newButtons = button.filter((b) => b.id !== idFilter)
        setButton(newButtons)
    }

    const handleLinkClick = (to) => {
        if (Cotizacion.apertura) {
            // Si Cotizacion es true, navega al Link
            navigate(to);
        } else {
            // Si Cotizacion es false, muestra un mensaje de aviso
            alert('No puedes acceder a esta sección sin Cotización activa.');
        }
    };
    return (
        <div className={style.Navbar}>


            <nav >
                <div >
                <Link to="/comprobantes">
                        <button >Ventas</button>
                    </Link>
                    <Link to="/reportes">
                        <button >Reportes</button>
                    </Link>
                    {/* <Link to="/provedor">
                        <button >Articulos</button>
                    </Link> */}
                    <Link to="/mercaderia">
                        <button >Ingreso Mercaderia</button>
                    </Link>

                    <Link to="/operaciones">
                        <button>Operaciones</button>
                    </Link>
                    <button>Administracón</button>
                </div>
            </nav>


            <nav className="navbar">
                <div >
                    <Link to="./">
                        <button >Caja</button>
                    </Link>
                    <Link onClick={() => handleLinkClick(`/ventana/${id_}`)}>
                        <button onClick={handleClick}>Nuevo</button>
                    </Link>



                    <Link to="/altaArticulo">
                        <button >Alta de articulo</button>
                    </Link>
                    {/* <Link to="/ventana">
                        <button >Comprobantes</button>
                    </Link> */}
                    <Link to="/listaArticulos">
                        <button >Lista de articulos</button>
                    </Link>
                    <Link to="/actualizarArticulo">
                        <button >Actualizar datos</button>
                    </Link>

                </div>

            </nav>
            <nav className={style.pageArticulo}>

                {button.map((prod, id) => (
                    <PageArticulo key={id} id={prod.id} onClose={onClose} />
                ))}
            </nav>
        </div>
    )
}