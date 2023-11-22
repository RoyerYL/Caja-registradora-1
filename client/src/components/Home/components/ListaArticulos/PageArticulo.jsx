import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAll } from '../../../../redux/action';

export default function PageArticulo(props) {
    const {id}=props
    const producto=useSelector((state)=>state.producto);
    const dispatch=useDispatch()
    const handleClick=()=>{
        dispatch(getAll(id))
    }

    return (
        <>
        <Link to={`/home/${id}`}>
            <button type="button" className="btn btn-outline-primary" onClick={handleClick}>Nuevo {id}</button>
        </Link>
        </>
    )

}