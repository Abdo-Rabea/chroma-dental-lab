import styled from 'styled-components';
import Table from '../../ui/Table';
import { formatCurrency, formatTimestampToDate } from '../../utils/helpers';
import Modal from '../../ui/Modal';
import Menus from '../../ui/Menus';
import { RiBillFill } from 'react-icons/ri';
import { HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useNavigate } from 'react-router-dom';
import { useDeleteBill } from './useDeleteBill';

const DoctorName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;
const CommonRow = styled.div`
  font-weight: 600;
`;
function BillsRow({ bill }) {
  const navigate = useNavigate();
  const { deleteBill, isDeletingBill } = useDeleteBill();
  const {
    id,
    createdAt,
    totalPrice,
    outstandingAmount,
    balanceSnap,

    doctor: { fullName, balance, activeBillId }
  } = bill;

  const isActiveBill = activeBillId === id;
  const balanceToView = isActiveBill ? balance : balanceSnap;
  const requiredToPaid = formatCurrency(
    formatCurrency(totalPrice) + formatCurrency(outstandingAmount)
  );

  function handleDeleteBill() {
    deleteBill(id);
  }
  return (
    <Table.Row role="row">
      <CommonRow>{id}</CommonRow>
      <DoctorName>{fullName}</DoctorName>
      <CommonRow>{formatTimestampToDate(createdAt)} </CommonRow>
      <CommonRow>{requiredToPaid} </CommonRow>
      <CommonRow>{formatCurrency(balanceToView)} </CommonRow>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Menus.Button icon={<RiBillFill />} onClick={() => navigate(`/bill/${bill?.id}`)}>
              عرض الفاتورة
            </Menus.Button>
            {isActiveBill === false && (
              <Modal.Open opens="deleteBill">
                <Menus.Button icon={<HiTrash />}>حذف الفاتورة</Menus.Button>
              </Modal.Open>
            )}
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="deleteBill">
          <ConfirmDelete
            resourceName={`الفاتورة #${id}`}
            onConfirm={handleDeleteBill}
            disabled={isDeletingBill}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

// todo: test deleting purchases
export default BillsRow;
