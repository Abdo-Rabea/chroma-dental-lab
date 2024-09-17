import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deletePurchase as apiDeletePurchase } from '../../services/apiPurchases';

export function useDeletePurchase() {
  const queryClient = useQueryClient();
  const { mutate: deletePurchase, isPending: isDeletingPurchase } = useMutation({
    mutationFn: apiDeletePurchase,
    onSuccess: () => {
      toast.success(`تم حذف الحالة بنجاح`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });
  //* no need for the error as toast do it
  return { deletePurchase, isDeletingPurchase };
}
