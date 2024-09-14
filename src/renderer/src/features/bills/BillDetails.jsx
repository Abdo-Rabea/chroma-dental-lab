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

function BillDetails() {
  const { billId } = useParams();
  const moveBack = useMoveBack();
  const { isLoading, bill, error } = useBill();
  const { isLoading: isLoadingPurchases, purchases, error: purchasesError } = useBillPurchases();

  if (isLoading || isLoadingPurchases) return <Spinner />;
  if (error || purchasesError) return <Error message="تعذر تحميل الفاتورة" />;
  const doctor = bill.doctor;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">الفاتورة #{billId}</Heading>
        <ButtonText onClick={moveBack}>رجوع &larr;</ButtonText>
      </Row>
      <Row type="horizontal">
        <Heading as="h2">الطبيب: {doctor.fullName} </Heading>
        <AddPurchase />
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
            // data={filteredCabins}
            data={purchases}
            render={(purchase) => <BillRow purchase={purchase} key={purchase.id} />}
          />

          {/* <Table.Footer><div>Footer</div></Table.Footer> */}
        </Table>
      </Menus>
      <div>{bill.totalQuantity}</div>
    </>
  );
}

export default BillDetails;
