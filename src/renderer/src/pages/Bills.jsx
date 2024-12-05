import BillsFilterByDoctor from '../features/bills/BillsFilterByDoctor';
import BillsTable from '../features/bills/BillsTable';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Bills() {
  //* you will redirect here to show all bills for specific doctor bills:/doctorId

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">الفواتير</Heading>
        <BillsFilterByDoctor />
      </Row>
      <Row>
        <BillsTable />
      </Row>
    </>
  );
}

export default Bills;
