const {Router} = require("express");
const router = Router();


const { postTicket,
     getAllTickets,
      getTicket,
       getAllTicketsByClient,
        cancelarTicket,
        getAllTicketsByVendedor,
        getVentasPorCategoria
     } = require('../controller/TicketController/TicketController');

router.get('/', getAllTickets);
router.get('/ticketByClient/:id', getAllTicketsByClient);
router.get('/ticketByVendedor/:id', getAllTicketsByVendedor);
router.get('/ticketByCategory/', getVentasPorCategoria);
router.get('/:id', getTicket);
router.post('/', postTicket);
router.post('/cancelarTicket/:id', cancelarTicket);

module.exports = router;
