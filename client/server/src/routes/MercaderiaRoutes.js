const {Router} = require("express");
const router = Router();

const { postMercaderia,
     getMercaderia
     } = require('../controller/MercaderiaController/MercaderiaController');

router.get('/', getMercaderia);
router.post('/', postMercaderia);

module.exports = router;
