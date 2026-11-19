-- Requests posted by clients (businesses & government entities)
CREATE TABLE IF NOT EXISTS requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_type TEXT NOT NULL,          -- government | semi_government | private
  organization TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  services TEXT NOT NULL,             -- JSON array: event_management, event_staffing, general_staffing, equipment
  description TEXT NOT NULL,
  contract_type TEXT NOT NULL,        -- short | long
  city TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT,
  headcount INTEGER,
  budget TEXT,
  lang TEXT,
  status TEXT NOT NULL DEFAULT 'new', -- new | reviewing | matched | awarded | closed
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Supplier applications (event management, staffing, equipment companies & freelancers)
CREATE TABLE IF NOT EXISTS suppliers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  supplier_type TEXT NOT NULL,        -- company | freelancer
  company TEXT NOT NULL,
  cr_number TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  services TEXT NOT NULL,             -- JSON array
  contract_types TEXT NOT NULL,       -- short | long | both
  cities TEXT NOT NULL,               -- JSON array
  capacity INTEGER,
  nitaqat TEXT,
  message TEXT,
  lang TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- pending | verified | rejected
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_requests_status ON requests(status);
CREATE INDEX IF NOT EXISTS idx_suppliers_status ON suppliers(status);
