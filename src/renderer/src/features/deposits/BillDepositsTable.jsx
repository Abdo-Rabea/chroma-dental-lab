import styled from 'styled-components';
import Error from '../../ui/Error';
import NoDataFound from '../../ui/NoDataFound';
import Table from '../../ui/Table';
import DepositRow from './DepositRow';
import { useBillDeposits } from './useBillDeposits';
const headingPrintFontSize = '1.3rem';

const TableHeading = styled.div`
  @media print {
    font-size: ${headingPrintFontSize};
  }
`;
function BillDepositsTable({ isActiveBill }) {
  const { isLoading, deposits, error } = useBillDeposits();
  if (isLoading) return;
  if (error) <Error message={error.message} />;
  return (
    <>
      <Table
        columns="150px 100px auto"
        width="fit-content"
        printcolumns="70px 70px"
        hidelastcolumn={isActiveBill === false}
        tableRole="depositsTable"
      >
        <Table.Header>
          <TableHeading>التاريخ</TableHeading>
          <TableHeading>المبلغ</TableHeading>
          <TableHeading>الأكشن</TableHeading>
        </Table.Header>

        {deposits.length === 0 && <NoDataFound />}
        {/* //* the render props pattern */}
        <Table.Body
          data={deposits}
          render={(deposit) => (
            <DepositRow deposit={deposit} key={deposit.id} isActiveBill={isActiveBill} />
          )}
        />
        <Table.Footer></Table.Footer>
      </Table>
    </>
  );
}

export default BillDepositsTable;
