const {Router} = require("express");
const router = Router();

const articulosRoutes = require('./ArticulosRoutes');
const categoriaRoutes = require('./CategoriaRoutes');
const provedoresRoutes = require('./ProvedoresRoutes');
const comprasRoutes = require('./ComprasRoutes');
const ticketRoutes = require('./TicketRoutes');
const clienteRoutes = require('./ClienteRoutes');
const vendedorRoutes = require('./VendedorRoutes');
const cotizacionRoutes = require('./CotizacionRoutes'); 
const mercaderiaRoutes = require('./MercaderiaRoutes');

router.use('/articulos', articulosRoutes);
router.use('/categoria', categoriaRoutes);
router.use('/provedores', provedoresRoutes);
router.use('/compras', comprasRoutes);
router.use('/ticket', ticketRoutes);
router.use('/cliente', clienteRoutes);
router.use('/vendedor', vendedorRoutes);
router.use('/cotizacion', cotizacionRoutes);
router.use('/mercaderia', mercaderiaRoutes);

module.exports = router;
