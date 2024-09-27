var dbManager = require('./dbManager');
var db = dbManager.db;

function getBillById(id) {
  // Step 1: Get the bill data
  const billStmt = db.prepare(`
    SELECT 
      id AS billId,
      doctorId,
      patientsNum,
      totalPrice,
      totalQuantity,
      outstandingAmount,
      balanceSnap,
      createdAt AS billCreatedAt
    FROM bills
    WHERE id = ?
  `);

  const billResult = billStmt.get(id); // fetch a single bill row

  // If no bill is found, return null or handle accordingly
  if (!billResult) return null;

  // Initialize bill object
  const bill = {
    id: billResult.billId,
    patientsNum: billResult.patientsNum,
    totalPrice: billResult.totalPrice,
    totalQuantity: billResult.totalQuantity,
    outstandingAmount: billResult.outstandingAmount,
    balanceSnap: billResult.balanceSnap,
    createdAt: billResult.billCreatedAt,
    doctor: null // Default to null if no doctor data is needed
  };

  // Step 2: If the bill has a doctorId, fetch the doctor data
  if (billResult.doctorId !== null) {
    const doctorStmt = db.prepare(`
      SELECT 
        id AS doctorId,
        fullName,
        balance,
        activeBillId,
        createdAt AS doctorCreatedAt
      FROM doctors
      WHERE id = ?
    `);

    const doctorResult = doctorStmt.get(billResult.doctorId);

    // If the doctor is found, add it to the bill object
    if (doctorResult) {
      bill.doctor = {
        id: doctorResult.doctorId,
        fullName: doctorResult.fullName,
        balance: doctorResult.balance,
        activeBillId: doctorResult.activeBillId,
        createdAt: doctorResult.doctorCreatedAt
      };
    }
  }

  return bill;
}

// Function to create a new bill
function createBill({ doctorId, outstandingAmount }) {
  const stmt = db.prepare(`
        INSERT INTO bills (doctorId, outstandingAmount, createdAt)
        VALUES (?, ?, datetime('now', 'localtime') )
    `);
  const info = stmt.run(doctorId, outstandingAmount);
  return info.lastInsertRowid; // Return the ID of the newly inserted row
}

// Function to update a bill's information before saving

function updateBillAndDoctorBalance(data) {
  const { doctorId, balance, billId, balanceSnap } = data;
  const updateBillStmt = db.prepare(`
    UPDATE bills
    SET balanceSnap = ?
    WHERE id = ?
  `);

  const updateDoctorBalanceStmt = db.prepare(`
    UPDATE doctors
    SET balance = ?
    WHERE id = ?
  `);

  // Start a transaction to ensure both updates are applied together
  const transaction = db.transaction(() => {
    // Update the bill
    updateBillStmt.run(balanceSnap, billId);

    // Update the doctor's balance
    updateDoctorBalanceStmt.run(balance, doctorId);
  });

  // Run the transaction
  transaction();
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
  createBill,
  updateBillAndDoctorBalance
};
