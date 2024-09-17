import Button from '../../ui/Button';
import Error from '../../ui/Error';
import Heading from '../../ui/Heading';
import Modal from '../../ui/Modal';
import NoDataFound from '../../ui/NoDataFound';
import Row from '../../ui/Row';
import Table from '../../ui/Table';
import AddDepositForm from './addDepositForm';
import DepositRow from './DepositRow';
import { useBillDeposits } from './useBillDeposits';

function BillDepositsTable() {
  const { isLoading, deposits, error } = useBillDeposits();
  if (isLoading) return;
  if (error) <Error message={error.message} />;
  return (
    <>
      <Table columns="150px 100px auto" width="fit-content">
        <Table.Header>
          <div>التاريخ</div>
          <div>المبلغ</div>
          <div>الأكشن</div>
        </Table.Header>

        {deposits.length === 0 && <NoDataFound />}
        {/* //* the render props pattern */}
        <Table.Body
          data={deposits}
          render={(deposit) => <DepositRow deposit={deposit} key={deposit.id} />}
        />
        <Table.Footer></Table.Footer>
      </Table>
    </>
  );
}

export default BillDepositsTable;
