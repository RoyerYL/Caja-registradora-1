import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './Comprobante.module.css';
import { Link, useLocation, useParams } from 'react-router-dom';

export default function DetailComprobante(props) {
    const { actualizar, setActualizar } = props;
    const [compras, setAllCompras] = useState();
    const { id, desc } = useParams();
    let location = useLocation();

    const [total, setTotal] = useState(5);
    useEffect(() => {
        axios(`http://localhost:3001/tienda/compra/${id}`).then(({ data }) => {
            console.log(data[0]);
            setAllCompras(data[0]);
            const calculateTotal = (compras) => {
                // if (!compras.articles) return 0;
                console.log(compras.articles);
                return compras.articles.reduce((acc, prod) => acc + prod.cantidad * prod.producto.precioVenta, 0);
            };

            setTotal(calculateTotal(data[0]))
        });
    }, [id, actualizar]);

    const cancelarTicket = async () => {
        await axios.post(`http://localhost:3001/tienda/ticket/cancelarTicket/${id}`);
        setActualizar(actualizar + 1);
    };

    const imprimirRecibo = () => {
        window.electronAPI.executeTicketCreate(id);
    };


    return (
        <>
            <div className={style.DetailComprobante}>
                <div className={style.header}>
                    <p className={style.id}>N°{String(id).padStart(12, '0')}</p>
                    <div>
                        <button onClick={imprimirRecibo}>Imprimir ticket</button>
                        <button onClick={cancelarTicket}>Cancelar ticket</button>
                    </div>
                </div>
                <div className={style.indice}>
                    <p>Cod Barras</p>
                    <p className={style.nameIndice}>Nombre</p>
                    <p>SubTotal</p>
                    <p>Cantidad</p>
                    <p className={style.totalIndice}>Total</p>
                </div>
                <div className={style.listaArticulos}>
                    {compras?.articles && compras.articles.map((prod, index) => (
                        <Link key={index} to={`/detail/${prod.producto.id}`}>
                            <div className={style.articulos} key={index}>
                                <p className={style.codBarras}>{prod.producto.id}</p>
                                <p className={style.nombre}>{prod.producto.name}</p>
                                <p className={style.precio}>${prod.producto.precioVenta}</p>
                                <p className={style.cantidad}>x{prod.cantidad}</p>
                                <p className={style.precio}>${prod.cantidad * prod.producto.precioVenta}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className={style.total}>
                    <span>SubTotal: ${Number.parseFloat(total).toFixed(2)}</span>

                    <span className={style.descuento}>{`Descuento: ${compras?.Ticket.descuento}%`}</span>

                    <span>Total: ${Number.parseFloat(total * ((100 - 0) / 100)).toFixed(2) || 0}</span>
                </div>
            </div>
        </>
    );
}
