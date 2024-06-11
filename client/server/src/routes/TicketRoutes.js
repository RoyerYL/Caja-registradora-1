const {Router} = require("express");
const router = Router();


const { postTicket,
     getAllTickets,
      getTicket,
       getAllTicketsByClient,
        cancelarTicket
     } = require('../controller/TicketController/TicketController');

router.get('/', getAllTickets);
router.get('/ticketByClient/:id', getAllTicketsByClient);
router.get('/:id', getTicket);
router.post('/', postTicket);
router.post('/cancelarTicket/:id', cancelarTicket);

module.exports = router;
