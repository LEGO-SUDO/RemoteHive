import pool from '../db/ticketdb.js'



//get all tickets
export const getAllTickets = async (req,res) =>{
try {
    const result = await pool.query('SELECT * FROM ticket_schema.kanban_tasks');
    const tickets = result.rows;
    res.status(200).json(tickets);
  } catch (error) {
    console.error(`Error retrieving tickets: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
}

//get tickets by status
export const getTicket = async (req,res) => {
  const { status } = req.params;

  try {
    const query = {
      text: 'SELECT * FROM ticket_schema.kanban_tasks WHERE status = $1 LIMIT 10',
      values: [status],
    };

    const result = await pool.query(query);
    const ticket = result.rows[0];

    if (ticket) {
      res.status(200).json(ticket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    console.error(`Error retrieving ticket by status: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }

}

//create new ticket 
export const createTicket = async (req, res) => {
  const { title, description, status, column_id, due_date, labels, position, team_id } = req.body;

  const insertTaskQuery = `
    INSERT INTO ticket_schema.kanban_tasks (title, description, status, column_id, due_date, labels, position, team_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING task_id;`;

  const values = [title, description, status, column_id, due_date, labels, position, team_id];

  try {
    const result = await pool.query(insertTaskQuery, values);

    const newTaskId = result.rows[0].task_id;
    console.log(`New task created with task_id: ${newTaskId}`);
    res.status(201).json({ message: 'Task created successfully', task_id: newTaskId });
  } catch (error) {
    console.error(`Error creating a new task: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Edit ticket
export const updateTicket = async (req,res) =>{
  const { id } = req.params; 
  const updatedFields = req.body;

  try {
    const existingTicketQuery = {
      text: 'SELECT * FROM ticket_schema.kanban_tasks WHERE task_id = $1',
      values: [id],
    };

    const existingTicketResult = await pool.query(existingTicketQuery);
    const existingTicket = existingTicketResult.rows[0];

    if (!existingTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    const updatedTicket = { ...existingTicket, ...updatedFields };
    const updateTicketQuery = {
      text: `
        UPDATE ticket_schema.kanban_tasks
        SET title = $1, description = $2, status = $3, column_id = $4, due_date = $5, labels = $6, position = $7, team_id = $8, attachments = $9
        WHERE task_id = $10
      `,
      values: [
        updatedTicket.title,
        updatedTicket.description,
        updatedTicket.status,
        updatedTicket.column_id,
        updatedTicket.due_date,
        updatedTicket.labels,
        updatedTicket.position,
        updatedTicket.team_id,
        updatedTicket.attachments,
        id,
      ],
    };

    await pool.query(updateTicketQuery);

    res.status(200).json({ message: `Ticket with ticket id ${id} updated successfully` });
  } catch (error) {
    console.error(`Error updating ticket: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
}

//Archive ticket 
export const archiveTicket = async (req,res) => {
 const {id} = req.params
 try{
 await pool.query("UPDATE ticket_schema.kanban_tasks SET archived = TRUE WHERE task_id = $1", [id])
 res.status(200).json({message:`Task with id task_id ${id} archived successfully!`})
 }catch(error){
  console.error(`There was an error while archiving the task: ${error}`)
  res.status(500).json({error:"Internal server error!"})
 }
}

//Delete ticket
export const deleteTicket =  async (req,res) =>{
 const {id} = req.params
 try{
 await pool.query('DELETE FROM ticket_schema.kanban_tasks WHERE task_id = $1',[id])
 res.status(200).json({message:`Ticket with id: ${id} deleted successfully!`})
 }catch(error){
  console.error(`Error while deleting the ticket: ${error}`)
  res.status(500).json({error:"Internal server error!"})
 }

}