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

export default function Navbar() {
    const [collapse, setCollapse] = useState("collapse")
    const fecha = new Date().toString()
    const dispatch = useDispatch()
    const productos = useSelector((state) => state.producto)
    const listProductos = useSelector((state) => state.listProductos)
    const productoLike = useSelector((state) => state.productoLike)
    
    const [costo,setCosto]=useState({
        subTotal:0.00
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
        nombre: "Default",
        dni: "000000"
    })

    const [productoProp, setProductoProp] = useState([])
    const [productoLikeProp, setproductoLikeProp] = useState([])

    const { id } = useParams()

    useEffect(() => {
        if (listProductos[id]) {
            setProductoProp(productos)
        }

        if (productoLike.data) {


            return setproductoLikeProp(productoLike.data)
        } setproductoLikeProp(productoLike)
    }, [id, productos, listProductos, productoLike])

    const addHandler = (Articulo) => {
        const { cantidad, codBarras, page } = Articulo
        console.log(codBarras);
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
        try {
            // Buscar el cliente por nombre
            const responseCliente = await axios(`http://localhost:3001/tienda/clienteLike/${clienteForm.nombre}`);
            const cliente = responseCliente.data[0];
    
            // Crear un nuevo ticket
            const responseTicket = await axios.post("http://localhost:3001/tienda/ticket", {
                clienteId: cliente.id,
                valorTotal: costo.subTotal,
                fecha: fecha,
            });
    
            const ticketId = responseTicket.data.id;
    
            // Crear compras para cada producto en la lista
            for (const prod of productos) {
                await axios.post("http://localhost:3001/tienda/compra", {
                    ticketId: ticketId,
                    fecha: fecha,
                    cantidad: prod.cantidad,
                    articuloId: prod.producto.id,
                });
            }
    
            alert("Compra realizada")
        } catch (error) {
            console.error("Error al generar el recibo:", error.message);
        }
    };

    const handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name

        setClienteForm({ ...clienteForm, [name]: value })
    }

    return (
        <div className={style.Home}>
            <span className="input-group-text">{fecha}</span>
            <div className={style.registrarCompra}>
                <div className={style.addArticulo}>
                    <div className={style.Articulo}>
                        <h5>Ingrese un articulo</h5>
                        <Articulo addHandler={addHandler} collapseClick={collapseClick} />

                    </div>
                    <div>

                        <ListaArticulosEncontrados productos={productoLikeProp} />
                    </div>
                    <div className={style.cliente}>
                        <h5>Cliente</h5>
                        <Cliente clienteForm={clienteForm} handleChange={handleChange} setClienteForm={setClienteForm} ClienteForm={clienteForm} />
                    </div>

                </div>
                <div className={style.ListArticulo}>
                    <div>
                        <ListaArticulos productos={productoProp} />
                        <div className={style.info}>
                            <Condicion />
                            <Costo costo={costo} setCosto={setCosto}/>

                        </div>

                    </div>
                    <button type="button" className="btn btn-success" onClick={generarRecibo}>Generar recibo</button>
                </div>
            </div>
            <div >

            </div>
        </div>
    )
}