import { Client } from "pg";
import { createTable } from "../models/userModal.js";

const db = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect()
.then(() => {
    createTable();
    console.log("Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("Database connection error:", err.stack);
  });
  

export default db;
