import { useSearchParams } from 'react-router-dom';
import Input from '../../ui/Input';
function BillsFilterByDoctor() {
  //1. get the doctorName (searchQuery)
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('doctor-name') || '';
  return (
    <Input
      size="large"
      autoFocus
      placeholder="اسم الطبيب"
      defaultValue={query}
      // value={searchQuery}
      onChange={(e) => {
        if (e.target.value === '') setSearchParams({ 'doctor-name': e.target.value });
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setSearchParams({ 'doctor-name': e.target.value });
        }
      }}
      onBlur={(e) => {
        setSearchParams({ 'doctor-name': e.target.value });
      }}
    />
  );
}

export default BillsFilterByDoctor;
