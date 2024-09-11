import { contextBridge } from 'electron';
const path = require('path');

//database api
const doctorOperations = require(path.resolve(process.cwd(), 'src/renderer/src/database/doctors'));
const billOperations = require(path.resolve(process.cwd(), 'src/renderer/src/database/bills'));
const depositOperations = require(
  path.resolve(process.cwd(), 'src/renderer/src/database/deposits')
);
const productOperations = require(
  path.resolve(process.cwd(), 'src/renderer/src/database/products')
);

contextBridge.exposeInMainWorld('doctors', {
  createDoctor: (fullName) => doctorOperations.createDoctor(fullName),
  getDoctors: doctorOperations.getDoctors
});

contextBridge.exposeInMainWorld('bills', {
  createBill: (doctorId) => billOperations.createBill(doctorId)
});

contextBridge.exposeInMainWorld('deposits', {
  createDeposit: depositOperations.createDeposit
});

contextBridge.exposeInMainWorld('products', {
  createProduct: productOperations.createProduct,
  getProducts: productOperations.getProducts,
  updateProduct: productOperations.updateProduct,
  deleteProduct: productOperations.deleteProduct
});
