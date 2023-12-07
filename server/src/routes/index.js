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



router.get('/articulo',getAllArticulos)
router.get('/articulo/:id',getArticulo)
router.get('/articuloLike/:id',getArticuloLike)
router.post('/articulo',postArticulo)
router.post('/actualizararticulo',updateArticulo)


router.get('/categoria',getAllCategoria)
router.post('/categoria',postCategoria)

router.get('/provedor',getAllProvedores)
router.post('/provedor',postProvedor)

router.get('/compra',getAllCompras)
router.post('/compra',postCompra)

router.get('/ticket',getAllTickets)
router.post('/ticket',postTicket)

router.get('/cliente',getAllClientes)
router.post('/cliente',postCliente)




module.exports={router}