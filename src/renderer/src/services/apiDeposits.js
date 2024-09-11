export async function createDeposit(depositData) {
  try {
    await window.deposits.createDeposit(depositData);
  } catch (err) {
    throw new Error('تعذرت عملية الإيداع');
  }
}
