import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteBill as apiDeleteBill } from '../../services/apiBills';

export function useDeleteBill() {
  const queryClient = useQueryClient();
  const { mutate: deleteBill, isPending: isDeletingBill } = useMutation({
    mutationFn: apiDeleteBill,
    onSuccess: () => {
      toast.success(`تم حذف الفاتورة بنجاح`);
      queryClient.invalidateQueries({
        active: true
      });
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });
  //* no need for the error as toast do it
  return { deleteBill, isDeletingBill };
}
