const {Router} = require("express");
const router = Router();


const { postCotizacion,
     getCotizacion
     } = require('../controller/CotizacionController/CotizacionController');

router.get('/', getCotizacion);
router.post('/', postCotizacion);

module.exports = router;
