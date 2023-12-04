import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import AltaArticulo from '../../../AltaArticulo/AltaArticulo'
export default function Detail() {

    /* ESTADO CHARACTER */
    const [infoArticulo, setInfoArticulo] = useState({})
    const { id } = useParams()

    const navigate = useNavigate();

    useEffect(() => {

        axios(`http://localhost:3001/tienda/articulo/${id}`)
            .then(({data})=>{
                if (data.name) {
                    setInfoArticulo(data)
                }
            }).catch((err)=>{console.error(err);})

        return setInfoArticulo({})
    }, [id]);

    /* DETAIL */
    return (
        <>
            <AltaArticulo infoArticulo={infoArticulo} />
        </>

    )
}
