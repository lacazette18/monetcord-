const express = require("express");
const cors = require("cors");
const pool = require("./db");
const authRoutes = require("./auth");

const app = express();
app.use(cors());
app.use(express.json());

// Buy Me a Coffee config
const BMC_USERNAME = process.env.BMC_USERNAME || "your-username";

app.use("/auth", authRoutes);

// 💳 PAYMENT (Buy Me a Coffee)
app.post("/create-payment", async (req, res) => {
  const { amount, discordId } = req.body;

  // Upsert user
  await pool.query(
    `INSERT INTO users (id, spent) VALUES ($1, 0)
     ON CONFLICT (id) DO NOTHING`,
    [discordId]
  );

  // Buy Me a Coffee checkout link
  const bmcLink = `https://buymeacoffee.com/${BMC_USERNAME}?discord_id=${discordId}`;

  res.json({ url: bmcLink });
});

// 📊 STATS
app.get("/stats/:id", async (req, res) => {
  const { rows } = await pool.query(
    `SELECT * FROM users WHERE id = $1`,
    [req.params.id]
  );

  res.json(rows[0] || {});
});

app.listen(3000, () => console.log("API running"));