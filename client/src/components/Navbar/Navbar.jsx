import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PageArticulo from '../Home/components/ListaArticulos/PageArticulo';
import { useDispatch, useSelector } from 'react-redux';
import { addButton, addVenta, cerrarVenta, get_list, removeButton } from '../../redux/action';
import styles from './Navbar.module.css';
import Swal from 'sweetalert2';
import { FiHome } from 'react-icons/fi';

export default function Navbar(props) {
    const { Cotizacion } = props;
    const dispatch = useDispatch();
    const ventas = useSelector((state) => state.listLength);
    const buttons = useSelector((state) => state.buttons);
    const [id_, setID] = useState(buttons?.length > 0 ? buttons[buttons.length - 1].id + 1 : 0);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleClick = () => {
        dispatch(addVenta());
        if (Cotizacion.apertura) {
            const newButton = { id: id_ , open:true};
            dispatch(addButton(newButton));
            setID(id_ + 1);
            dispatch(get_list(id_));
        }
    };

    const onClose = (idFilter) => {
        dispatch(removeButton(idFilter));
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

    const cerrar = (id) => {
        dispatch(cerrarVenta(id));
    };

    const isVentanaPath = pathname.startsWith('/ventana/') || pathname === "/HomePage";

    return (
        <div className={styles.navContainer}>
            <nav className={styles.navSection}>
                <Link to="/">
                    <p><FiHome size={17} /></p>
                </Link>
                {isVentanaPath && (
                    <>
                        <Link onClick={() => handleLinkClick(`/ventana/${id_}`)}>
                            <p onClick={handleClick}>Nuevo</p>
                        </Link>
                        <Link to="/listaArticulos">
                            <p>Lista de artículos</p>
                        </Link>
                        <Link to="/clientes">
                            <p>Clientes</p>
                        </Link>
                    </>
                )}
            </nav>
            <nav className={styles.navSection}>
                {buttons.map((button,key) => (
                    <PageArticulo
                        handleClick={() => cerrar(button.id)}
                        key={key}
                        id={button.id}
                        open={button.open}
                        onClose={onClose}
                    />
                ))}
            </nav>
        </div>
    );
}
