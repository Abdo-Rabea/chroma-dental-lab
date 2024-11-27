import { Controller, useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useProducts } from '../products/useProducts';
import Button from '../../ui/Button';
import styled from 'styled-components';
import Spinner from '../../ui/Spinner';
import Error from '../../ui/Error';
import { PRICE_CONSTRAINTS } from '../../utils/constants';
import { formatCurrency } from '../../utils/helpers';
import { useParams } from 'react-router-dom';
import { useEditPurchase } from './useEditPurchase';
import { useState } from 'react';
import CustomDatePicker from '../../ui/CustomDatePicker';
import dayjs from 'dayjs';
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 2rem;
  margin-top: 1rem;
`;
const Select = styled.select`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  padding: 0.8rem 1.2rem;
  font-size: 1.4rem;
  font-weight: 500;
`;
const StyledForm = styled(Form)`
  padding-top: 1rem;
`;
function EditPurchaseForm({ onCloseModal, purchase }) {
  const [isDirtySelect, setIsDirtySelect] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors, isDirty }
  } = useForm({
    defaultValues: {
      ...purchase,
      productName: purchase.productId,
      date: dayjs(purchase.createdAt) || dayjs()
    }
  });

  const { billId } = useParams();

  const { isLoading, products, error } = useProducts();

  const { editPurchase, isEditingPurchase } = useEditPurchase();

  if (isLoading) return <Spinner />;
  if (error) return <Error message="حدث خطأ اثناء تحميل البيانات" />;

  //! adding the the current selected product in case it was deleted
  const selectedProduct = {
    id: purchase.productId,
    name: purchase.productName,
    price: purchase.productPrice
  };

  // preparing set of product of efficient lookup;
  const productMap = new Map(products.map((product) => [product.id, product]));
  if (!productMap.has(purchase.productId)) {
    productMap.set(purchase.productId, selectedProduct);
    products.push(selectedProduct);
  }
  //calculating totalPrice
  const productPrice = watch('productPrice', 0);
  const quantity = watch('quantity', 1);
  const totalPrice = productPrice * quantity;

  function onSubmit(data) {
    const purchaseData = {
      ...data,
      date: dayjs(data.date).format('YYYY-MM-DD HH:mm:ss'),
      billId: Number(billId),
      purchaseId: purchase.id,
      productId: Number(data.productName),
      quantity: Number(data.quantity),
      productName: productMap.get(Number(data.productName))?.name
    };
    editPurchase(purchaseData, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      }
    });
  }

  return (
    <StyledForm type="modal" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="نوع الحالة" error={errors?.productName?.message}>
        {/* //*product value is the id */}
        <Select
          name="productName"
          id="productName"
          {...register('productName', {
            required: 'يجب اختيار نوع الحالة'
          })}
          onChange={(e) => {
            setValue('productPrice', productMap.get(Number(e.target.value))?.price);
            setIsDirtySelect(true);
          }}
        >
          {products.map((product) => (
            <option value={product.id} key={product.id}>
              {product.name}
            </option>
          ))}
        </Select>
      </FormRow>
      <FormRow label="التاريخ" id="date" error={errors?.date?.message}>
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
      <FormRow label="اسم المريض" error={errors?.patientName?.message}>
        <Input type="text" id="patientName" disabled={false} {...register('patientName')} />
      </FormRow>

      <FormRow label="اللون" error={errors?.color?.message}>
        <Input type="text" id="color" disabled={false} {...register('color')} />
      </FormRow>

      <FormRow label="سعر المنتج" error={errors?.productPrice?.message}>
        <Input
          type="text"
          id="productPrice"
          disabled={false}
          {...register('productPrice', PRICE_CONSTRAINTS)}
        />
      </FormRow>

      <FormRow label="الكمية" error={errors?.quantity?.message}>
        <Input
          type="number"
          defaultValue={1}
          min={1}
          id="quantity"
          disabled={false}
          {...register('quantity', {
            min: {
              value: 1,
              message: 'الكمية يجب ان تكون اكبر من الصفر'
            }
          })}
        />
      </FormRow>

      <FormRow label="الإجمالي">
        <Input
          type="text"
          id="totalPrice"
          readOnly
          disabled
          value={totalPrice ? formatCurrency(productPrice * quantity) : ''}
        />
      </FormRow>

      <ButtonContainer>
        <Button
          onClick={() => {
            onCloseModal?.();
          }}
          variation="secondary"
          type="reset"
          disabled={isEditingPurchase}
        >
          إلغاء
        </Button>
        <Button disabled={isEditingPurchase || !(isDirty || isDirtySelect)} type="submit">
          حفظ
        </Button>
      </ButtonContainer>
    </StyledForm>
  );
}

export default EditPurchaseForm;
