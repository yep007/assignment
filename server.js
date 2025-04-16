const express = require('express');
const sql = require('mssql');
const app = express();
const port = process.env.PORT || 3000;

// Get SQL connection string from environment variables
const config = {
  server: 'mysqlserverassign.database.windows.net',
  database: 'mydatabase',
  user: 'adminuser',
  password: process.env.DB_PASSWORD, // Directly from App Service settings
  options: { encrypt: true }
};

app.get('/data', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM Products');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send('Database error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
