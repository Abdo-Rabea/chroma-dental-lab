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
