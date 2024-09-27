import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createBill as apiCreateBill } from '../../services/apiBills';
import { useNavigate } from 'react-router-dom';

export function useCreateBill() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const {
    mutate: createBill,
    mutateAsync: createBillAsync,
    isPending: isCreatingBill
  } = useMutation({
    mutationFn: apiCreateBill,
    onSuccess: (newBillId) => {
      queryClient.invalidateQueries({
        active: true
      });
      toast.success('تم إنشاء الفاتورة بنجاح');
      navigate(`/bill/${newBillId}`);
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });

  return { createBill, createBillAsync, isCreatingBill };
}
