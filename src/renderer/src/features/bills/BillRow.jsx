import styled from 'styled-components';
import Table from '../../ui/Table';
import { formatCurrency, formatTimestampToDate } from '../../utils/helpers';
import { HiTrash } from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import Menus from '../../ui/Menus';
import { RiEdit2Fill } from 'react-icons/ri';
import EditPurchaseForm from '../purchases/EditPurchaseForm';

const ProductName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;
const CommonRow = styled.div`
  font-weight: 600;
`;
function BillRow({ purchase }) {
  const {
    id: purchaseId,
    productName,
    productPrice,
    quantity,
    color,
    patientName,
    createdAt
  } = purchase;
  return (
    <Table.Row role="row">
      <ProductName>{productName}</ProductName>
      <CommonRow>{formatTimestampToDate(createdAt)} </CommonRow>
      {patientName ? <CommonRow>{patientName} </CommonRow> : <span>&mdash;</span>}
      {color ? <CommonRow>{color}</CommonRow> : <span>&mdash;</span>}
      <CommonRow>{formatCurrency(productPrice)} </CommonRow>
      <CommonRow>{quantity}</CommonRow>
      <CommonRow>{formatCurrency(productPrice * quantity)}</CommonRow>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={purchase} />
          <Menus.List id={purchase}>
            <Modal.Open opens="editPurchase">
              <Menus.Button icon={<RiEdit2Fill />}>تعديل الحالة</Menus.Button>
            </Modal.Open>
            <Menus.Button icon={<HiTrash />}>حذف الحالة</Menus.Button>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="editPurchase">
          <EditPurchaseForm purchase={purchase} />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BillRow;
