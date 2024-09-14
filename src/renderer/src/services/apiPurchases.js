export async function getBillPurchases(billId) {
  try {
    return await window.purchases.getBillPurchases(billId);
  } catch (err) {
    throw new Error('تعذر تحميل الحالات');
  }
}

export async function createPurchase(purchaseData) {
  try {
    return await window.purchases.createPurchase(purchaseData);
  } catch (err) {
    throw new Error('تعذر اضافة الحالة');
  }
}

export async function updatePurchase(purchaseData) {
  try {
    return await window.purchases.updatePurchase(purchaseData);
  } catch (err) {
    throw new Error('تعذر تعديل الحالة');
  }
}
