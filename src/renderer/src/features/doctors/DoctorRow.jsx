import styled from 'styled-components';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import { FaMoneyBill } from 'react-icons/fa6';
import { RiBillFill } from 'react-icons/ri';
import { IoIosCreate } from 'react-icons/io';
import { createDeposit } from '../../services/apiDeposits';
import { formatCurrency } from '../../utils/helpers';
import Form from '../../ui/Form';
import { useState } from 'react';
import AddDepositForm from '../deposits/addDepositForm';
import Modal from '../../ui/Modal';
//todo: can you formate the currency?

const Doctor = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Wallet = styled.div`
  font-weight: 600;
`;

const PatientsNum = styled.div`
  font-weight: 600;
`;
const Quantatiy = styled.div`
  font-weight: 600;
`;
const QuantatiyPrice = styled.div`
  font-weight: 600;
`;

function DoctorRow({ doctor }) {
  const bill = doctor.bill;
  const [isOpenForm, setIsOpenForm] = useState();

  function handleDeposit() {
    createDeposit(doctor.id, bill.id, 200.0000055);
  }
  return (
    <Table.Row role="row">
      <Doctor>{doctor.fullName}</Doctor>
      <Wallet>{formatCurrency(doctor.balance)} </Wallet>
      {bill ? <PatientsNum>{bill?.patientsNum}</PatientsNum> : <span>&mdash;</span>}
      {bill ? <Quantatiy>{bill?.totalQuantity}</Quantatiy> : <span>&mdash;</span>}
      {bill ? <QuantatiyPrice>{bill?.totalPrice}</QuantatiyPrice> : <span>&mdash;</span>}
      {/* action*/}
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={doctor.id} />
          <Menus.List id={doctor.id}>
            {bill && (
              <Modal.Open opens="deposit">
                <Menus.Button icon={<FaMoneyBill />} onClick={() => setIsOpenForm((e) => !e)}>
                  إيداع مبلغ
                </Menus.Button>
              </Modal.Open>
            )}
            {bill && <Menus.Button icon={<RiBillFill />}>عرض الفاتورة</Menus.Button>}
            <Menus.Button icon={<IoIosCreate />}>فاتورة جديدة</Menus.Button>
            <Menus.Button icon={<HiTrash />}>حذف الطبيب</Menus.Button>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="deposit">
          <AddDepositForm />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default DoctorRow;
