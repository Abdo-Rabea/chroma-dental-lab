import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDeposit } from '../../services/apiDeposits';
import toast from 'react-hot-toast';

export function useAddDeposit() {
  const queryClient = useQueryClient();
  const { mutate: addDeposit, isPending: isAddingDeposit } = useMutation({
    mutationFn: createDeposit,
    onSuccess: () => {
      toast.success(`تم ايداع المبلغ بنجاح`);
      queryClient.invalidateQueries({
        active: true
      });
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });
  //* no need for the error as toast do it
  return { addDeposit, isAddingDeposit };
}
