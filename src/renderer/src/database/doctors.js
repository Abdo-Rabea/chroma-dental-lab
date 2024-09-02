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
  getDoctorById,
  updateDoctor,
  deleteDoctor
};
