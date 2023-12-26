const express = require('express');
const router = express.Router()

const {postArticulo} =require('../controller/Articulo/postArticulo');
const { getAllArticulos } = require('../controller/Articulo/getAllArticulo');
const { getArticulo } = require('../controller/Articulo/getArticulo');
const { getArticuloLike } = require('../controller/Articulo/getArticuloLike');
const { updateArticulo } = require('../controller/Articulo/updateArticulo');
const { postCategoria } = require('../controller/Categoria/postCategoria');
const { postProvedor } = require('../controller/Provedor/postProvedor');
const { postCompra } = require('../controller/Compra/postCompra');
const { postTicket } = require('../controller/Ticket/postTicket');
const { getAllCategoria } = require('../controller/Categoria/getAllCategorias');
const { getAllProvedores } = require('../controller/Provedor/getAllProvedores');
const { getAllCompras } = require('../controller/Compra/getAllCompras');
const { getAllTickets } = require('../controller/Ticket/getAllTickets');
const { postCliente } = require('../controller/Cliente/postCliente');
const { getAllClientes } = require('../controller/Cliente/getAllClientes');
const { getCliente } = require('../controller/Cliente/getCliente');
const { getProvedor } = require('../controller/Provedor/getProvedor');
const { getCategoria } = require('../controller/Categoria/getCategoria');
const { getClienteLike } = require('../controller/Cliente/getClienteLike');
const { getTicket } = require('../controller/Ticket/getTicket');
const { getCompras } = require('../controller/Compra/getCompras');
const { actualizarPrecio } = require('../controller/Articulo/acutalizarPrecio');
const { getVendedor } = require('../controller/Vendedor/getVendedor');
const { postVendedor } = require('../controller/Vendedor/postVendedor');
const { getCaja } = require('../controller/Caja/getCaja');
const { postCaja } = require('../controller/Caja/postCaja');
const { cerrarCaja } = require('../controller/Caja/cerrarCaja');
const { getAllVendedors } = require('../controller/Vendedor/getAllVendedor');
const { actualizarCategoria } = require('../controller/Articulo/acutalizarCategoria');
const { actualizarProvedor } = require('../controller/Articulo/acutalizarProvedor');
const { actualizarCostoDolar } = require('../controller/Articulo/acutalizarCostoDolar');
const { actualizarCostoPeso } = require('../controller/Articulo/acutalizarCostoPeso');
const { actualizarGanancia } = require('../controller/Articulo/acutalizarGanancia');
const { actualizarIva } = require('../controller/Articulo/acutalizarIva');
const { actualizarStock } = require('../controller/Articulo/acutalizarStock');
const { actualizarStockMin } = require('../controller/Articulo/acutalizarStockMin');
const { actualizarActivo } = require('../controller/Articulo/acutalizarActivo');
const { getAllCaja } = require('../controller/Caja/getAllCaja');
const { actualizarPrecioPorcentajexCategoria } = require('../controller/Articulo/acutalizarPreciosPorcentajeCategoria');
const { actualizarPorcentajeDolar } = require('../controller/Articulo/acutalizarPorcentajeDolar');
const { actualizarPorcentajePeso } = require('../controller/Articulo/acutalizarPorcentajePeso');
const { postCotizacion } = require('../controller/Cotizacion/postCotizacion');
const { getCotizacion } = require('../controller/Cotizacion/getCotizacion');
const { articuloVendido } = require('../controller/Articulo/articuloVendido');
const { getArticulosMasVendidos } = require('../controller/Articulo/getArticulosMasVendidos');
const { getAllTicketsByClient } = require('../controller/Ticket/getAllTicketsByClient');
const { getVentasCliente } = require('../controller/Cliente/getVentasCliente');
const { getCajaTicket } = require('../controller/Caja/getCajaTicket');
const { updateVendedor } = require('../controller/Vendedor/updateVendedor');
const { deleteVendedor } = require('../controller/Vendedor/deleteVendedor');



router.get('/articulo',getAllArticulos)
router.get('/articuloMasVendidos',getArticulosMasVendidos)
router.get('/articulo/:id',getArticulo)
router.get('/articuloLike/:id',getArticuloLike)

router.post('/articulo',postArticulo)
//Actualizar todo
router.post('/actualizararticulo',updateArticulo)

router.post('/actualizarpreciosporcentajexcategoria',actualizarPrecioPorcentajexCategoria)
router.post('/actualizarPorcentajeDolar',actualizarPorcentajeDolar)
router.post('/actualizarPorcentajePeso',actualizarPorcentajePeso)
//ACTUALIZAR DATOS UNICOS
router.post('/actualizprecio',actualizarPrecio)
router.post('/actualizarCategoria',actualizarCategoria)
router.post('/actualizarProvedor',actualizarProvedor)
router.post('/actualizarCostoDolar',actualizarCostoDolar)
router.post('/actualizarCostoPeso',actualizarCostoPeso)
router.post('/actualizarGanancia',actualizarGanancia)
router.post('/actualizarIva',actualizarIva)
router.post('/actualizarStock',actualizarStock)
router.post('/actualizarStockMin',actualizarStockMin)
router.post('/actualizarActivo',actualizarActivo)

router.post('/articuloVendido',articuloVendido)




router.get('/categoria',getAllCategoria)
router.get('/categoria/:id',getCategoria)
router.post('/categoria',postCategoria)

router.get('/provedor',getAllProvedores)
router.get('/provedor/:id',getProvedor)
router.post('/provedor',postProvedor)

router.get('/compra',getAllCompras)
router.get('/compra/:id',getCompras)
router.post('/compra',postCompra)

router.get('/ticket',getAllTickets)
router.get('/ticketByClient/:id',getAllTicketsByClient)
router.get('/ticket/:id',getTicket)
router.post('/ticket',postTicket)

router.get('/cliente',getAllClientes)
router.get('/ventasCliente/:id',getVentasCliente)
router.get('/cliente/:id',getCliente)
router.get('/clienteLike/:id',getClienteLike)
router.post('/cliente',postCliente)

router.get('/caja',getAllCaja)
router.get('/cajaTicket/:id',getCajaTicket)
router.get('/caja/:id',getCaja)
router.post('/caja',postCaja)
router.post('/cerrarCaja',cerrarCaja)

router.get('/vendedor/:id',getVendedor)
router.get('/vendedor',getAllVendedors)
router.post('/vendedor',postVendedor)
router.post('/updateVendedor',updateVendedor)
router.delete(`/deleteVendedor/:id`,deleteVendedor)

router.get('/cotizacion',getCotizacion)
router.post('/cotizacion',postCotizacion)



module.exports={router}