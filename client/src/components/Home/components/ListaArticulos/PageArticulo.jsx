import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAll, get_list } from '../../../../redux/action';
import style from "./PageArticulo.module.css"
export default function PageArticulo(props) {
    const { id, onClose } = props
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(get_list(id))
    }

    return (
        <>
            <div className={style.container}>

                <Link to={`/ventana/${id}`}>
                    <button onClick={handleClick}>Nuevo {id}</button>
                </Link>

                <button  className={`${style.close}`} onClick={()=>{onClose(id)}} >X</button>

            </div>
        </>
    )

}