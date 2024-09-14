import { useQuery } from '@tanstack/react-query';
import { getBillById } from '../../services/apiBills';
import { useParams } from 'react-router-dom';

export function useBill() {
  const { billId } = useParams();

  const {
    isLoading,
    data: bill,
    error
  } = useQuery({
    queryKey: ['bill', billId],
    queryFn: () => getBillById(billId)
  });
  return { isLoading, bill, error };
}
