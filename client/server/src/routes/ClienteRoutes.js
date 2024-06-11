const {Router} = require("express");
const router = Router();


const { postCliente,
    getAllClientes,
    getCliente,
    getClienteLike,
    getVentasCliente
} = require('../controller/ClienteController/ClienteController');

router.get('/', getAllClientes);
router.get('/ventasCliente/:id', getVentasCliente);
router.get('/:id', getCliente);
router.get('/clienteLike/:id', getClienteLike);
router.post('/', postCliente);

module.exports = router;
