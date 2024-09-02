var dbManager = require('./dbManager');
var db = dbManager.db;

// Function to create a new bill
function createBill(doctorId, totalPrice = 0, totalQuantity = 0) {
  const stmt = db.prepare(`
        INSERT INTO bills (doctorId)
        VALUES (?)
    `);
  const info = stmt.run(doctorId);
  return info.lastInsertRowid; // Return the ID of the newly inserted row
}

// Function to read a bill by ID
function getBillById(id) {
  const stmt = db.prepare(`
        SELECT * FROM bills WHERE id = ?
    `);
  return stmt.get(id); // Return the bill record or undefined if not found
}

// Function to update a bill's information
function updateBill(id, doctorId, totalPrice, totalQuantity, createdAt) {
  const stmt = db.prepare(`
        UPDATE bills
        SET doctorId = ?, totalPrice = ?, totalQuantity = ?, createdAt = ?
        WHERE id = ?
    `);
  const info = stmt.run(doctorId, totalPrice, totalQuantity, createdAt, id);
  return info.changes > 0; // Return true if the update was successful
}

// Function to delete a bill by ID
function deleteBill(id) {
  const stmt = db.prepare(`
        DELETE FROM bills WHERE id = ?
    `);
  const info = stmt.run(id);
  return info.changes > 0; // Return true if the deletion was successful
}

module.exports = {
  createBill
};
