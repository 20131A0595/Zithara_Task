import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "keerthi",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to the database");
    client.release(); // Release the client back to the pool after connecting
  } catch (err) {
    console.error("Error connecting to the database", err);
  }
};

export default connectDB;
export { pool };
