var dbmgr = require('./dbManager');
var db = dbmgr.db;

// Function to create a new doctor //*done
function createDoctor(fullName) {
  const stmt = db.prepare(`
        INSERT INTO doctors (fullName)
        VALUES (?) 
    `);
  const info = stmt.run(fullName);
  return info.lastInsertRowid; // Return the ID of the newly inserted row
}

function getDoctors() {
  const query = `
  SELECT 
      doctors.id,
      doctors.fullName,
      doctors.balance,
      doctors.createdAt,

      bills.id AS billId,
      bills.patientsNum,
      bills.totalPrice,
      bills.totalQuantity,
      bills.outstandingAmount,
      bills.balanceSnap,
      bills.createdAt as billCreatedAt
  FROM 
      doctors
  LEFT JOIN 
      bills ON doctors.activeBillId = bills.id;
`;

  const rows = db.prepare(query).all();

  return rows.map((row) => ({
    id: row.id,
    fullName: row.fullName,
    balance: row.balance,
    createdAt: row.createdAt,

    bill: row.billId
      ? {
          id: row.billId,
          patientsNum: row.patientsNum,
          totalPrice: row.totalPrice,
          totalQuantity: row.totalQuantity,
          outstandingAmount: row.outstandingAmount,
          balanceSnap: row.balanceSnap,
          createdAt: row.billCreatedAt
        }
      : null
  }));
}

// Function to read a doctor by ID
function getDoctorById(id) {
  const stmt = db.prepare(`
        SELECT * FROM doctors WHERE id = ?
    `);
  return stmt.get(id); // Return the doctor record or undefined if not found
}

// Function to update a doctor's information
function updateDoctor(id, fullName, activeBillId) {
  const stmt = db.prepare(`
        UPDATE doctors
        SET fullName = ?, activeBillId = ?
        WHERE id = ?
    `);
  const info = stmt.run(fullName, activeBillId, id);
  return info.changes > 0; // Return true if the update was successful
}

// Function to delete a doctor by ID
function deleteDoctor(id) {
  const stmt = db.prepare(`
        DELETE FROM doctors WHERE id = ?
    `);
  const info = stmt.run(id);
  return info.changes > 0; // Return true if the deletion was successful
}

module.exports = {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
};
