export const PRICE_CONSTRAINTS = {
  required: 'يجب ادخال السعر',
  min: {
    value: 0.01,
    message: 'يجب ادخال قيمة اكبر من الصفر'
  },
  pattern: { value: /^\d+(\.\d{1,2})?$/, message: 'يجب ادخال السعر بصورة صحيحة' }
};
