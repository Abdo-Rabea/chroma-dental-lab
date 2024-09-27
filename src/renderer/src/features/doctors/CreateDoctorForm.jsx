import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import ButtonGroup from '../../ui/ButtonGroup';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useCreateDoctor } from './useCreateDoctor';

function CreateDoctorForm({ onCloseModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const { createDoctor, isCreatingDoctor } = useCreateDoctor();

  function onSubmit(data) {
    let { name = '' } = data;
    createDoctor(name, { onSuccess: () => onCloseModal?.() });
  }
  return (
    <Form type="modal" onSubmit={handleSubmit(onSubmit)}>
      <FormRow error={errors?.name?.message}>
        <Input
          autoFocus
          placeholder="أدخل إسم الطبيب"
          type="text"
          id="name"
          size="medium"
          {...register('name', {
            required: 'يجب إدخال إسم الطبيب'
          })}
          disabled={isCreatingDoctor}
        />
      </FormRow>
      <ButtonGroup>
        <Button
          variation="secondary"
          type="reset"
          disabled={isCreatingDoctor}
          onClick={() => onCloseModal?.()}
        >
          إلغاء
        </Button>
        <Button type="submit" disabled={isCreatingDoctor}>
          تأكيد
        </Button>
      </ButtonGroup>
    </Form>
  );
}

export default CreateDoctorForm;
