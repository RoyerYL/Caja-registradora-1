import React, { useEffect, useState } from 'react';
import style from './Articulo.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { add_art, getAll, get_artLike } from '../../../../redux/action';
import { Link, useParams } from 'react-router-dom';

export default function Articulo(props) {
    const productos = useSelector((state) => state.producto);
    const { addHandler, collapseClick } = props;
    const { id } = useParams();
    const [Articulo, setArticulo] = useState({
        codBarras: "",
        cantidad: 1,
        page: 0
    });

    // Reinicia la entrada de datos
    useEffect(() => {
        setArticulo({
            page: id,
            codBarras: "",
            cantidad: 1
        });
    }, [id, productos]);

    const addFunction = () => {
        props.addHandler(Articulo);
    };

    const handleChangue = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setArticulo({ ...Articulo, [property]: value });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            addHandler(Articulo);
        }
    };

    return (
        <div className={style.containerIngresar}>
            <p>Ingrese un articulo</p>
            <div className={style.coolinput}>
                <label htmlFor="codBarras" className={style.text}>Cod Barras:</label>
                <input
                    type="text"
                    name="codBarras"
                    onChange={handleChangue}
                    onKeyDown={handleKeyDown}
                    className={style.input}
                    value={Articulo.codBarras}
                />
            </div>
            <div className={style.coolinput}>
                <label htmlFor="cantidad" className={style.text}>Cantidad:</label>
                <input
                    id="cantidad"
                    type="text"
                    name="cantidad"
                    onChange={handleChangue}
                    onKeyDown={handleKeyDown}
                    className={style.input}
                    value={Articulo.cantidad}
                />
            </div>
            <button onKeyDown={handleKeyDown} onClick={addFunction}>Agregar</button>
        </div>
    );
}
