import { contextBridge } from 'electron';
const path = require('path');

//database api
const doctorOperations = require(path.resolve(process.cwd(), 'src/renderer/src/database/doctors'));
const billOperations = require(path.resolve(process.cwd(), 'src/renderer/src/database/bills'));

contextBridge.exposeInMainWorld('doctors', {
  createDoctor: (fullName) => doctorOperations.createDoctor(fullName)
});

contextBridge.exposeInMainWorld('bills', {
  createBill: (doctorId) => billOperations.createBill(doctorId)
});
