import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAll, get_list } from '../../../../redux/action';
import style from "./PageArticulo.module.css"
export default function PageArticulo(props) {
    const { id, onClose } = props
    const producto = useSelector((state) => state.producto);
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(get_list(id))
    }

    return (
        <>
            <div className={style.container}>
                <Link to={`/ventana/${id}`}>
                    <button type="button" className="btn btn-outline-primary" onClick={handleClick}>Nuevo {id}</button>
                </Link>
                <button type="button" className={`${"btn-close "}${style.close}`} onClick={()=>{onClose(id)}} aria-label="Close"></button>
            </div>
        </>
    )

}