import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteDoctor as apiDeleteDoctor } from '../../services/apiDoctors';

export function useDeleteDoctor() {
  const queryClient = useQueryClient();
  const { mutate: deleteDoctor, isPending: isDeletingDoctor } = useMutation({
    mutationFn: apiDeleteDoctor,
    onSuccess: () => {
      toast.success(`تم حذف الطبيب بنجاح`);
      queryClient.invalidateQueries({
        active: true
      });
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });
  //* no need for the error as toast do it
  return { deleteDoctor, isDeletingDoctor };
}
