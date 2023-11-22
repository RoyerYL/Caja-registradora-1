const express = require('express');
const router = express.Router()

const {postArticulo} =require('../controller/postArticulo');
const { getAllArticulos } = require('../controller/getAllArticulo');
const { getArticulo } = require('../controller/getArticulo');

router.post('/articulo',postArticulo)
router.get('/articulo',getAllArticulos)
router.get('/articulo/:id',getArticulo)


module.exports={router}