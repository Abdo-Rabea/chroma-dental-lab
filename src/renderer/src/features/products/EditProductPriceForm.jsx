import styled from 'styled-components';
import Input from '../../ui/Input';
import { formatCurrency } from '../../utils/helpers';
import { useForm } from 'react-hook-form';
import { useEditProduct } from './useEditProduct';

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
  height: 2.1rem; //*deposit
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  column-gap: 1rem;
  row-gap: 0.6rem;
  align-items: center;
`;
function EditProductPriceForm({ product }) {
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors, dirtyFields }
  } = useForm();

  const { editProduct, isEditingProduct } = useEditProduct();
  console.log(isEditingProduct);
  function onSubmit(data) {
    if (dirtyFields.price) {
      product = { ...product, price: data?.price };
      editProduct(product, {
        onSuccess: () => {
          reset(data); //* for reseting diryValues and keeping new value
        }
      });
    }
  }

  const handleBlur = async () => {
    const isValid = await trigger('price');
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="أدخل السعر بالجنيه"
        type="text"
        step="0.01"
        id="price"
        size="medium"
        defaultValue={formatCurrency(product.price)}
        {...register('price', {
          required: 'يجب ادخال السعر',
          min: {
            value: 0.01,
            message: 'يجب ادخال قيمة اكبر من الصفر'
          },
          pattern: { value: /^\d+(\.\d{1,2})?$/, message: 'يجب ادخال السعر بصورة صحيحة' }
        })}
        onBlur={handleBlur}
        disabled={isEditingProduct}
      />
      {errors?.price && <Error>{errors?.price?.message}</Error>}
    </Form>
  );
}

export default EditProductPriceForm;
