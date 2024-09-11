import styled from 'styled-components';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import AddProductForm from './AddProductForm';
const StyledAddProduct = styled.div`
  text-align: left;
`;

function AddProduct() {
  return (
    <StyledAddProduct>
      <Modal>
        <Modal.Open opens="product-form">
          <Button>إضافة منتج جديد</Button>
        </Modal.Open>
        <Modal.Window name="product-form">
          <AddProductForm />
        </Modal.Window>
      </Modal>
    </StyledAddProduct>
  );
}

export default AddProduct;
