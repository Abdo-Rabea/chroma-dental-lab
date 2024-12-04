import styled from 'styled-components';
import Table from '../../ui/Table';
import { formatCurrency, formatTimestampToDate } from '../../utils/helpers';
import { HiTrash } from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import Menus from '../../ui/Menus';
import { RiEdit2Fill } from 'react-icons/ri';
import EditPurchaseForm from '../purchases/EditPurchaseForm';
import { useDeletePurchase } from '../purchases/useDeletePurchase';
import ConfirmDelete from '../../ui/ConfirmDelete';
const printValueFontSize = '1.2rem';
const ProductName = styled.div`
  font-size: 1.6rem;
  direction: ltr;
  @media print {
    font-size: 1.3rem; // inherit but i want to increase
    /* font-size: ${printValueFontSize}; */
  }
  font-weight: 600;
  color: var(--color-grey-600);
`;
const CommonRow = styled.div`
  font-weight: 600;
  @media print {
    font-size: ${printValueFontSize};
  }
`;
function BillRow({ purchase }) {
  const { deletePurchase, isDeletingPurchase } = useDeletePurchase();
  const {
    id: purchaseId,
    productName,
    productPrice,
    quantity,
    color,
    patientName,
    createdAt
  } = purchase;

  function handleDeletePurchase() {
    deletePurchase(purchaseId);
  }

  return (
    <Table.Row role="row">
      <CommonRow>{1234}</CommonRow>
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
            <Modal.Open opens="deletePurchase">
              <Menus.Button icon={<HiTrash />}>حذف الحالة</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="editPurchase">
          <EditPurchaseForm purchase={purchase} />
        </Modal.Window>
        <Modal.Window name="deletePurchase">
          <ConfirmDelete
            resourceName={`الحالة ${patientName}`}
            onConfirm={handleDeletePurchase}
            disabled={isDeletingPurchase}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BillRow;
