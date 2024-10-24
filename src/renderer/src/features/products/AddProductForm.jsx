import styled from 'styled-components';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useAddProduct } from './useAddProduct';
import { useForm } from 'react-hook-form';
import { PRICE_CONSTRAINTS } from '../../utils/constants';
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 2rem;
  margin-top: 1rem;
`;
const StyledAddProductForm = styled(Form)`
  margin-top: 1rem;
`;
function AddProductForm({ onCloseModal }) {
  const { addProduct, isAddingProduct } = useAddProduct();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  function onSubmit(data) {
    addProduct(data, {
      onSuccess: () => {
        onCloseModal?.();
      }
    });
  }
  return (
    <StyledAddProductForm type="modal" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="اسم المنتج" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          style={{ direction: 'ltr' }}
          {...register('name', {
            required: 'يجب ادخال اسم المنتج'
          })}
        />
      </FormRow>
      <FormRow label="السعر" error={errors?.price?.message}>
        <Input type="text" id="price" {...register('price', PRICE_CONSTRAINTS)} />
      </FormRow>
      <ButtonContainer>
        {/* type is an HTML attribute! */}
        <Button
          onClick={() => {
            onCloseModal?.();
          }}
          variation="secondary"
          type="reset"
          disabled={isAddingProduct}
        >
          إلغاء
        </Button>
        <Button disabled={isAddingProduct}>إضافة</Button>
      </ButtonContainer>
    </StyledAddProductForm>
  );
}

export default AddProductForm;
