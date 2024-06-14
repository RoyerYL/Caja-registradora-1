const {Router} = require("express");
const router = Router();

const {
    postCategoria,
    getAllCategoria,
    getCategoria
} = require('../controller/CategoriaController/CategoriaController');
const { cerrarCaja, getAllCaja, getCaja, getCajaTicket, postCaja } = require("../controller/CajaController/CajaController");

router.get('/', getAllCaja);
router.get('/:id', getCaja);
router.get('/ticket/:id', getCajaTicket);
router.put('/', cerrarCaja);
router.post('/', postCaja);

module.exports = router;
