export async function createDeposit(doctorId, billId, amount) {
  try {
    await window.deposits.createDeposit(doctorId, billId, amount);
  } catch (err) {
    throw new Error('تعذرت عملية الإيداع');
  }
}
