import { Controller, useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import ButtonGroup from '../../ui/ButtonGroup';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useAddDeposit } from './useAddDeposit';
import CustomDatePicker from '../../ui/CustomDatePicker';
import dayjs from 'dayjs';

function AddDepositForm({ doctorId, billId, onCloseModal }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      date: dayjs()
    }
  });
  const { addDeposit, isAddingDeposit } = useAddDeposit();

  function onSubmit(data) {
    let { amount = 0 } = data;
    amount = Number(amount);
    addDeposit(
      { doctorId, billId, amount, date: dayjs(data.date).format('YYYY-MM-DD HH:mm:ss') },
      { onSuccess: () => onCloseModal?.() }
    );
  }
  return (
    <Form type="modal" onSubmit={handleSubmit(onSubmit)}>
      <FormRow error={errors?.amount?.message}>
        <Input
          autoFocus
          placeholder="أدخل المبلغ بالجنيه"
          type="text"
          step="0.01"
          id="amount"
          size="medium"
          {...register('amount', {
            required: 'يجب ادخال المبلغ',
            min: {
              value: 0.01,
              message: 'يجب ادخال قيمة اكبر من الصفر'
            },

            pattern: { value: /^\d+(\.\d{1,2})?$/, message: 'يجب ادخال المبلغ بصورة صحيحة' }
          })}
          disabled={isAddingDeposit}
        />
      </FormRow>
      <FormRow id="date" error={errors?.date?.message}>
        <Controller
          name="date"
          control={control}
          rules={{
            required: 'يجب إدخال التاريخ',
            validate: (value) =>
              !value || isNaN(new Date(value).getTime()) ? 'أدخل التاريخ بصورة صحيحة' : true
          }}
          render={({ field: { onChange, value } }) => (
            <CustomDatePicker value={value} onChange={onChange} />
          )}
        />
      </FormRow>
      <ButtonGroup>
        <Button
          variation="secondary"
          type="reset"
          disabled={isAddingDeposit}
          onClick={() => onCloseModal?.()}
        >
          إلغاء
        </Button>
        <Button type="submit" disabled={isAddingDeposit}>
          تأكيد
        </Button>
      </ButtonGroup>
    </Form>
  );
}

export default AddDepositForm;
