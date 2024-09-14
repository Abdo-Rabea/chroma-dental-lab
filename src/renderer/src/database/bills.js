var dbManager = require('./dbManager');
var db = dbManager.db;

function getBillById(id) {
  const stmt = db.prepare(`
    SELECT 
      bills.id AS billId,
      bills.doctorId,
      bills.patientsNum,
      bills.totalPrice,
      bills.totalQuantity,
      bills.outstandingAmount,
      bills.balanceSnap,
      bills.createdAt AS billCreatedAt,
  
      doctors.id AS doctorId,
      doctors.fullName,
      doctors.balance,
      doctors.activeBillId,
      doctors.createdAt AS doctorCreatedAt
  
    FROM bills
    JOIN doctors ON bills.doctorId = doctors.id
    WHERE bills.id = ?
  `);

  const result = stmt.get(id); // fetch a single row

  const bill = {
    id: result.billId,
    patientsNum: result.patientsNum,
    totalPrice: result.totalPrice,
    totalQuantity: result.totalQuantity,
    outstandingAmount: result.outstandingAmount,
    balanceSnap: result.balanceSnap,
    createdAt: result.billCreatedAt,
    doctor: {
      id: result.doctorId,
      fullName: result.fullName,
      balance: result.balance,
      activeBillId: result.activeBillId,
      createdAt: result.doctorCreatedAt
    }
  };
  return bill;
}

// Function to create a new bill
function createBill(doctorId, totalPrice = 0, totalQuantity = 0) {
  const stmt = db.prepare(`
        INSERT INTO bills (doctorId)
        VALUES (?)
    `);
  const info = stmt.run(doctorId);
  return info.lastInsertRowid; // Return the ID of the newly inserted row
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
  getBillById,
  createBill
};
