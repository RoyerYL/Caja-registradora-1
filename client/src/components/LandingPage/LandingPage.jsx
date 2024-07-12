import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

export default function LandingPage() {
    return (
        <div className={styles.container}>
            <div className={styles.buttonSection}>
                <Link to="./HomePage" className={styles.button}>
                    <p>Caja</p>
                </Link>
                <Link to="/comprobantes" className={styles.button}>
                    <p>Ventas</p>
                </Link>
                <Link to="/reportes" className={styles.button}>
                    <p>Reportes</p>
                </Link>
                <Link to="/mercaderia" className={styles.button}>
                    <p>Ingreso Mercaderia</p>
                </Link>
                <Link to="/operaciones" className={styles.button}>
                    <p>Operaciones</p>
                </Link>
                <Link to="/administracion" className={styles.button}>
                    <p>Administración</p>
                </Link>
                <Link to="/altaArticulo" className={styles.button}>
                    <p>Alta de artículo</p>
                </Link>
                <Link to="/listaArticulos" className={styles.button}>
                    <p>Lista de artículos</p>
                </Link>
                <Link to="/actualizarArticulo" className={styles.button}>
                    <p>Actualizar datos</p>
                </Link>
            </div>
        </div>
    );
}
