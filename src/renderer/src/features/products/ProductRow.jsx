import styled from 'styled-components';
import Table from '../../ui/Table';
import Button from '../../ui/Button';
import EditProductPriceForm from './EditProductPriceForm';
import { useDeleteProduct } from './useDeleteProduct';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
const Product = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Price = styled.div`
  font-weight: 600;
`;
const ButtonContainer = styled.div`
  display: flex;
`;

function ProductRow({ product }) {
  const { deleteProduct, isDeletingProduct } = useDeleteProduct();
  const { id, name } = product;

  function handleDeleteProduct() {
    deleteProduct(id);
  }
  return (
    <Table.Row>
      <Product>{name}</Product>
      <EditProductPriceForm product={product} />
      <ButtonContainer>
        <Modal>
          <Modal.Open opens={id}>
            <Button variation="danger" size="medium">
              حذف
            </Button>
          </Modal.Open>
          <Modal.Window name={id}>
            <ConfirmDelete
              resourceName={name}
              onConfirm={handleDeleteProduct}
              disabled={isDeletingProduct}
            />
          </Modal.Window>
        </Modal>
      </ButtonContainer>
    </Table.Row>
  );
}

export default ProductRow;
