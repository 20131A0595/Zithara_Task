import express from "express";
import connectDB from "./config/db.js";
import {pool} from "./config/db.js";
import bodyParser from "body-parser";
import cors from "cors";


const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

connectDB();

// API endpoint to fetch customers
app.get('/api/customers', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM records;`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//search by name or location
app.get('/api/customers/:id', async (req, res) => {
  const search = req.params.id;
  try {
    const result = await pool.query(
      `SELECT * FROM records WHERE customer_name LIKE '%${search}%' OR location LIKE '%${search}%'
`
    );
    res.json(result.rows);
    console.log(result);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//sort the items
app.get('/api/customers/sort', async(req,res)=>{
  const sortBy = req.query.sortBy;
  try {
    const result = await pool.query(
      `SELECT * FROM records ORDER BY ${sortBy === 'Date' ? 'DESC' : 'ASC'}`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error sorting customers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

