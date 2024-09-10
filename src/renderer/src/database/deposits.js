var dbmgr = require('./dbManager');
var db = dbmgr.db;

function createDeposit(doctorId, billId, amount) {
  const insertDeposit = db.prepare(`
      INSERT INTO deposits (billId, doctorId, amount) 
      VALUES (?, ?, ?)
  `);

  //* it is better to handle it here as it is a transaction
  const updateDoctorBalance = db.prepare(`
      UPDATE doctors 
      SET balance = balance + ? 
      WHERE id = ?
  `);

  const transaction = db.transaction((doctorId, billId, amount) => {
    // Insert the deposit
    insertDeposit.run(billId, doctorId, amount);

    // Update the doctor's balance
    updateDoctorBalance.run(amount, doctorId);
  });

  transaction(doctorId, billId, amount);
}

module.exports = {
  createDeposit
};
