import express from 'express';
import { getAllTickets, getTicket, createTicket, updateTicket, archiveTicket, deleteTicket } from '../Controllers/Tickets.js';
const router = express.Router();
// Get All Tickets
router.get('/all', getAllTickets);
// Get Tickets by status
router.get('/find/:status', getTicket);
// Create Ticket
router.post('/createticket', createTicket);
// Edit Ticket 
router.put('/update/:id', updateTicket);
// Archive Ticket 
router.put('/archive/:id', archiveTicket);
// Delete Ticket
router.delete('/delete/:id', deleteTicket);
export default router;
//# sourceMappingURL=tickets.js.map