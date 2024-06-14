import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "../Reportes.module.css";

export default function MasVendidos() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        axios("http://localhost:3001/tienda/articulo/articuloMasVendidos").then(({ data }) => {
            setProductos(data);
        });
    }, []);

    return (
        <div className={style.productList}>
            {productos.map((p) => (
                <Link to={`/detail/${p.id}`} className={style.productLink}>
                    <div key={p.id} className={style.productCard}>
                        <p className={style.productName}>{p.name}</p>
                        <p className={style.productQuantity}>Cantidad Vendidos: {p.cantVendidos}</p>
                        <p className={style.productPrice}>Precio: ${p.precioVenta}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
