import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDeposit as apiDeleteDeposit } from '../../services/apiDeposits';
import toast from 'react-hot-toast';

export function useDeleteDeposit() {
  const queryClient = useQueryClient();
  const { mutate: deleteDeposit, isPending: isDeletingDeposit } = useMutation({
    mutationFn: apiDeleteDeposit,
    onSuccess: () => {
      toast.success(`تم حذف الإيداع بنجاح`);
      queryClient.invalidateQueries({
        active: true
      });
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });
  //* no need for the error as toast do it
  return { deleteDeposit, isDeletingDeposit };
}
