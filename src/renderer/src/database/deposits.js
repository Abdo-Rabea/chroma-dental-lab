var dbmgr = require('./dbManager');
var db = dbmgr.db;

function createDeposit(depositData) {
  //* this ensures scalability
  const { doctorId, billId, amount } = depositData;
  const insertDeposit = db.prepare(`
      INSERT INTO deposits (billId, doctorId, amount, createdAt) 
      VALUES (?, ?, ?, datetime('now', 'localtime'))
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

function getDepositsByBillId(billId) {
  const stmt = db.prepare(`
    SELECT * FROM deposits
    WHERE billId = ?;
  `);
  return stmt.all(billId);
}

function deleteDeposit(depositId) {
  // Prepare to get the deposit details
  const getDeposit = db.prepare(`
    SELECT doctorId, amount 
    FROM deposits 
    WHERE id = ?
  `);

  // Prepare to update the doctor's balance
  const updateDoctorBalance = db.prepare(`
    UPDATE doctors 
    SET balance = balance - ? 
    WHERE id = ?
  `);

  // Prepare to delete the deposit
  const deleteDepositQuery = db.prepare(`
    DELETE FROM deposits 
    WHERE id = ?
  `);

  const transaction = db.transaction((depositId) => {
    // Retrieve the deposit details
    const deposit = getDeposit.get(depositId);

    if (!deposit) {
      throw new Error(`Deposit with ID ${depositId} not found.`);
    }

    const { doctorId, amount } = deposit;

    // Subtract the amount from the doctor's balance
    updateDoctorBalance.run(amount, doctorId);

    // Delete the deposit record
    deleteDepositQuery.run(depositId);
  });

  transaction(depositId);
}

module.exports = {
  createDeposit,
  getDepositsByBillId,
  deleteDeposit
};
