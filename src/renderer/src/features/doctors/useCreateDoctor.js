import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createDoctor as apiCreateDoctor } from '../../services/apiDoctors';

export function useCreateDoctor() {
  const queryClient = useQueryClient();
  const { mutate: createDoctor, isPending: isCreatingDoctor } = useMutation({
    mutationFn: apiCreateDoctor,
    onSuccess: () => {
      toast.success(`تم إضافة الطبيب بنجاح`);
      queryClient.invalidateQueries({
        active: true
      });
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });
  //* no need for the error as toast do it
  return { createDoctor, isCreatingDoctor };
}
