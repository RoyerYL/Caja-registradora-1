const express = require('express');
const router = express.Router()

const {postArticulo} =require('../controller/postArticulo');
const { getAllArticulos } = require('../controller/getAllArticulo');
const { getArticulo } = require('../controller/getArticulo');
const { getArticuloLike } = require('../controller/getArticuloLike');

router.post('/articulo',postArticulo)
router.get('/articulo',getAllArticulos)
router.get('/articulo/:id',getArticulo)
router.get('/articuloLike/:id',getArticuloLike)


module.exports={router}