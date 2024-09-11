import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDeposit } from '../../services/apiDeposits';
import toast from 'react-hot-toast';
import { updateProduct } from '../../services/apiProducts';

export function useEditProduct() {
  const queryClient = useQueryClient();
  const { mutate: editProduct, isPending: isEditingProduct } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      toast.success(`تم التعديل بنجاح`);
      queryClient.invalidateQueries({
        active: true
      });
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });
  //* no need for the error as toast do it
  return { editProduct, isEditingProduct };
}
