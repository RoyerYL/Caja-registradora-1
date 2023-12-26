import axios from "axios"
import React, { useState, useEffect } from "react"
import style from '../Reportes.module.css'
import { Link } from "react-router-dom"
export default function Reportes() {
    const [productos, setProductos] = useState([])

    useEffect(() => {
        axios("http://localhost:3001/tienda/articuloMasVendidos").then(({ data }) => {
            setProductos(data)
        })
    }, [])

    return (
        <div className={style.masVendidos}>
            {
                productos.map((p) => {

                    return (
                        <div key={p.id}>
                            <Link to={`/detail/${p.id}`}>
                            <p>{p.name}</p>
                            </Link>
                            <p className={style.cantidad}>{p.cantVendidos}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}