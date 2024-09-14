import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updatePurchase } from '../../services/apiPurchases';

export function useEditPurchase() {
  const queryClient = useQueryClient();
  const { mutate: editPurchase, isPending: isEditingPurchase } = useMutation({
    mutationFn: updatePurchase,
    onSuccess: () => {
      toast.success(`تم تعديل الحالة بنجاح`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });
  return { editPurchase, isEditingPurchase };
}
