export async function getBillById(id) {
  try {
    return await window.bills.getBillById(id);
  } catch (err) {
    throw new Error('تعذر تحميل الفاتورة');
  }
}

// pagination constraints
export async function getAllBills(constraints) {
  try {
    return await window.bills.getAllBills(constraints);
  } catch (err) {
    throw new Error('تعذر تحميل الفواتير');
  }
}

// pagination constraints
export async function getBillsCount() {
  try {
    return await window.bills.getBillsCount();
  } catch (err) {
    throw new Error('تعذر تحميل الفواتير');
  }
}

//* you are using it before saving only
export async function updateBillAndDoctorBalance(billData) {
  try {
    return await window.bills.updateBillAndDoctorBalance(billData);
  } catch (err) {
    throw new Error('تعذر تعديل الفاتورة');
  }
}

//* you are using it before saving only
export async function createBill(billData) {
  try {
    return await window.bills.createBill(billData);
  } catch (err) {
    throw new Error('تعذر انشاء الفاتورة');
  }
}

//* you are using it before saving only
export async function deleteBill(billId) {
  try {
    return await window.bills.deleteBill(billId);
  } catch (err) {
    console.log(err);
    throw new Error('تعذر حذف الفاتورة');
  }
}
