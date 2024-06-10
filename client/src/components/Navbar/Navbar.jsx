import React, { useState } from 'react';
import style from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import PageArticulo from '../Home/components/ListaArticulos/PageArticulo';
import { useDispatch } from 'react-redux';
import { addVenta, cerrarVenta, get_list } from '../../redux/action';

export default function Navbar(props) {
    const { Cotizacion } = props;
    const [id_, setID] = useState(0);
    const dispatch = useDispatch();
    const [button, setButton] = useState([]);
    const navigate = useNavigate();

    const handleClick = () => {
        dispatch(addVenta());
        if (Cotizacion.apertura) {
            setButton([...button, { id: id_ }]);
            setID(id_ + 1);
            dispatch(get_list(id_));
        }
    };

    const onClose = (idFilter) => {
        const newButtons = button.filter((b) => b.id !== idFilter);
        setButton(newButtons);
    };

    const handleLinkClick = (to) => {
        if (Cotizacion.apertura) {
            navigate(to);
        } else {
            alert('No puedes acceder a esta sección sin Cotización activa.');
        }
    };

    const cerar = (id) => {
        dispatch(cerrarVenta(id));
    };

    return (
        <div className={style.container}>
            <nav className={style.navbar}>
                <div className={style.buttonContainer}>
                    <Link to="/comprobantes">
                        <button>Ventas</button>
                    </Link>
                    <Link to="/reportes">
                        <button>Reportes</button>
                    </Link>
                    <Link to="/mercaderia">
                        <button>Ingreso Mercaderia</button>
                    </Link>
                    <Link to="/operaciones">
                        <button>Operaciones</button>
                    </Link>
                    <Link to="/administracion">
                        <button>Administración</button>
                    </Link>
                </div>
            </nav>

            <nav className={style.navbarSecondary}>
                <div className={style.buttonContainer}>
                    <Link to="./HomePage">
                        <button>Caja</button>
                    </Link>
                    <Link onClick={() => handleLinkClick(`/ventana/${id_}`)}>
                        <button onClick={handleClick}>Nuevo</button>
                    </Link>
                    <Link to="/altaArticulo">
                        <button>Alta de artículo</button>
                    </Link>
                    <Link to="/listaArticulos">
                        <button>Lista de artículos</button>
                    </Link>
                    <Link to="/actualizarArticulo">
                        <button>Actualizar datos</button>
                    </Link>
                </div>
            </nav>

            <nav className={style.navbarThird}>
                {button.map((prod, id) => (
                    <PageArticulo handleClick={() => cerar(prod.id)} key={prod.id} id={prod.id} onClose={onClose} />
                ))}
            </nav>
        </div>
    );
}
