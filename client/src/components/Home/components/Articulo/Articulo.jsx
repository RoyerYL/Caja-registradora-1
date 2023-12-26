import React, { useEffect, useState } from 'react';
import style from './Articulo.module.css'
import { useDispatch } from 'react-redux';
import { add_art, getAll, get_artLike } from '../../../../redux/action';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

export default function Articulo(props) {
    const { addHandler, collapseClick } = props
    const { id } = useParams()
    const [Articulo, setArticulo] = useState({
        codBarras: "",
        cantidad: 1,
        page: 0
    })

    //reinicia la entrada de datos
    useEffect(() => {
        setArticulo({
            page: id,
            codBarras: "",
            cantidad: 1
        })
    }, [id])

    const addFunction = () => {
        props.addHandler(Articulo)
        setArticulo({
            page: id,
            codBarras: "",
            cantidad: 1
        })
    }

    const handleChangue = (event) => {
        const property = event.target.name
        const value = event.target.value

        setArticulo({ ...Articulo, [property]: value })
    }

    const handleKeyDown = (event) => {
        // Verifica si la tecla presionada es 'Enter' (código 13)
        if (event.key === 'Enter') {
            addHandler();
        }
    };

    return (
        <div className={style.containerIngresar}>  
            <p>Ingrese un articulo</p>
            <div>
                <div className="coolinput">
                    <label htmlFor="input" className="text">Cod Barras:</label>
                    <input type="text" name="codBarras" onChange={handleChangue} onKeyDown={handleKeyDown} className="input" value={Articulo.codBarras} />
                </div>
            </div>
            <div >
                <div className="coolinput">
                    <label htmlFor="input" className="text">Cantidad:</label>
                    <input id='cantidad' onClick={(event) => { event.target.value = "" }} type="text" name='cantidad' onChange={handleChangue} onKeyDown={handleKeyDown} className="input" value={Articulo.cantidad} />
                </div>

            </div>

            <button onClick={addFunction}>Agregar</button>
        </div>
    )
}