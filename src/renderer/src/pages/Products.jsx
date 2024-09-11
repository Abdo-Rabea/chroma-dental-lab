import ProductsTable from '../features/products/ProductsTable';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Products() {
  return (
    <Row>
      <Heading as="h1">المنتجات</Heading>
      <ProductsTable />
    </Row>
  );
}

export default Products;
