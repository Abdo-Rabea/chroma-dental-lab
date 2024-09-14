import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import AddPurchaseForm from './AddPurchaseForm';

function AddPurchase() {
  return (
    <Modal>
      <Modal.Open opens="purchase-form">
        <Button>إضافة حالة</Button>
      </Modal.Open>
      <Modal.Window name="purchase-form">
        <AddPurchaseForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddPurchase;
