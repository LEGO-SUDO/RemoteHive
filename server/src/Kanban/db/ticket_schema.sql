-- TASKS TABLE

-- CREATE TABLE ticket_schema.kanban_tasks (
--     task_id SERIAL PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     description TEXT,
--     status VARCHAR(30) NOT NULL,
--     column_id INTEGER NOT NULL,
--     due_date DATE,
--     labels VARCHAR(255)[],
--     position INTEGER,
--     team_id INTEGER REFERENCES public.teams(team_id),
--     archived BOOLEAN DEFAULT false,
--     created_at TIMESTAMP DEFAULT NOW(),
--     updated_at TIMESTAMP
-- );


-- MILESTONE TABLE

-- CREATE TABLE ticket_schema.milestones (
--     milestone_id SERIAL PRIMARY KEY,
--     task_id INTEGER REFERENCES ticket_schema.kanban_tasks(task_id),
--     title VARCHAR(100) NOT NULL,
--     description TEXT,
--     completed BOOLEAN DEFAULT false,
--     due_date DATE,
--     created_at TIMESTAMP DEFAULT NOW(),
--     updated_at TIMESTAMP
-- );

-- TASK ASSIGNMENTS

-- CREATE TABLE ticket_schema.task_assignments (
--     task_id INTEGER REFERENCES ticket_schema.kanban_tasks(task_id),
--     user_id INTEGER REFERENCES public.users(user_id),
--     PRIMARY KEY (task_id, user_id)
-- );


-- ACTIVITY LOGS

-- CREATE TABLE ticket_schema.task_activity_log (
--     log_id SERIAL PRIMARY KEY,
--     task_id INTEGER REFERENCES ticket_schema.kanban_tasks(task_id),
--     user_id INTEGER REFERENCES public.users(user_id),
--     activity_type VARCHAR(100) NOT NULL, -- e.g., 'Created', 'Updated', 'Assigned', 'Status Change'
--     details TEXT,
--     created_at TIMESTAMP DEFAULT NOW()
-- );

