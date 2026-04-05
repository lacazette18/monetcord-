const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function init() {
  try {
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id text PRIMARY KEY,
        spent integer DEFAULT 0
      )
    `);
    console.log("✅ Table 'users' created");

    // Create payments table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id uuid DEFAULT gen_random_uuid(),
        user_id text,
        amount integer,
        created_at timestamp DEFAULT now()
      )
    `);
    console.log("✅ Table 'payments' created");

    // Create indexes
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id)`);
    console.log("✅ Indexes created");

    console.log("\n🎉 Database initialized!");
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await pool.end();
  }
}

init();