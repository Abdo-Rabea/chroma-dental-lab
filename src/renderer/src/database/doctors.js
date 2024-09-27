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

function getDoctorActiveBillById(doctorId) {
  // Get the doctor's details (without JOIN for bill)
  const doctor = db
    .prepare(
      `
    SELECT 
      id,
      fullName,
      balance,
      activeBillId,
      createdAt
    FROM doctors
    WHERE id = ?
  `
    )
    .get(doctorId);

  // If no doctor is found, return null
  if (!doctor) return null;

  // Initialize doctor object
  const result = {
    id: doctor.id,
    fullName: doctor.fullName,
    balance: doctor.balance,
    createdAt: doctor.createdAt,
    activeBillId: doctor.activeBillId,
    bill: null // Default to null if no activeBillId
  };

  // If activeBillId is a number (i.e., not NULL), fetch the corresponding bill
  if (doctor.activeBillId !== null) {
    const bill = db
      .prepare(
        `
      SELECT 
        id,
        doctorId,
        patientsNum,
        totalPrice,
        totalQuantity,
        outstandingAmount,
        balanceSnap,
        createdAt
      FROM bills
      WHERE id = ?
    `
      )
      .get(doctor.activeBillId);

    // If the bill is found, add it to the doctor object
    if (bill) {
      result.bill = {
        id: bill.id,
        doctorId: bill.doctorId,
        patientsNum: bill.patientsNum,
        totalPrice: bill.totalPrice,
        totalQuantity: bill.totalQuantity,
        outstandingAmount: bill.outstandingAmount,
        balanceSnap: bill.balanceSnap,
        createdAt: bill.createdAt
      };
    }
  }

  return result;
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
  getDoctorActiveBillById,

  updateDoctor,
  deleteDoctor
};
