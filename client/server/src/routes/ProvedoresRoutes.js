const {Router} = require("express");
const router = Router();


const { postProvedor,
     getAllProvedores,
      getProvedor
     } = require('../controller/ProvedorController/ProvedorController');

router.get('/', getAllProvedores);
router.get('/:id', getProvedor);
router.post('/', postProvedor);

module.exports = router;
