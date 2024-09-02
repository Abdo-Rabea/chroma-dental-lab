const sqlite3 = require('better-sqlite3');
const db = sqlite3('database.db');

// Function to create a new product
function createProduct(name, price) {
  const stmt = db.prepare(`
        INSERT INTO products (name, price)
        VALUES (?, ?)
    `);
  const info = stmt.run(name, price);
  return info.lastInsertRowid; // Return the ID of the newly inserted row
}

// Function to read a product by ID
function getProductById(id) {
  const stmt = db.prepare(`
        SELECT * FROM products WHERE id = ?
    `);
  return stmt.get(id); // Return the product record or undefined if not found
}

// Function to update a product's information
function updateProduct(id, name, price) {
  const stmt = db.prepare(`
        UPDATE products
        SET name = ?, price = ?
        WHERE id = ?
    `);
  const info = stmt.run(name, price, id);
  return info.changes > 0; // Return true if the update was successful
}

// Function to delete a product by ID
function deleteProduct(id) {
  const stmt = db.prepare(`
        DELETE FROM products WHERE id = ?
    `);
  const info = stmt.run(id);
  return info.changes > 0; // Return true if the deletion was successful
}
