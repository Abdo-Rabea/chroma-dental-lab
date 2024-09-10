import { useQuery } from '@tanstack/react-query';
import { getDoctors } from '../../services/apiDoctors';

export function useDoctors() {
  const {
    isLoading,
    data: doctors,
    error
  } = useQuery({
    queryKey: ['cabins'],
    queryFn: getDoctors
  });
  return { isLoading, doctors, error };
}
