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
    SET balanceSnap = ?, deactivatedAt = datetime('now', 'localtime')
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

// not used as i need to dynamiclly calc. count of each query
function getBillsCount() {
  const stmt = db.prepare('SELECT COUNT(*) AS totalRows FROM bills');
  return stmt.get().totalRows;
}

function getAllBills({ filterByDoctorName = '', currentPage = 1, PAGE_SIZE = 1 }) {
  const offset = (currentPage - 1) * PAGE_SIZE;
  const filter = `%${filterByDoctorName}%`;

  const countQuery = `
    SELECT COUNT(1) AS count
    FROM bills
    WHERE bills.doctorId IN (
      SELECT id 
      FROM doctors 
      WHERE doctors.fullName LIKE ?
    );
  `;
  const { count } = db.prepare(countQuery).get(filter);

  const query = `
    SELECT
      bills.id ,
      bills.totalPrice,
      bills.totalQuantity,
      bills.outstandingAmount,
      bills.balanceSnap,
      bills.createdAt,
      doctors.id AS doctorId,
      doctors.fullName,
      doctors.activeBillId,
      doctors.balance
    FROM bills
    JOIN doctors ON bills.doctorId = doctors.id
    WHERE doctors.fullName LIKE ? 
    ORDER BY bills.createdAt DESC LIMIT ? OFFSET ?;
  `;

  const rows = db.prepare(query).all(filter, PAGE_SIZE, offset);

  // Map the results to the desired format
  const data = rows.map((row) => ({
    id: row.id,
    totalPrice: row.totalPrice,
    totalQuantity: row.totalQuantity,
    outstandingAmount: row.outstandingAmount,
    balanceSnap: row.balanceSnap,
    createdAt: row.createdAt,
    doctor: {
      id: row.doctorId,
      fullName: row.fullName,
      activeBillId: row.activeBillId,
      balance: row.balance
    }
  }));
  return { data, count };
}

/**
 *
 * @param {*} id
 * only deletes the non-active one
 * all purchases and deposits are deleted by default
 */

function deleteBill(billId) {
  // Prepare a statement to check if the bill is the active one
  const checkActiveBillStmt = db.prepare(`
    SELECT id 
    FROM doctors 
    WHERE activeBillId = ?
  `);

  // Prepare a statement to delete the bill
  const deleteBillStmt = db.prepare(`
    DELETE FROM bills 
    WHERE id = ?
  `);

  // Check if the bill is the active one
  const activeBill = checkActiveBillStmt.get(billId);

  if (activeBill) {
    throw new Error("Active bill can't be deleted");
  }

  // Otherwise, delete the bill (cascade will take care of purchases and deposits)
  deleteBillStmt.run(billId);

  return true; // Return true to indicate successful deletion
}

module.exports = {
  getBillById,
  createBill,
  updateBillAndDoctorBalance,
  getAllBills,
  deleteBill,
  getBillsCount
};
