const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'shawtrust',
    password: 'Incoming87.com',
    port: 5432,
});

// Test route
app.get('/', (req, res) => {
    res.send('API is running');
});

// Gift Aid form submission route
app.post('/api/giftaid', async (req, res) => {
    const { first_name, last_name, email, postcode, address } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO gift_aid_forms 
   (first_name, last_name, email, postcode, address, has_been_processed)
   VALUES ($1, $2, $3, $4, $5, false) RETURNING *`,
            [first_name, last_name, email, postcode, address]
        );
        res.status(201).json({ message: 'Success', data: result.rows[0] });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
});

app.get('/api/giftaid/unread-count', async (req, res) => {
    console.log("Unread count endpoint hit");  // <--- add this
    try {
        const result = await pool.query(
            'SELECT COUNT(*) FROM gift_aid_forms WHERE has_been_processed = false'
        );
        res.json({ count: parseInt(result.rows[0].count) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to get count" });
    }
});

