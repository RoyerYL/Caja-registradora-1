import React, { useEffect, useState } from 'react';
import style from './Articulo.module.css'
import { useDispatch } from 'react-redux';
import { add_fav, get } from '../../../../redux/action';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

export default function Articulo() {


    const producto = useSelector((state) => state.producto);


    const dispatch = useDispatch()
    const { id } = useParams()

    const [id_, setId] = useState(1)
    const [Articulo, setArticulo] = useState({
        id: 0,
        codBarras: "",
        cantidad: 1,
        page: 0
    })
    useEffect(() => {
        setArticulo({
            id: id_,
            page: id,
            codBarras: "",
            cantidad: 1
        })
    }, [id])

    const addHandler = () => {
        dispatch(add_fav(Articulo))
        setId(id_ + 1)
        setArticulo({
            id: id_,
            page: id,
            codBarras: "",
            cantidad: 1
        })
        dispatch(get(id))

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

        <div>
            <div className={`${"input-group mb-3"} `}>
                <div>
                    <select className={`${"form-select"} ${style.busqueda}`} aria-label="Default select example" defaultValue="default">
                        <option value="default">Cod Barras</option>
                        <option value="1">Nombre</option>
                    </select>
                </div>
                <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" name='codBarras' onChange={handleChangue} onKeyDown={handleKeyDown} value={Articulo.codBarras} />
            </div>
            <div className={`${"input-group mb-3"} `}>
                <div>
                    <select className={`${"form-select"} ${style.busqueda}`} aria-label="Default select example" defaultValue="default">
                        <option value="default">Unidades</option>
                    </select>
                </div>
                <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" name='cantidad' onChange={handleChangue} onKeyDown={handleKeyDown} value={Articulo.cantidad} />
                <Link to={`/home/${id}`}>
                <button type="button" className="btn btn-success" onClick={addHandler}>➕ Cantidad</button>
                </Link>
            </div>
        </div>



    )
}