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
import { formatCurrency, handleSaveCreateNewBill } from '../../utils/helpers';
import BillDepositsTable from '../deposits/BillDepositsTable';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import AddDepositForm from '../deposits/addDepositForm';
import { usePrintPreview } from '../../hooks/usePrintPreview';
import '../../styles/fonts.css';
import LabContactInfo from '../../ui/LabContactInfo';
import { useSaveBill } from './useSaveBill';
import { useCreateBill } from './useCreateBill';
import ConfirmCreate from '../../ui/ConfirmCreate';
// just for bill
const headingPrintFontSize = '1.32rem'; // 1.3
const StyledBillDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  .print-only {
    display: none;
  }
  @media print {
    display: flex;
    page-break-before: always;
    /* zoom: 62%; */
    /* font-size: 0.5rem; */
    button {
      display: none;
    }
    .no-print {
      display: none;
    }
    .print-only {
      display: flex;
    }
    @page {
      size: auto;
      margin: 0.5in 0.2in;
    }
  }
`;

const BillDepositsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  @media print {
    flex-direction: row;
    align-items: flex-start;
    gap: 0.8rem;
  }
`;

const BillContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const PrintTitle = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 1.5rem;
  color: var(--color-grey-600);
  display: none;
  @media print {
    display: block;
  }
`;

const TableHeading = styled.div`
  @media print {
    font-size: ${headingPrintFontSize};
  }
`;

const BillActions = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  @media print {
    display: none;
  }
`;
const Summary = styled.div`
  display: flex;
  gap: 1.2rem;
  //todo: which is better (just comment print media and make screen for all)
  & > div {
    flex-wrap: wrap;
  }
  @media print {
    /* flex-direction: column; */
    align-items: flex-start;
  }
`;
const SummaryBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  background-color: var(--color-grey-100);
  padding: 0.6rem 1.2rem;
  border-radius: 7px;
  font-size: 1.5rem;
  flex-grow: 1;
  @media print {
    font-size: ${headingPrintFontSize};
    border-radius: 5px;
    border: 1.5px solid var(--color-grey-700);
    background-color: var(--color-grey-50);
  }
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
  align-items: center;
  column-gap: 1.6rem;
`;
const CustomHeading = styled(Heading)`
  margin-bottom: -60px;
  font-size: 2.2rem;
`;
function BillDetails() {
  const { billId } = useParams();
  const moveBack = useMoveBack();
  const { isLoading, bill, error } = useBill();
  const { isLoading: isLoadingPurchases, purchases, error: purchasesError } = useBillPurchases();
  const { ref, onPreview } = usePrintPreview();
  const { saveBillAsync, isSavingBill } = useSaveBill();
  const { createBillAsync, isCreatingBill } = useCreateBill();

  if (isLoading || isLoadingPurchases) return <Spinner />;
  if (error || purchasesError) return <Error message="تعذر تحميل الفاتورة" />;
  const doctor = bill.doctor;
  const isActiveBill = doctor.activeBillId === bill.id;
  const balanceToView = isActiveBill ? doctor.balance : bill.balanceSnap;
  const requiredToPaid = formatCurrency(
    formatCurrency(bill.totalPrice) + formatCurrency(bill.outstandingAmount)
  );
  const remaining = formatCurrency(formatCurrency(balanceToView) - formatCurrency(requiredToPaid));

  function handleNewBill() {
    if (!isActiveBill) return;
    handleSaveCreateNewBill(saveBillAsync, createBillAsync, {
      doctorId: doctor.id,
      balance: doctor.balance,
      billId: bill.id,
      totalPrice: bill.totalPrice,
      outstandingAmount: bill.outstandingAmount
    });
  }
  const isLoadingNewBill = isSavingBill || isCreatingBill;
  return (
    <StyledBillDetails ref={ref}>
      <Row type="horizontal" className="no-print">
        <Heading as="h1">الفاتورة #{billId}</Heading>
        <ButtonText onClick={moveBack}>رجوع &larr;</ButtonText>
      </Row>

      <CustomHeading as="h1" className="print-only">
        كشف حساب تفصيلي
      </CustomHeading>
      <Row type="horizontal">
        <Heading as="h2">الطبيب: {doctor.fullName} </Heading>
        <BillActions>
          <Button onClick={onPreview}>طباعة الفاتورة</Button>
          {isActiveBill && (
            <Modal>
              <Modal.Open opens={billId}>
                <Button variation="secondary">
                  {/*add* disabled here */}
                  فاتورة جديدة
                </Button>
              </Modal.Open>
              <Modal.Window name={billId}>
                <ConfirmCreate
                  resourceName={`إنشاء فاتورة جديدة`}
                  onConfirm={handleNewBill}
                  disabled={isLoadingNewBill}
                />
              </Modal.Window>
            </Modal>
          )}
        </BillActions>
        <LabContactInfo />
      </Row>

      <BillDepositsContainer>
        <BillContainer>
          <PrintTitle>تفاصيل التركيبات</PrintTitle>
          <Menus>
            <Table // +17 - 65 + 10 + 10 + 10 + 10 + 10 + 7
              columns="1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
              // printcolumns="80px 140px 80px 100px 50px 85px 50px 80px" //20 20 20 5
              printcolumns="65px 130px 70px 90px 40px 77px 50px 80px" //20 20 20 5
              // printcolumns="65px 120px 60px 80px 45px 85px 50px 80px"
              hidelastcolumn={!isActiveBill}
            >
              <Table.Header>
                <TableHeading>رقم الحالة</TableHeading>
                <TableHeading>نوع الحالة</TableHeading>
                <TableHeading>التاريخ</TableHeading>
                <TableHeading>اسم المريض</TableHeading>
                <TableHeading>اللون</TableHeading>
                <TableHeading>سعر المنتج</TableHeading>
                <TableHeading>الكمية</TableHeading>
                <TableHeading>الإجمالي</TableHeading>
                <TableHeading>الأكشن</TableHeading>
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
                    <Row type="horizontal" style={{ gap: '1.2rem' }}>
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
                    </Row>
                    <Row type="horizontal" style={{ gap: '1.2rem' }}>
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
                    </Row>
                  </Summary>
                  {isActiveBill && <AddPurchase />}
                </FooterContainer>
              </Table.Footer>
            </Table>
          </Menus>
        </BillContainer>

        <DepositsContainer>
          <PrintTitle>تفاصيل سداد النقدية</PrintTitle>
          <Row type="horizontal" className="no-print">
            <Heading as="h2">الإيداعات</Heading>
            {isActiveBill && (
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
            )}
          </Row>
          <BillDepositsTable isActiveBill={isActiveBill} />
        </DepositsContainer>
      </BillDepositsContainer>
    </StyledBillDetails>
  );
}

export default BillDetails;
