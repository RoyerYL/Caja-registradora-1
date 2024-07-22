import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
import { motion } from 'framer-motion';

export default function LandingPage() {
    const [showWarning, setShowWarning] = useState(false);
    const [tooltipState, setTooltipState] = useState({});

    useEffect(() => {
        const storeInfo = localStorage.getItem('storeInfo');
        if (!storeInfo) {
            setShowWarning(true);
        }
    }, []);

    const handleMouseEnter = (key) => {
        setTooltipState(prevState => ({ ...prevState, [key]: true }));
    };

    const handleMouseLeave = (key) => {
        setTooltipState(prevState => ({ ...prevState, [key]: false }));
    };

    const links = [
        { path: './HomePage', label: 'Caja', tooltip: 'Acceso a la caja registradora' },
        { path: '/comprobantes', label: 'Ventas', tooltip: 'Gestión de ventas' },
        { path: '/reportes', label: 'Reportes', tooltip: 'Generación de reportes' },
        { path: '/mercaderia', label: 'Ingreso Mercaderia', tooltip: 'Registro de nueva mercadería' },
        { path: '/operaciones', label: 'Operaciones', tooltip: 'Gestión de operaciones' },
        { path: '/administracion', label: 'Administración', tooltip: 'Acceso a la administración' },
        { path: '/altaArticulo', label: 'Alta de artículo', tooltip: 'Registrar nuevo artículo' },
        { path: '/listaArticulos', label: 'Lista de artículos', tooltip: 'Ver lista de artículos' },
        { path: '/actualizarArticulo', label: 'Actualizar datos', tooltip: 'Actualizar datos de artículos' },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.buttonSection}>
                {links.map(({ path, label, tooltip }, index) => (
                    <div
                        key={index}
                        className={styles.relativeWrapper}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                    >
                        <Link to={path} className={`${styles.button} ${showWarning && label === 'Administración' ? styles.shakeAnimation : ''}`}>
                            <p>{label}</p>
                        </Link>
                        {(showWarning && label === 'Administración') || tooltipState[index] ? (
                            <motion.div
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ type: 'spring', stiffness: 90, repeat: Infinity, repeatType: "reverse" }}
                                className={`${styles.tooltip} ${tooltipState[index] ? styles.show : ''}`}
                            >
                                <p>{tooltip}</p>
                            </motion.div>
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    );
}
