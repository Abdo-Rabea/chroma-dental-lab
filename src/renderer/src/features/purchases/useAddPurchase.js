import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createPurchase } from '../../services/apiPurchases';

export function useAddPurchase() {
  const queryClient = useQueryClient();
  const { mutate: addPurchase, isPending: isAddingPurchase } = useMutation({
    mutationFn: createPurchase,
    onSuccess: () => {
      toast.success(`تم إضافة الحالة بنجاح`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });
  //* no need for the error as toast do it
  return { addPurchase, isAddingPurchase };
}
