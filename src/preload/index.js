import { contextBridge, ipcRenderer } from 'electron';
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
const purchasesOperations = require(
  path.resolve(process.cwd(), 'src/renderer/src/database/purchases')
);

//* print stuff
contextBridge.exposeInMainWorld('electronAPI', {
  printComponent: async (url, callback) => {
    let response = await ipcRenderer.invoke('printComponent', url);
    callback(response);
  },
  previewComponent: async (url, callback) => {
    let response = await ipcRenderer.invoke('previewComponent', url);
    callback(response);
  }
});

contextBridge.exposeInMainWorld('doctors', {
  createDoctor: doctorOperations.createDoctor,
  getDoctors: doctorOperations.getDoctors,
  getDoctorActiveBillById: doctorOperations.getDoctorActiveBillById //todo: delete
});

contextBridge.exposeInMainWorld('bills', {
  createBill: billOperations.createBill,
  getBillById: billOperations.getBillById,
  updateBillAndDoctorBalance: billOperations.updateBillAndDoctorBalance
});

contextBridge.exposeInMainWorld('deposits', {
  createDeposit: depositOperations.createDeposit,
  getDepositsByBillId: depositOperations.getDepositsByBillId,
  deleteDeposit: depositOperations.deleteDeposit
});

contextBridge.exposeInMainWorld('products', {
  createProduct: productOperations.createProduct,
  getProducts: productOperations.getProducts,
  updateProduct: productOperations.updateProduct,
  deleteProduct: productOperations.deleteProduct
});
contextBridge.exposeInMainWorld('purchases', {
  getBillPurchases: purchasesOperations.getBillPurchases,
  createPurchase: purchasesOperations.createPurchase,
  updatePurchase: purchasesOperations.updatePurchase,
  deletePurchase: purchasesOperations.deletePurchase
});
