import React, { useState } from 'react';
import style from './Venta.module.css'
import Articulo from './components/Articulo/Articulo';
import ListaArticulos from './components/ListaArticulos/ListaArticulos';
import Cliente from './components/Cliente/Cliente';
import Costo from './Costo';
import Condicion from './Condicion';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListaArticulosEncontrados from './components/ListaArticulos/ListaArticulosEncontrados';
import { add_art, getAll } from '../../redux/action';
import axios from 'axios';
import getFecha from '../../Utils/getFecha/getFecha';

export default function Navbar() {
    const [collapse, setCollapse] = useState("collapse")

    const fecha = getFecha(new Date())
    const dispatch = useDispatch()
    const productos = useSelector((state) => state.producto)
    const listProductos = useSelector((state) => state.listProductos)
    const productoLike = useSelector((state) => state.productoLike)
    const vendedor = useSelector((state) => state.Vendedor)
    const caja = useSelector((state) => state.caja)
    const [ticket, setTicket] = useState()
    const [compraRealizada, setCompraRealizada] = useState(0)

    const [costo, setCosto] = useState({
        descuento: 0,
        subTotal: 0.00
    })
    useEffect(() => {
        const cerrar = () => {
            setCollapse("collapse")
        }

        document.addEventListener('click', cerrar)
        return () => {
            document.removeEventListener('click', cerrar)

        }
    }, [])
    const collapseClick = (e) => {
        e.stopPropagation()
        collapse === "collapse" ? setCollapse("collapse.show") : setCollapse("collapse")
        // collapse === "collapse" ? setCollapse("collapse.show") : setCollapse("collapse")
    }

    const [clienteForm, setClienteForm] = useState({
        nombre: "default",
        contado: true
    })

    const [productoProp, setProductoProp] = useState([])
    const [productoLikeProp, setproductoLikeProp] = useState([])

    const { id } = useParams()

    useEffect(() => {
        setCompraRealizada(1)
        if (listProductos[id]) {
            setProductoProp(productos)
        }

        if (productoLike.data) {


            return setproductoLikeProp(productoLike.data)
        } setproductoLikeProp(productoLike)
    }, [id, productos, listProductos, productoLike])

    const addHandler = (Articulo) => {
        const { cantidad, codBarras, page } = Articulo
        if (!codBarras) {
            dispatch(getAll())
            return
        }
        dispatch(add_art({
            cantidad,
            codBarras,
            page
        }))


    }
    const generarRecibo = async () => {
        setCompraRealizada(1)
        try {

            // Buscar el cliente por nombre
            const responseCliente = await axios(`http://localhost:3001/tienda/clienteLike/${clienteForm.nombre}`);
            const cliente = responseCliente.data[0];
            console.log(costo.descuento);
            // Crear un nuevo ticket
            const body = {
                clienteId: cliente.id,
                valorTotal: costo.subTotal,
                fecha: new Date(),
                vendedorId: vendedor,
                descuento: costo.descuento,
                cajaId: Number(caja)
            }
            console.log(body);
            if (!clienteForm.contado) {
                body.cajaId = null
            }
            const responseTicket = await axios.post("http://localhost:3001/tienda/ticket", body);

            const ticketId = responseTicket.data.id;
            setTicket(ticketId)
            // Crear compras para cada producto en la lista
            for (const prod of productos) {
                try {
                    await axios.post("http://localhost:3001/tienda/compra", {
                        ticketId: ticketId,
                        fecha: new Date(),
                        cantidad: prod.cantidad,
                        articuloId: prod.producto.id,
                        subTotal: prod.producto.precioVenta * prod.cantidad,
                    });

                    await axios.post("http://localhost:3001/tienda/articuloVendido", {
                        id: prod.producto.id,
                        cantVendidos: prod.cantidad
                    });
                } catch (error) {
                    console.error("Error en el bucle:", error);
                }
            }

            alert("Compra realizada")
        } catch (error) {
            console.error("Error al generar el recibo:", error.message);
        }
    };

    const imprimirRecibo = () => {
        window.electronAPI.executeTicketCreate(ticket)

    }

    const openNewWindow = () => {
        window.electron.openNewWindow({
            width: 800,
            height: 600,
            // Otras configuraciones si es necesario
        });
    };

    const closeNewWindow = () => {
        const openWindows = window.electron.getOpenWindows(); // Asumiendo que hay una función getOpenWindows en el preload.js
        if (openWindows.length > 0) {
            window.electron.closeWindow(openWindows[0]); // Cerrar la primera ventana abierta
        }
    };

    const handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name

        if (name === "contado") {
            setClienteForm({ ...clienteForm, [name]: !clienteForm.contado });//cambio Form..
            return ""
        }
        setClienteForm({ ...clienteForm, [name]: value })
    }

    return (
        <div className={style.Home}>
            <span>{fecha}</span>
            <div className={style.registrarCompra}>
                <div className={style.addArticulo}>

                    <Articulo addHandler={addHandler} collapseClick={collapseClick} />

                    <div className={style.cliente}>

                        <Cliente clienteForm={clienteForm} handleChange={handleChange} setClienteForm={setClienteForm} ClienteForm={clienteForm} />
                    </div>

                </div>
                <div className={style.ListArticulo}>
                    <div>
                        <ListaArticulos productos={productoProp} />
                        <div className={style.info}>


                            <Condicion />

                            <div className={style.contado}>
                                <div>

                                    <p>Contado</p>
                                    <input type="checkbox" name='contado' checked={clienteForm.contado} onChange={handleChange} />
                                </div>
                                <div>

                                    <p>Cuenta Corriente</p>
                                    <input type="checkbox" name='contado' checked={!clienteForm.contado} onChange={handleChange} />
                                </div>
                            </div>
                            <Costo costo={costo} setCosto={setCosto} />

                        </div>

                    </div>
                    <button onClick={generarRecibo}>Generar recibo</button>
                    
                    <button onClick={imprimirRecibo}>Imprimir recibo</button>
                </div>

                {productoLikeProp.length > 0 &&
                    <ListaArticulosEncontrados productos={productoLikeProp} />}
            </div>
            <div >

            </div>
        </div>
    )
}