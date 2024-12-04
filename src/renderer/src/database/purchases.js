var dbmgr = require('./dbManager');
var db = dbmgr.db;

function getBillPurchases(billId) {
  const stmt = db.prepare(`
    SELECT * FROM purchases
    WHERE billId = ? ORDER BY createdAt ASC;
  `);

  const purchases = stmt.all(billId);
  return purchases;
}

function createPurchase(purchaseData) {
  const {
    billId,
    productId,
    productName,
    productPrice,
    quantity,
    color = null,
    patientName = null,
    date
  } = purchaseData;

  // Begin transaction to ensure both operations happen atomically
  const transaction = db.transaction(() => {
    // Insert the purchase
    const insertPurchase = db.prepare(`
      INSERT INTO purchases (
        billId, productId, productName, productPrice, quantity, color, patientName, createdAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `);

    insertPurchase.run(
      billId,
      productId,
      productName,
      productPrice,
      quantity,
      color,
      patientName,
      date
    );

    // Update the bill's totalPrice and totalQuantity
    const updateBill = db.prepare(`
      UPDATE bills
      SET totalPrice = totalPrice + ?,
          totalQuantity = totalQuantity + ?
      WHERE id = ?;
    `);

    updateBill.run(productPrice * quantity, quantity, billId);
  });

  // Execute the transaction
  transaction();
}

function deletePurchase(purchaseId) {
  // Begin transaction to ensure both operations happen atomically
  const transaction = db.transaction(() => {
    // Get the purchase details before deleting
    const getPurchase = db.prepare(`
      SELECT billId, productPrice, quantity FROM purchases WHERE id = ?;
    `);
    const purchase = getPurchase.get(purchaseId);

    if (!purchase) {
      throw new Error(`Purchase with ID ${purchaseId} not found.`);
    }

    // Delete the purchase
    const deletePurchase = db.prepare(`
      DELETE FROM purchases WHERE id = ?;
    `);
    deletePurchase.run(purchaseId);

    // Update the bill's totalPrice and totalQuantity
    const updateBill = db.prepare(`
      UPDATE bills
      SET totalPrice = totalPrice - ?,
          totalQuantity = totalQuantity - ?
      WHERE id = ?;
    `);

    updateBill.run(purchase.productPrice * purchase.quantity, purchase.quantity, purchase.billId);
  });

  // Execute the transaction
  transaction();
}

function updatePurchase(purchaseData) {
  const {
    purchaseId,
    billId,
    productId,
    productName,
    productPrice,
    quantity,
    date,
    color = null,
    patientName = null
  } = purchaseData;

  // Update the specific purchase
  const updateStmt = db.prepare(`
    UPDATE purchases
    SET productId=?, productName = ?, productPrice = ?, quantity = ?, color = ?, patientName = ?, createdAt = ?
    WHERE id = ?
  `);

  updateStmt.run(
    productId,
    productName,
    productPrice,
    quantity,
    color,
    patientName,
    date,
    purchaseId
  );

  // Update totalPrice and totalQuantity for the corresponding bill
  const billUpdateStmt = db.prepare(`
    UPDATE bills
    SET totalPrice = (
      SELECT SUM(productPrice * quantity) FROM purchases WHERE billId = ?
    ),
    totalQuantity = (
      SELECT SUM(quantity) FROM purchases WHERE billId = ?
    )
    WHERE id = ?
  `);

  billUpdateStmt.run(billId, billId, billId);
}

module.exports = {
  getBillPurchases,
  createPurchase,
  deletePurchase,
  updatePurchase
};
