const {Router} = require("express");
const router = Router();


const { postVendedor,
    getAllVendedors,
    getVendedor,
    updateVendedor,
    deleteVendedor
} = require('../controller/VendedorController/VendedorController');

router.get('/', getAllVendedors);
router.get('/:id', getVendedor);
router.post('/', postVendedor);
router.post('/updateVendedor', updateVendedor);
router.delete('/deleteVendedor/:id', deleteVendedor);

module.exports = router;
