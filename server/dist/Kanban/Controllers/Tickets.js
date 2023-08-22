import pool from '../db/ticketdb.js';
//get all tickets
export const getAllTickets = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM ticket_schema.kanban_tasks');
        const tickets = result.rows;
        res.status(200).json(tickets);
    }
    catch (error) {
        console.error('Error retrieving tickets:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
//get one ticket
export const getTicket = () => { };
//create new ticket 
export const createTicket = async (req, res) => {
    const { title, description, status, column_id, due_date, labels, position, team_id } = req.body;
    // Define the SQL query to insert a new task
    const insertTaskQuery = `
    INSERT INTO ticket_schema.kanban_tasks (title, description, status, column_id, due_date, labels, position, team_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING task_id;`;
    // Values to be inserted into the query
    const values = [title, description, status, column_id, due_date, labels, position, team_id];
    try {
        const result = await pool.query(insertTaskQuery, values);
        // The task was created successfully, and you can access the task_id in the result object
        const newTaskId = result.rows[0].task_id;
        console.log(`New task created with task_id: ${newTaskId}`);
        res.status(201).json({ message: 'Task created successfully', task_id: newTaskId });
    }
    catch (error) {
        console.error('Error creating a new task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
// Edit ticket
export const updateTicket = () => { };
//Archive ticket 
export const archiveTicket = () => {
};
//Delete ticket
export const deleteTicket = () => { };
//# sourceMappingURL=Tickets.js.map