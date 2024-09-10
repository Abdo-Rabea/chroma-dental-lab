import DoctorTable from '../features/doctors/DoctorTable';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Doctors() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">الأطباء</Heading>
        {/* <DoctorsTableOperations /> */}
      </Row>
      <Row>
        <DoctorTable />
        {/* <AddCabin />  */}
      </Row>
    </>
  );
}

export default Doctors;
