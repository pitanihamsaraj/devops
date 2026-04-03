const http = require('http');

const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

client.connect();

const server = http.createServer(async (req, res) => {
  const result = await client.query('SELECT NOW()');
  res.end(`DB Time: ${result.rows[0].now}`);
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Server running');
});
