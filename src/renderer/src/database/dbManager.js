const Database = require('better-sqlite3');
const path = require('path');

// Create or open a database file
//* this is the only file that knows about db actuall location

const db = new Database(path.join(__dirname, 'lab.db'));

// Create doctors table
db.exec(`
  CREATE TABLE IF NOT EXISTS doctors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    activeBillId INTEGER,
    fullName TEXT NOT NULL,
    balance REAL NOT NULL DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (activeBillId) REFERENCES bills(id)
  );
`);

// Create bills table
db.exec(`
  CREATE TABLE IF NOT EXISTS bills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    doctorId INTEGER NOT NULL,
    patientsNum INTEGER NOT NULL DEFAULT 0,
    totalPrice REAL NOT NULL DEFAULT 0,
    totalQuantity INTEGER NOT NULL DEFAULT 0,
    outstandingAmount REAL DEFAULT 0,
    balanceSnap REAL DEFAULT 0, -- setting only for old bill after creating new bill
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Automatically set to current timestamp
    deactivatedAt TIMESTAMP DEFAULT NULL, -- NULL to ensure the bill isn't deleted
    FOREIGN KEY (doctorId) REFERENCES doctors(id) ON DELETE CASCADE
  );
`);

// Create purchases table
db.exec(`
  CREATE TABLE IF NOT EXISTS purchases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    billId INTEGER NOT NULL,
    productId INTEGER NOT NULL,
    productName TEXT NOT NULL,
    productPrice REAL NOT NULL,
    quantity INTEGER NOT NULL,
    color TEXT,
    patientName TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (billId) REFERENCES bills(id) ON DELETE CASCADE
  );
`);

// Create products table
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS deposits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    billId INTEGER NOT NULL,
    doctorId INTEGER NOT NULL, 
    amount REAL NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (billId) REFERENCES bills(id) ON DELETE CASCADE,
    FOREIGN KEY (doctorId) REFERENCES doctors(id)
  );
`);

// delete bill with deactivated after 1 monthes
db.exec(`
  DELETE FROM Bills 
  WHERE deactivatedAt IS NOT NULL 
  AND deactivatedAt <= DATE('now', '-1 month', 'localtime');
`);

// triggers
db.exec(`
  CREATE TRIGGER IF NOT EXISTS update_doctor_active_bill_id
  AFTER INSERT ON bills
  FOR EACH ROW
  BEGIN
      UPDATE doctors
      SET activeBillId = NEW.id
      WHERE id = NEW.doctorId;
  END;
  `);

module.exports = {
  db
};
