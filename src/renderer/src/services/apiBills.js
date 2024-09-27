export async function getBillById(id) {
  try {
    return await window.bills.getBillById(id);
  } catch (err) {
    throw new Error('تعذر تحميل الفاتورة');
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
