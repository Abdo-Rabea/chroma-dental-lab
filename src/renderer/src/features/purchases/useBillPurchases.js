import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBillPurchases } from '../../services/apiPurchases';

export function useBillPurchases() {
  const { billId } = useParams();

  const {
    isLoading,
    data: purchases,
    error
  } = useQuery({
    queryKey: ['purchases', billId],
    queryFn: () => getBillPurchases(billId)
  });
  return { isLoading, purchases, error };
}
