const express = require('express');
const router = express.Router()

const {postArticulo} =require('../controller/postArticulo');
const { getAllArticulos } = require('../controller/getAllArticulo');
const { getArticulo } = require('../controller/getArticulo');
const { getArticuloLike } = require('../controller/getArticuloLike');
const { updateArticulo } = require('../controller/updateArticulo');

router.post('/articulo',postArticulo)
router.post('/actualizararticulo',updateArticulo)
router.get('/articulo',getAllArticulos)
router.get('/articulo/:id',getArticulo)
router.get('/articuloLike/:id',getArticuloLike)


module.exports={router}