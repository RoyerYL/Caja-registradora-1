const {Router} = require("express");
const router = Router();

const {
    postCategoria,
    getAllCategoria,
    getCategoria
} = require('../controller/CategoriaController/CategoriaController');

router.get('/', getAllCategoria);
router.get('/:id', getCategoria);
router.post('/', postCategoria);

module.exports = router;
