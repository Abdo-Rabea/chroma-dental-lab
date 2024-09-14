export function formatCurrency(value) {
  //todo: will i add جنيه
  value = Number(value);
  if (value < 0.01) return 0;
  return `${+value.toFixed(2)}`;
}

export function formatTimestampToDate(timestamp) {
  // Extract only the date part (YYYY-MM-DD)
  return timestamp.split(' ')[0];
}
