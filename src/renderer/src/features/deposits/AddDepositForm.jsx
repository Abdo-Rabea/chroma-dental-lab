import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import ButtonGroup from '../../ui/ButtonGroup';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useAddDeposit } from './useAddDeposit';

function AddDepositForm({ doctorId, billId, onCloseModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const { addDeposit, isAddingDeposit } = useAddDeposit();

  function onSubmit(data) {
    let { amount = 0 } = data;
    amount = Number(amount);
    addDeposit({ doctorId, billId, amount }, { onSuccess: () => onCloseModal?.() });
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
