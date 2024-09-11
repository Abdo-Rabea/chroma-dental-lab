var dbmgr = require('./dbManager');
var db = dbmgr.db;

function createProduct(productData) {
  const { name, price } = productData;
  const stmt = db.prepare(`
        INSERT INTO products (name, price)
        VALUES (?, ?)
    `);
  const info = stmt.run(name, price);
  return info.lastInsertRowid;
}

function getProducts() {
  const stmt = db.prepare(`SELECT * FROM products`);
  return stmt.all();
}

function updateProduct(productData) {
  const { id, name, price } = productData;
  const stmt = db.prepare(`
        UPDATE products
        SET name = ?, price = ?
        WHERE id = ?
    `);
  const info = stmt.run(name, price, id);
  return info.changes > 0; // Return true if the update was successful
}

function deleteProduct(id) {
  const stmt = db.prepare(`
        DELETE FROM products WHERE id = ?
    `);
  const info = stmt.run(id);
  return info.changes > 0; // Return true if the deletion was successful
}

//* boundar

// Function to read a product by ID
function getProductById(id) {
  const stmt = db.prepare(`
        SELECT * FROM products WHERE id = ?
    `);
  return stmt.get(id); // Return the product record or undefined if not found
}

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
};
