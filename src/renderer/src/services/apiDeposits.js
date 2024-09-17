export async function createDeposit(depositData) {
  try {
    await window.deposits.createDeposit(depositData);
  } catch (err) {
    throw new Error('تعذرت عملية الإيداع');
  }
}

export async function getDepositsByBillId(billId) {
  try {
    return await window.deposits.getDepositsByBillId(billId);
  } catch (err) {
    throw new Error('حدث خطأ اثناء تحميل البيانات');
  }
}

export async function deleteDeposit(depositId) {
  try {
    return await window.deposits.deleteDeposit(depositId);
  } catch (err) {
    throw new Error('تعذر حذف الايداع');
  }
}
