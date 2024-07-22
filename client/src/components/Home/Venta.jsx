import React, { useState, useEffect } from 'react';
import style from './Venta.module.css'
import Articulo from './components/Articulo/Articulo';
import ListaArticulos from './components/ListaArticulos/ListaArticulos';
import Cliente from './components/Cliente/Cliente';
import Costo from './Costo';
import Condicion from './Condicion';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ListaArticulosEncontrados from './components/ListaArticulos/ListaArticulosEncontrados';
import { add_art, cerrarButton } from '../../redux/action';
import axios from 'axios';
import getFecha from '../../Utils/getFecha/getFecha';
import Swal from 'sweetalert2';

export default function Navbar() {

    const fecha = getFecha(new Date());
    const dispatch = useDispatch();

    const productos = useSelector((state) => state.producto);
    const listProductos = useSelector((state) => state.listProductos);
    const productoLike = useSelector((state) => state.productoLike);
    const vendedor = useSelector((state) => state.Vendedor);
    const caja = useSelector((state) => state.caja);

    const [productoProp, setProductoProp] = useState([]);
    const [productoLikeProp, setproductoLikeProp] = useState([]);

    const [ticket, setTicket] = useState();
    const [compraRealizada, setCompraRealizada] = useState(0);
    const [filters, setFilter] = useState({
        name: "",
        id: "",
        page: 1,
        pageSize: 50,
        orderBy: 'id',
        orderDirection: ''
    });
    const [costo, setCosto] = useState({
        descuento: 0,
        subTotal: 0.00
    });

    const [clienteForm, setClienteForm] = useState({
        nombre: "default",
        contado: true
    });

    const { id } = useParams();

    useEffect(() => {
        setCompraRealizada(1);
        if (productoLike) {
            return setproductoLikeProp(productoLike);
        }
        setproductoLikeProp(productoLike);
    }, [id, productos, listProductos, productoLike]);

    const addHandler = (Articulo) => {
        const { cantidad, codBarras, page } = Articulo;
        const filter = {
            ...filters,
            id: codBarras
        };
        dispatch(add_art({
            cantidad,
            descuento: costo.descuento,
            filter,
            page
        }));
    };

    const generarRecibo = async () => {
        setCompraRealizada(1);
        try {
            const responseCliente = await axios.get(`http://localhost:3001/tienda/cliente/clienteLike/${clienteForm.nombre}`);
            const cliente = responseCliente.data[0];
            const body = {
                clienteId: cliente.id,
                valorTotal: costo.subTotal * ((100 - costo.descuento) / 100),
                fecha: new Date(),
                vendedorId: vendedor,
                descuento: costo.descuento,
                cajaId: Number(caja)
            };
            if (!clienteForm.contado) {
                body.cajaId = null;
            }
            const responseTicket = await axios.post("http://localhost:3001/tienda/ticket", body);
            const ticketId = responseTicket.data.id;
            setTicket(ticketId);
            await axios.post("http://localhost:3001/tienda/compra", {
                ticketId: ticketId,
                fecha: new Date(),
                articles: productos
            });
            for (const prod of productos.productos) {
                try {
                    await axios.post("http://localhost:3001/tienda/articulo/articuloVendido", {
                        id: prod.producto.id,
                        cantVendidos: prod.cantidad
                    });
                } catch (error) {
                    console.error("Error en el bucle:", error);
                }
            }

            Swal.fire({
                title: 'Compra realizada',
                text: '¿Desea imprimir el recibo?',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'Imprimir',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    imprimirRecibo();
                }
            });
            dispatch(cerrarButton(id))
        } catch (error) {
            console.error("Error al generar el recibo:", error.message);
        }
    };

    const imprimirRecibo = () => {
        const storeInfo = JSON.parse(localStorage.getItem('storeInfo'));
        window.electronAPI.executeTicketCreate(ticket, storeInfo);
    };

    const handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        if (name === "contado") {
            setClienteForm({ ...clienteForm, [name]: !clienteForm.contado });
            return;
        }
        setClienteForm({ ...clienteForm, [name]: value });
    };

    return (
        <div className={style.Home}>
            <div className={style.addArticulo}>
                <Articulo addHandler={addHandler} />
                <Cliente clienteForm={clienteForm} handleChange={handleChange} setClienteForm={setClienteForm} ClienteForm={clienteForm} />
                <Condicion contado={clienteForm.contado} handleChange={handleChange} />
            </div>
            <div className={style.ListArticulo}>
                <div>
                    <span>{fecha}</span>
                    <ListaArticulos />
                    <div className={style.info}>
                        <Costo costo={costo} setCosto={setCosto} />
                    </div>
                </div>
                <button onClick={generarRecibo}>Generar recibo</button>
                <button onClick={imprimirRecibo}>Imprimir recibo</button>
            </div>
            {productoLikeProp.length > 0 && (
                <ListaArticulosEncontrados costo={costo} setCosto={setCosto} productos={productoLikeProp} handleClick={addHandler} />
            )}
        </div>
    );
}
