export async function getBillById(id) {
  try {
    return await window.bills.getBillById(id);
  } catch (err) {
    throw new Error('تعذر تحميل الفاتورة');
  }
}
