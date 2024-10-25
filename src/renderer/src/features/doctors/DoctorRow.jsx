import styled from 'styled-components';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { HiMiniSquare3Stack3D, HiTrash } from 'react-icons/hi2';
import { FaMoneyBill } from 'react-icons/fa6';
import { RiBillFill } from 'react-icons/ri';
import { IoIosCreate } from 'react-icons/io';
import { formatCurrency, handleSaveCreateNewBill } from '../../utils/helpers';
import AddDepositForm from '../deposits/addDepositForm';
import Modal from '../../ui/Modal';
import { useNavigate } from 'react-router-dom';
import { useSaveBill } from '../bills/useSaveBill';
import { useCreateBill } from '../bills/useCreateBill';
import { useDeleteDoctor } from './useDeleteDoctor';
import ConfirmDelete from '../../ui/ConfirmDelete';

const Doctor = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Wallet = styled.div`
  font-weight: 600;
`;

const OutstandingAmount = styled.div`
  font-weight: 600;
`;
const Quantatiy = styled.div`
  font-weight: 600;
`;
const QuantatiyPrice = styled.div`
  font-weight: 600;
`;

function DoctorRow({ doctor }) {
  const navigate = useNavigate();
  const bill = doctor?.bill;
  const { id: doctorId, fullName, balance, activeBillId } = doctor;

  const { saveBillAsync, isSavingBill } = useSaveBill();
  const { createBillAsync, isCreatingBill } = useCreateBill();
  const { deleteDoctor, isDeletingDoctor } = useDeleteDoctor();
  function handleNewBill() {
    handleSaveCreateNewBill(saveBillAsync, createBillAsync, {
      doctorId,
      balance,
      billId: bill?.id,
      totalPrice: bill?.totalPrice,
      outstandingAmount: bill?.outstandingAmount,
      activeBillId
    });
  }
  // const isLoadingNewBill = isSavingBill || isCreatingBill;
  function handleDeleteDoctor() {
    deleteDoctor(doctorId);
  }
  return (
    <Table.Row role="row">
      <Doctor>{fullName}</Doctor>
      <Wallet>{formatCurrency(balance)} </Wallet>
      {bill ? (
        <OutstandingAmount>{formatCurrency(bill?.outstandingAmount)}</OutstandingAmount>
      ) : (
        <span>&mdash;</span>
      )}
      {bill ? <Quantatiy>{bill?.totalQuantity}</Quantatiy> : <span>&mdash;</span>}
      {bill ? (
        <QuantatiyPrice>{formatCurrency(bill?.totalPrice)}</QuantatiyPrice>
      ) : (
        <span>&mdash;</span>
      )}
      {/* action*/}
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={doctorId} />
          <Menus.List id={doctorId}>
            {bill && (
              <Modal.Open opens="deposit">
                <Menus.Button icon={<FaMoneyBill />}>إيداع مبلغ</Menus.Button>
              </Modal.Open>
            )}
            {bill && (
              <Menus.Button icon={<RiBillFill />} onClick={() => navigate(`/bill/${bill?.id}`)}>
                عرض الفاتورة
              </Menus.Button>
            )}
            {bill && (
              <Menus.Button
                icon={<HiMiniSquare3Stack3D />}
                onClick={() => navigate(`/bills/?doctor-name=${fullName}`)}
              >
                عرض كل الفواتير
              </Menus.Button>
            )}
            {/* //! i deleted it to fix fault click */}
            {/* <Menus.Button icon={<IoIosCreate />} onClick={handleNewBill}>
              فاتورة جديدة
            </Menus.Button> */}
            <Modal.Open opens={'deleteDoctor'}>
              <Menus.Button icon={<HiTrash />}>حذف الطبيب</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name={'deleteDoctor'}>
          <ConfirmDelete
            resourceName={'الطبيب ' + fullName}
            onConfirm={handleDeleteDoctor}
            disabled={isDeletingDoctor}
            secondaryMessage="سوف يتم حذف كل الفواتير"
          />
        </Modal.Window>

        {bill && (
          <Modal.Window name="deposit">
            <AddDepositForm doctorId={doctorId} billId={bill?.id} />
          </Modal.Window>
        )}
      </Modal>
    </Table.Row>
  );
}

export default DoctorRow;
