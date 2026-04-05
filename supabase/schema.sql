-- Tables pour MonetCord (PostgreSQL / Neon)

-- Table utilisateurs
CREATE TABLE IF NOT EXISTS users (
  id text PRIMARY KEY,
  spent integer DEFAULT 0
);

-- Table paiements
CREATE TABLE IF NOT EXISTS payments (
  id uuid DEFAULT gen_random_uuid(),
  user_id text,
  amount integer,
  created_at timestamp DEFAULT now()
);

-- Index pour les performances
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_users_spent ON users(spent);