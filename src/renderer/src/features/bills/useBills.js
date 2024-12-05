import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllBills } from '../../services/apiBills';
import { PAGE_SIZE } from '../../utils/constants';
import { useSearchParams } from 'react-router-dom';

export function useBills() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const filterByDoctorName = (searchParams.get('doctor-name') || '').trim();

  const {
    isLoading,
    data: { data: bills, count } = {},
    error
  } = useQuery({
    queryKey: ['bills', filterByDoctorName, currentPage],
    queryFn: () => getAllBills({ filterByDoctorName, currentPage, PAGE_SIZE })
  });

  const numPages = Math.ceil(count / PAGE_SIZE);
  if (currentPage < numPages)
    queryClient.prefetchQuery({
      queryKey: ['bills', filterByDoctorName, currentPage + 1], // what an elegand feature
      queryFn: () => getAllBills({ filterByDoctorName, currentPage: currentPage + 1, PAGE_SIZE })
    });

  //* you need to still prefetch previous this because there is a combination of other stuff like filter , sorting
  if (currentPage > 1)
    queryClient.prefetchQuery({
      queryKey: ['bills', filterByDoctorName, currentPage - 1], // what an elegand feature
      queryFn: () => getAllBills({ filterByDoctorName, currentPage: currentPage - 1, PAGE_SIZE })
    });
  return { isLoading, bills, count, error };
}
