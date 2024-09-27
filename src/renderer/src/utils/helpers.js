import { useSaveBill } from '../features/bills/useSaveBill';

export function formatCurrency(value) {
  //todo: will i add جنيه
  value = Number(value);
  if (value < 0.1 && value > -0.1) return 0;
  return +value.toFixed(2);
}

export function formatTimestampToDate(timestamp) {
  // Extract only the date part (YYYY-MM-DD)
  return timestamp.split(' ')[0];
}

export function formatTimestampToDateTime(timestamp) {
  return timestamp.split(' ');
}

export async function handleSaveCreateNewBill(saveBillAsync, createBillAsync, updateData) {
  // to handle the computations;
  const { doctorId, balance, activeBillId, billId, totalPrice, outstandingAmount } = updateData;
  const balanceSnap = balance;

  const remaining = balance - (totalPrice + outstandingAmount);
  let newBalance = 0,
    newOutstandingAmount = 0;
  if (remaining >= 0) {
    newBalance = remaining;
  } else {
    newOutstandingAmount = Math.abs(remaining);
  }

  try {
    //1. saving current bill and doctor balance
    if (activeBillId !== null)
      await saveBillAsync({ doctorId, balance: newBalance, billId, balanceSnap });
    //2. creating new bill
    await createBillAsync({ doctorId, outstandingAmount: newOutstandingAmount });
  } catch (error) {
    console.log('error from helpers', error);
  }
}
