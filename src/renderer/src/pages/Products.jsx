import AddProduct from '../features/products/AddProduct';
import ProductsTable from '../features/products/ProductsTable';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Products() {
  return (
    <>
      <Row>
        <Heading as="h1">المنتجات</Heading>
      </Row>
      <Row>
        <ProductsTable />
        <AddProduct />
      </Row>
    </>
  );
}

export default Products;
