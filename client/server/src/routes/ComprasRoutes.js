const {Router} = require("express");
const router = Router();

const { postCompra,
     getAllCompras,
      getCompras
     } = require('../controller/CompraController/CompraController');

router.get('/', getAllCompras);
router.get('/:id', getCompras);
router.post('/', postCompra);

module.exports = router;
