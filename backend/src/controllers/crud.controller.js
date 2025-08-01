import db from "../lib/db.js";

export const postMethod = async (req, res) => {
  const { userID, title, description, checkData } = req.body;
  if (!userID ) {
    return res.status(400).json({ error: "All fields (userID, title, description, checkData) are required." });
  }

  try {
    const insertQuery = `
      INSERT INTO demotable (userID, title, description, checkData)
      VALUES ($1, $2, $3, $4)
    `;
    await db.query(insertQuery, [userID, title, description, checkData]);

    return res.status(201).json({ message: "Data inserted successfully" });
  } catch (err) {
    console.error("Error inserting data into demotable:", err);
    return res.status(500).json({ error: "Database error", details: err.message });
  }
};



export const findMethod = async (req, res) => {
  const { id } = req.body;
  const select_query = "SELECT * FROM demotable WHERE userid = $1";
  try {
    const result = await db.query(select_query, [id]);
    if (result.rows.length === 0) {
      return res.status(201).json({ message: "No data found" });
    }
    return res.status(200).json({ data: result.rows });
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).json({ error: "Database error", details: err.message });
  }
};


export const getMethod = async (req, res) => {
  const select_query = "SELECT * FROM demotable";

  try {
    const result = await db.query(select_query);
    return res.status(200).json({ data: result.rows });
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).json({ error: "Database error", details: err.message });
  }
};


export const updateMethod = async (req, res) => {
  const { id, name } = req.body;

  const check_query = "SELECT * FROM demotable WHERE id = $1";
  const update_query = "UPDATE demotable SET name = $1 WHERE id = $2";

  try {
    const checkResult = await db.query(check_query, [id]);

    if (checkResult.rowCount === 0) {
      return res.status(404).json({ message: "Invalid ID: No record found" });
    }

    await db.query(update_query, [name, id]);

    return res.status(200).json({ message: "Data updated successfully" });
  } catch (err) {
    console.error("Error updating data:", err);
    return res.status(500).json({ error: "Database error", details: err.message });
  }
};

export const deleteMethod = async (req, res) => {
  const { id } = req.body;

  const delete_query = "DELETE FROM demotable WHERE id = $1";

  try {
    const result = await db.query(delete_query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Invalid ID: No record found to delete" });
    }

    return res.status(200).json({ message: "Data deleted successfully" });
  } catch (err) {
    console.error("Error deleting data:", err);
    return res.status(500).json({ error: "Database error", details: err.message });
  }
};


