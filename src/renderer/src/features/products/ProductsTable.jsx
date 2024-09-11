import Error from '../../ui/Error';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import ProductRow from './ProductRow';
import { useProducts } from './useProducts';

function ProductsTable() {
  const { isLoading, products, error } = useProducts();
  if (error) return <Error message={error.message} />;
  if (isLoading) return <Spinner />;
  return (
    //todo: enhance the desing i think minmax(1fr, custome pixle value)
    <Table columns="200px 400px 70px" maxwidth={1125}>
      <Table.Header>
        <div>اسم المنتج</div>
        <div>السعر</div>
        <div>الاكشن</div>
      </Table.Header>

      <Table.Body
        data={products}
        render={(product) => <ProductRow product={product} key={product.id} />}
      />

      <Table.Footer>{/* <div>Footer</div> */}</Table.Footer>
    </Table>
  );
}

export default ProductsTable;
