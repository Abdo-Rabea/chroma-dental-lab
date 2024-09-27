import styled from 'styled-components';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateDoctorForm from './CreateDoctorForm';

const StyledAddDoctor = styled.div`
  text-align: left;
`;
function AddDoctor() {
  return (
    <StyledAddDoctor>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>إضافة طبيب جديد</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateDoctorForm />
        </Modal.Window>
      </Modal>
    </StyledAddDoctor>
  );
}

export default AddDoctor;
