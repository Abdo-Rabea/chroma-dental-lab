import styled from 'styled-components';
import Table from '../../ui/Table';
import Button from '../../ui/Button';
import EditProductPriceForm from './EditProductPriceForm';
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
  const { id, name, price } = product;

  return (
    <Table.Row>
      <Product>{name}</Product>
      {/* make me input */}
      <EditProductPriceForm product={product} />
      <ButtonContainer>
        {/* //todo: resize after adding input field */}
        <Button variation="danger" size="medium">
          حذف
        </Button>
      </ButtonContainer>
    </Table.Row>
  );
}

export default ProductRow;
