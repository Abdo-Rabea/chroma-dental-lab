import { useQuery } from '@tanstack/react-query';
import { getAllBills } from '../../services/apiBills';

export function useBills() {
  const {
    isLoading,
    data: bills,
    error
  } = useQuery({
    queryKey: ['bills'],
    queryFn: getAllBills
  });
  return { isLoading, bills, error };
}
