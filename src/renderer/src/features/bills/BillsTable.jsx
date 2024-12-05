import Error from '../../ui/Error';
import Menus from '../../ui/Menus';
import NoDataFound from '../../ui/NoDataFound';
import Pagination from '../../ui/Pagination';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import BillsRow from './BillsRow';
import { useBills } from './useBills';

function BillsTable() {
  //2. load All Bills

  const { isLoading, bills, count, error } = useBills();

  if (error) return <Error message={error.message} />;
  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns=".8fr 1.6fr 1fr 1fr 1fr 1fr ">
        <Table.Header>
          <div>رقم الفاتورة</div>
          <div>اسم الطبيب</div>
          <div>التاريخ</div>
          <div>الإجمالي</div>
          <div>المدفوع</div>
          <div>الاكشن</div>
        </Table.Header>

        {bills.length === 0 && <NoDataFound />}
        <Table.Body data={bills} render={(bill) => <BillsRow bill={bill} key={bill.id} />} />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BillsTable;
