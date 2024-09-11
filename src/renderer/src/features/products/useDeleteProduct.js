import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteProduct as apiDeleteProduct } from '../../services/apiProducts';

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  const { mutate: deleteProduct, isPending: isDeletingProduct } = useMutation({
    mutationFn: apiDeleteProduct,
    onSuccess: () => {
      toast.success(`تم حذف المنتج بنجاح`);
      queryClient.invalidateQueries({
        active: true
      });
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });

  return { deleteProduct, isDeletingProduct };
}
