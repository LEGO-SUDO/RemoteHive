import express from 'express'
import { getAllTickets, getTicket, createTicket, updateTicket, archiveTicket,deleteTicket } from '../Controllers/Tickets.js'

const router = express.Router()

// Get All Tickets
router.get('/all', getAllTickets)

// Get One Ticket
router.get('/find/:id',getTicket)

// Create Ticket
router.post('/createticket', createTicket)

// Edit Ticket 
router.put('/updateticket/:id', updateTicket)

// Archive Ticket 
router.put('/archiveticket/:id', archiveTicket)

// Delete Ticket
router.delete('/deleteticket/:id', deleteTicket)

export default router