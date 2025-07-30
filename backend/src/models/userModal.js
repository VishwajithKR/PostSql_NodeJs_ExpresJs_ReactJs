import db from "../lib/db.js";

export const createTable = async () => {
  const schemas = [
    {
      name: "register",
      fields: `
        id SERIAL PRIMARY KEY,
        name TEXT CHECK (char_length(name) <= 25),
        email VARCHAR(30) CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'),
        place TEXT CHECK (char_length(place) <= 15),
        age INT CHECK (age >= 0 AND age <= 99),
        password TEXT CHECK (char_length(password) >= 6)`
    },
    {
      name: "demotable",
      fields: "id INT PRIMARY KEY, name VARCHAR(20)"
    },
  ];

  const desiredTableNames = schemas.map(s => s.name);

  try {
    const result = await db.query(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
    `);

    const existingTables = result.rows.map(row => row.tablename);

    const tablesToDrop = existingTables.filter(table => !desiredTableNames.includes(table));

    for (const table of tablesToDrop) {
      await db.query(`DROP TABLE IF EXISTS ${table} CASCADE`);
      console.log(`Dropped table '${table}'`);
    }

    for (const { name, fields } of schemas) {
      const createQuery = `CREATE TABLE IF NOT EXISTS ${name} (${fields});`;
      await db.query(createQuery);
      // console.log(`Table '${name}' created or already exists`);
    }

  } catch (err) {
    console.error("Error creating/dropping tables:", err.message);
  }
};
