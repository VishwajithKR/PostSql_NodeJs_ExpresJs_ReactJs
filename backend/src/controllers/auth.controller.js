import db from "../lib/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET; 

export const Register = async (req, res) => {
  const { name, email, password, place, age } = req.body;

  if (!name && !email && !password && !place && !age) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const requiredFields = { name, email, password, place, age };
  for (const [key, value] of Object.entries(requiredFields)) {
    if (value === undefined || value === null || value === "") {
      return res.status(400).json({ error: `${key[0].toUpperCase() + key.slice(1)} is required` });
    }
  }

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (name.length > 25) return res.status(400).json({ error: "Name should not exceed 25 characters" });
  if (!emailRegex.test(email)) return res.status(400).json({ error: "Invalid email format" });
  if (email.length > 30) return res.status(400).json({ error: "Email should not exceed 30 characters" });
  if (place.length > 15) return res.status(400).json({ error: "Place should not exceed 15 characters" });
  if (isNaN(age) || age < 0 || age > 99) return res.status(400).json({ error: "Age must be a number between 0 and 99" });
  if (password.length < 6) return res.status(400).json({ error: "Password must be at least 6 characters long" });

  try {
    const emailCheck = await db.query(`SELECT * FROM register WHERE email = $1`, [email]);
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insert_query = `
      INSERT INTO register (name, email, password, place, age)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, email
    `;
    const result = await db.query(insert_query, [name, email, hashedPassword, place, age]);
    const user = result.rows[0];

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      message: "Registration successful",
      user: { id: user.id, name: user.name, email: user.email },
      token,
      status: true
    });

  } catch (err) {
    console.error("Error during registration:", err);
    return res.status(500).json({ error: "Database error", details: err.message });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const requiredFields = { email, password };
  for (const [key, value] of Object.entries(requiredFields)) {
    if (value === undefined || value === null || value === "") {
      return res.status(400).json({ error: `${key[0].toUpperCase() + key.slice(1)} is required` });
    }
  }

  try {
    const userQuery = await db.query(`SELECT * FROM register WHERE email = $1`, [email]);
    if (userQuery.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = userQuery.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      status: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error", details: err.message });
  }
};


export async function logout(req, res) {
  const { id } = req.body;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.decode(token);

    if (!decoded || !decoded.exp || !decoded.id) {
      return res.status(400).json({ error: "Invalid token structure" });
    }

    const decodedId = parseInt(id);
    if (decoded.id !== decodedId) {
      return res.status(403).json({ error: "User ID does not match token" });
    }

    const expiresAt = new Date(decoded.exp * 1000);
    const now = new Date();

    if (expiresAt < now) {
      return res.status(200).json({
        success: true,
        message: "Token already expired. You have been logged out.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Logout successful. Token has been invalidated.",
    });

  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
}






