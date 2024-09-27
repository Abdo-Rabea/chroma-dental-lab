import Error from '../../ui/Error';
import Menus from '../../ui/Menus';
import NoDataFound from '../../ui/NoDataFound';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import DoctorRow from './DoctorRow';
import { useDoctors } from './useDoctors';

function DoctorTable() {
  const { isLoading, doctors, error } = useDoctors();

  if (error) return <Error message="تعذر تحميل بيانات الأطباء" />;
  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns="1.6fr 1fr 1fr 1fr 1fr 1fr">
        <Table.Header>
          <div>الاسم</div>
          <div>المحفظة</div>
          <div>حساب سابق</div>
          <div>الكمية</div>
          <div>سعر الكمية</div>
          <div>الاكشن</div>
        </Table.Header>

        {doctors.length === 0 && <NoDataFound />}
        {/* //* the render props pattern */}
        <Table.Body
          // data={filteredCabins}
          data={doctors}
          render={(doctor) => <DoctorRow doctor={doctor} key={doctor.id} />}
        />

        {/* <Table.Footer><div>Footer</div></Table.Footer> */}
      </Table>
    </Menus>
  );
}

export default DoctorTable;
