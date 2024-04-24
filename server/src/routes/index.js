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
const { getArticuloByCategoria } = require('../controller/Articulo/getArticuloByCategoria');



router.get('/articulo',getAllArticulos)
router.get('/articulo/:id',getArticulo)
router.get('/acate',getArticuloByCategoria)
router.get('/articuloLike/:id',getArticuloLike)
router.post('/articulo',postArticulo)
router.post('/actualizararticulo',updateArticulo)


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
router.get('/ticket/:id',getTicket)
router.post('/ticket',postTicket)

router.get('/cliente',getAllClientes)
router.get('/cliente/:id',getCliente)
router.get('/clienteLike/:id',getClienteLike)
router.post('/cliente',postCliente)




module.exports={router}