const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const getData = async () => {
  const res = await pool.query('SELECT * FROM your_table');
  return res.rows;
};

export default async function handler(req, res) {
  const data = await getData();
  res.status(200).json(data);
}