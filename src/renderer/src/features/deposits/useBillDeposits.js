import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getDepositsByBillId } from '../../services/apiDeposits';

export function useBillDeposits() {
  const { billId } = useParams();

  const {
    isLoading,
    data: deposits,
    error
  } = useQuery({
    queryKey: ['deposits', billId],
    queryFn: () => getDepositsByBillId(billId)
  });
  return { isLoading, deposits, error };
}
