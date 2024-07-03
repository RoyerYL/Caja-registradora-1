const {Router} = require("express");
const router = Router();


const { postTicket,
      getTicket,
        cancelarTicket,
        getVentasPorCategoria,
        getTickets
     } = require('../controller/TicketController/TicketController');

router.get('/', getTickets);
router.get('/ticketByCategory/', getVentasPorCategoria);
router.get('/:id', getTicket);
router.post('/', postTicket);
router.post('/cancelarTicket/:id', cancelarTicket);

module.exports = router;
