import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createProduct } from '../../services/apiProducts';

export function useAddProduct() {
  const queryClient = useQueryClient();
  const { mutate: addProduct, isPending: isAddingProduct } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success(`تم إضافة المنتج بنجاح`);
      queryClient.invalidateQueries({
        active: true
      });
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });
  //* no need for the error as toast do it
  return { addProduct, isAddingProduct };
}
