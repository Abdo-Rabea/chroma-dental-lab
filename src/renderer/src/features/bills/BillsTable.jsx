import Error from '../../ui/Error';
import Menus from '../../ui/Menus';
import NoDataFound from '../../ui/NoDataFound';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import BillsRow from './BillsRow';
import { useBills } from './useBills';

function BillsTable({ searchQuery }) {
  //2. load All Bills
  const { isLoading, bills, error } = useBills();

  if (error) return <Error message={error.message} />;
  if (isLoading) return <Spinner />;
  //3. filter
  let filterdBills = bills;
  if (searchQuery)
    filterdBills = filterdBills.filter((bill) =>
      bill.doctor.fullName.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
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
        <Table.Body data={filterdBills} render={(bill) => <BillsRow bill={bill} key={bill.id} />} />

        {/* <Table.Footer><div>Footer</div></Table.Footer> */}
      </Table>
    </Menus>
  );
}

export default BillsTable;
