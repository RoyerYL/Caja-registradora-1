import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './TicketView.module.css';
import { useParams } from 'react-router-dom';

export default function TicketView() {
    const [ticketData, setTicketData] = useState({});
    const [compra, setCompra] = useState(null);
    const [total, setTotal] = useState(0);

    const [storeInfo, setStoreInfo] = useState({
        name: 'Mequitex',
        address: 'av. fernandez de la cruz 3269',
        city: 'villa soldati',
        whatsapp: '115524-3993',
        cuit: '',
        iva: 'iva responsable inscripto'
    });

    useEffect(() => {
        const fetchTicketData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3001/tienda/ticket/4`);
                console.log(data);
                setTicketData(data);
                setCompra(data.Compras[0]);
            } catch (error) {
                console.error('Error fetching ticket data:', error);
            }
        };

        fetchTicketData();
    }, []);

    useEffect(() => {
        if (compra) {
            const totalCompra = compra.articles.reduce((acc, prod) => acc + prod.cantidad * prod.producto.precioVenta, 0);
            setTotal(totalCompra);
        }
    }, [compra]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStoreInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí podrías enviar la información actualizada al backend si es necesario
        console.log('Store Info Updated:', storeInfo);
    };

    return (
        <div className={style.ticketContainer}>
            <div className={style.header}>
                <p className={style.title}>Ticket</p>
                <p className={style.ticketId}>N° {String(ticketData.id).padStart(12, '0')}</p>
                <p className={style.date}>Fecha: {ticketData.fecha}</p>
            </div>
            <form className={style.storeInfo} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={storeInfo.name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="address"
                    value={storeInfo.address}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="city"
                    value={storeInfo.city}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="whatsapp"
                    value={storeInfo.whatsapp}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="cuit"
                    value={storeInfo.cuit}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="iva"
                    value={storeInfo.iva}
                    onChange={handleChange}
                />
                <button type="submit">Guardar</button>
            </form>
            <div className={style.itemsHeader}>
                <p>Producto</p>
                <p>Cantidad</p>
                <p>Precio</p>
                <p>Total</p>
            </div>
            {compra && compra.articles.map((item, index) => (
                <div key={index} className={style.item}>
                    <p>{item.producto.name}</p>
                    <p>{item.cantidad}</p>
                    <p>${Number(item.producto.precioVenta).toFixed(2)}</p>
                    <p>${(item.cantidad * item.producto.precioVenta).toFixed(2)}</p>
                </div>
            ))}
            <div className={style.summary}>
                <p className={style.total}>Total: ${Number.parseFloat(total).toFixed(2)}</p>
                <p>Rec: $0.00</p>
                <p>Desc: $0.00</p>
                <p className={style.total}>Total: ${Number.parseFloat(total).toFixed(2)}</p>
            </div>
            <div className={style.footer}>
                <p>¡Gracias por tu compra!</p>
            </div>
        </div>
    );
}
