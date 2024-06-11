const {Router} = require("express");
const router = Router();

const { postArticulo,
    getAllArticulos,
    getArticulo,
    getArticuloLike,
    updateArticulo,
    actualizarPrecio,
    actualizarCategoria,
    actualizarProvedor,
    actualizarCostoDolar,
    actualizarCostoPeso,
    actualizarGanancia,
    actualizarIva,
    actualizarStock,
    actualizarStockMin,
    actualizarActivo,
    actualizarPrecioPorcentajexCategoria,
    actualizarPorcentajeDolar,
    actualizarPorcentajePeso,
    articuloVendido,
    getArticulosMasVendidos,
    addStock,
    calcularPrecioVentaPorDolar,
    precioEnDolares,
    actualizprecioPorcentaje,
    getArticuloByCategoria
} = require('../controller/ArticuloController/ArticuloController');

router.get('/', getAllArticulos);
router.get('/articuloCategoria', getArticuloByCategoria);
router.get('/articuloMasVendidos', getArticulosMasVendidos);
router.get('/:id', getArticulo);
router.get('/articuloLike/:id', getArticuloLike);

router.post('/articulo', postArticulo);
router.post('/actualizararticulo', updateArticulo);
router.post('/actualizarpreciosporcentajexcategoria', actualizarPrecioPorcentajexCategoria);
router.post('/actualizarPorcentajeDolar', actualizarPorcentajeDolar);
router.post('/actualizarPorcentajePeso', actualizarPorcentajePeso);
router.post('/actualizprecioPorcentaje', actualizprecioPorcentaje);
router.post('/actualizprecio', actualizarPrecio);
router.post('/actualizarCategoria', actualizarCategoria);
router.post('/actualizarProvedor', actualizarProvedor);
router.post('/actualizarCostoDolar', actualizarCostoDolar);
router.post('/actualizarCostoPeso', actualizarCostoPeso);
router.post('/actualizarGanancia', actualizarGanancia);
router.post('/actualizarIva', actualizarIva);
router.post('/actualizarStock', actualizarStock);
router.post('/aumentarStock', addStock);
router.post('/actualizarStockMin', actualizarStockMin);
router.post('/actualizarActivo', actualizarActivo);
router.post('/actualizarPrecioEnDolares', precioEnDolares);
router.post('/articuloVendido', articuloVendido);
router.post('/calcularPrecioVentaPorDolar', calcularPrecioVentaPorDolar);

module.exports = router;
