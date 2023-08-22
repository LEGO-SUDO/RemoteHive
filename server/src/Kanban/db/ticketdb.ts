import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  password: 'zdsm#123#N',
  host: 'localhost',
  port: 5432,
  database: 'remotehive',
});

export default pool;