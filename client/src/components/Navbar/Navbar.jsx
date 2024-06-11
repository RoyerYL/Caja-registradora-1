import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageArticulo from '../Home/components/ListaArticulos/PageArticulo';
import { useDispatch } from 'react-redux';
import { addVenta, cerrarVenta, get_list } from '../../redux/action';
import styles from './Navbar.module.css';

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
        <div className={styles.navContainer}>
            <nav className={styles.navSection}>
                <Link to="./HomePage">
                    <p>Caja</p>
                </Link>
                <Link to="/comprobantes">
                    <p>Ventas</p>
                </Link>
                <Link to="/reportes">
                    <p>Reportes</p>
                </Link>
                <Link to="/mercaderia">
                    <p>Ingreso Mercaderia</p>
                </Link>
                <Link to="/operaciones">
                    <p>Operaciones</p>
                </Link>
                <Link to="/administracion">
                    <p>Administración</p>
                </Link>
            </nav>

            <nav className={styles.navSection}>

                <Link onClick={() => handleLinkClick(`/ventana/${id_}`)}>
                    <p onClick={handleClick}>Nuevo</p>
                </Link>
                <Link to="/altaArticulo">
                    <p>Alta de artículo</p>
                </Link>
                <Link to="/listaArticulos">
                    <p>Lista de artículos</p>
                </Link>
                <Link to="/actualizarArticulo">
                    <p>Actualizar datos</p>
                </Link>
            </nav>

            <nav className={styles.navSection}>
                {button.map((prod, id) => (
                    <PageArticulo handleClick={() => cerar(prod.id)} key={prod.id} id={prod.id} onClose={onClose} />
                ))}
            </nav>
        </div>
    );
}
