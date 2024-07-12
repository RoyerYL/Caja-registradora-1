import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageArticulo from '../Home/components/ListaArticulos/PageArticulo';
import { useDispatch } from 'react-redux';
import { addVenta, cerrarVenta, get_list } from '../../redux/action';
import styles from './Navbar.module.css';
import Swal from 'sweetalert2';
import { FaBeer, FaCoffee } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { MdHome } from 'react-icons/md';
import { FiHome } from 'react-icons/fi';
import { IoHome } from 'react-icons/io5';
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
            Swal.fire({
                icon: 'error',
                title: 'Caja cerrada',
                text: 'No puedes acceder a esta sección sin una caja activa. \n --Ingrese total de caja antes de la apertura e inicie la caja',
            });
        }
    };

    const cerar = (id) => {
        dispatch(cerrarVenta(id));
    };

    return (
        <div className={styles.navContainer}>
            {/* <nav className={styles.navSection}>
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
            </nav> */}

            <nav className={styles.navSection}>
                <Link to="/">
                    <p><FiHome size={17} /></p>
                </Link>
                <Link onClick={() => handleLinkClick(`/ventana/${id_}`)}>
                    <p onClick={handleClick}>Nuevo</p>
                </Link>
                <Link to="/listaArticulos">
                    <p>Lista de artículos</p>
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
