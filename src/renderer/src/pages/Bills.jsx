import { useState } from 'react';
import BillsTable from '../features/bills/BillsTable';
import Heading from '../ui/Heading';
import Input from '../ui/Input';
import Row from '../ui/Row';
import { useSearchParams } from 'react-router-dom';
import CustomDatePicker from '../ui/CustomDatePicker';

function Bills() {
  //* you will redirect here to show all bills for specific doctor bills:/doctorId
  //! you should not do any logic here but it doesn't really matter (No review)

  //1. get the doctorName (searchQuery)
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('doctor-name') || '';
  const [searchQuery, setSearchQuery] = useState(query);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">الفواتير</Heading>
        <Input
          size="large"
          autoFocus
          placeholder="اسم الطبيب"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setSearchParams({ 'doctor-name': e.target.value });
          }}
        />
      </Row>
      <Row>
        <BillsTable searchQuery={searchQuery} />
      </Row>
    </>
  );
}

export default Bills;
