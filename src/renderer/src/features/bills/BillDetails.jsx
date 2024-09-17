import { useParams } from 'react-router-dom';
import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import ButtonText from '../../ui/ButtonText';
import { useMoveBack } from '../../hooks/useMoveBack';
import Menus from '../../ui/Menus';
import Table from '../../ui/Table';
import BillRow from './BillRow';
import NoDataFound from '../../ui/NoDataFound';
import { useBill } from './useBill';
import { useBillPurchases } from '../purchases/useBillPurchases';
import Spinner from '../../ui/Spinner';
import Error from '../../ui/Error';
import AddPurchase from '../purchases/AddPurchase';
import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import BillDepositsTable from '../deposits/BillDepositsTable';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import AddDepositForm from '../deposits/addDepositForm';

const BillActions = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;
const SummaryBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  background-color: var(--color-grey-100);
  padding: 0.6rem 1.2rem;
  border-radius: 7px;
  font-size: 1.5rem;
`;
const Label = styled.div`
  font-weight: 600;
`;
const Value = styled.div`
  font-weight: 600;
  color: var(--color-grey-600);
`;
const DepositsContainer = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  column-gap: 1.6rem;
`;
const Summary = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
  align-items: center;
`;
function BillDetails() {
  const { billId } = useParams();
  const moveBack = useMoveBack();
  const { isLoading, bill, error } = useBill();
  const { isLoading: isLoadingPurchases, purchases, error: purchasesError } = useBillPurchases();

  if (isLoading || isLoadingPurchases) return <Spinner />;
  if (error || purchasesError) return <Error message="تعذر تحميل الفاتورة" />;
  const doctor = bill.doctor;
  const isActiveBill = doctor.activeBillId === bill.id;
  const balanceToView = isActiveBill ? doctor.balance : bill.balanceSnap;
  const requiredToPaid = formatCurrency(
    formatCurrency(bill.totalPrice) + formatCurrency(bill.outstandingAmount)
  );
  const remaining = formatCurrency(formatCurrency(balanceToView) - formatCurrency(requiredToPaid));

  function handlePrint() {
    window.electron.printPage();
  }
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">الفاتورة #{billId}</Heading>
        <ButtonText onClick={moveBack}>رجوع &larr;</ButtonText>
      </Row>
      <Row type="horizontal">
        <Heading as="h2">الطبيب: {doctor.fullName} </Heading>
        <BillActions>
          <Button>حفظ الفاتورة</Button>
          <Button onClick={handlePrint}>طباعة الفاتورة</Button>
        </BillActions>
      </Row>
      <Menus>
        <Table columns="1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr">
          <Table.Header>
            <div>نوع الحالة</div>
            <div>التاريخ</div>
            <div>اسم المريض</div>
            <div>اللون</div>
            <div>سعر المنتج</div>
            <div>الكمية</div>
            <div>الإجمالي</div>
            <div>الأكشن</div>
          </Table.Header>

          {purchases.length === 0 && <NoDataFound />}
          {/* //* the render props pattern */}
          <Table.Body
            data={purchases}
            render={(purchase) => <BillRow purchase={purchase} key={purchase.id} />}
          />
          <Table.Footer>
            <FooterContainer>
              <Summary>
                <SummaryBox>
                  <Label>الحساب</Label>
                  <Value>{formatCurrency(bill.totalPrice)}</Value>
                </SummaryBox>
                <SummaryBox>
                  <Label>حساب سابق</Label>
                  <Value>{formatCurrency(bill.outstandingAmount)}</Value>
                </SummaryBox>
                <SummaryBox>
                  <Label>إجمالي المطلوب</Label>
                  <Value>{requiredToPaid}</Value>
                </SummaryBox>
                <SummaryBox>
                  <Label>إجمالي المدفوع</Label>
                  <Value>{formatCurrency(balanceToView)}</Value>
                </SummaryBox>
                <SummaryBox>
                  <Label>{remaining >= 0 ? 'باقي المحفظه' : 'باقي المطلوب'}</Label>
                  <Value style={{ color: remaining >= 0 ? 'green' : 'var(--color-red-700)' }}>
                    {Math.abs(remaining)}
                  </Value>
                </SummaryBox>
              </Summary>
              <AddPurchase />
            </FooterContainer>
          </Table.Footer>
        </Table>
      </Menus>
      <DepositsContainer>
        <Row type="horizontal">
          <Heading as="h2">الإيداعات</Heading>
          <Modal>
            <Modal.Open opens="deposit">
              <Button style={{ padding: '0.8rem 1.6rem' }} size="medium">
                إيداع مبلغ
              </Button>
            </Modal.Open>
            <Modal.Window name="deposit">
              <AddDepositForm doctorId={doctor.id} billId={bill?.id} />
            </Modal.Window>
          </Modal>
        </Row>
        <BillDepositsTable />
      </DepositsContainer>
    </>
  );
}

export default BillDetails;
