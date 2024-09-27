import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateBillAndDoctorBalance } from '../../services/apiBills';

export function useSaveBill() {
  const queryClient = useQueryClient();
  const {
    mutate: saveBill,
    mutateAsync: saveBillAsync,
    isPending: isSavingBill
  } = useMutation({
    mutationFn: updateBillAndDoctorBalance,
    onSuccess: () => {
      queryClient.invalidateQueries({
        active: true
      });
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });

  return { saveBill, saveBillAsync, isSavingBill };
}
