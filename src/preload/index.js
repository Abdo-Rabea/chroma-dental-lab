import { contextBridge } from 'electron';
const path = require('path');

//database api
const doctorOperations = require(path.resolve(process.cwd(), 'src/renderer/src/database/doctors'));
const billOperations = require(path.resolve(process.cwd(), 'src/renderer/src/database/bills'));
const depositOperations = require(
  path.resolve(process.cwd(), 'src/renderer/src/database/deposits')
);

// const doctorOperations = require(path.resolve(__dirname, '../renderer/src/database/doctors'));
// const billOperations = require(path.resolve(__dirname, '../renderer/src/database/bills'));
// const depositOperations = require(path.resolve(__dirname, '../renderer/src/database/deposits'));

contextBridge.exposeInMainWorld('doctors', {
  createDoctor: (fullName) => doctorOperations.createDoctor(fullName),
  getDoctors: doctorOperations.getDoctors
});

contextBridge.exposeInMainWorld('bills', {
  createBill: (doctorId) => billOperations.createBill(doctorId)
});

contextBridge.exposeInMainWorld('deposits', {
  createDeposit: (doctorId, billId, amount) =>
    depositOperations.createDeposit(doctorId, billId, amount)
});
