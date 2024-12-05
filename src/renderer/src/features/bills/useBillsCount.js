import { useQuery } from '@tanstack/react-query';
import { getBillsCount } from '../../services/apiBills';

export function useBillsCount() {
  const {
    isLoading,
    data: count,
    error
  } = useQuery({
    queryKey: ['billsCount'],
    queryFn: getBillsCount
  });
  return { isLoading, count, error };
}
