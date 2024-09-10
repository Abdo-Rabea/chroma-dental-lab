import Button from '../../ui/Button';
import ButtonGroup from '../../ui/ButtonGroup';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

function AddDepositForm() {
  return (
    <Form type="modal">
      <FormRow>
        <Input
          autoFocus
          placeholder="أدخل المبلغ"
          type="number"
          id="deposit"
          size="medium"
          // disabled={isUpdatingSetting}
          // onBlur={(e) => handleUpdate(e, 'minBookingLength')}
        />
      </FormRow>
      <ButtonGroup>
        <Button variation="secondary">إلغاء</Button>
        <Button>تأكيد</Button>
      </ButtonGroup>
    </Form>
  );
}

export default AddDepositForm;
