import styled from 'styled-components';
import Table from '../../ui/Table';
import { formatCurrency, formatTimestampToDateTime } from '../../utils/helpers';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteDeposit } from './useDeleteDeposit';
const valueFontPrintSize = '1.1rem';
const DateTime = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
  @media print {
    font-size: ${valueFontPrintSize};
  }
`;
const Time = styled.div`
  color: var(--color-grey-500);
`;
const Date = styled.div`
  color: var(--color-grey-600);
`;

const Amount = styled.div`
  font-weight: 600;
  @media print {
    font-size: ${valueFontPrintSize};
  }
`;
const ButtonContainer = styled.div`
  display: flex;
`;
function DepositRow({ deposit, isActiveBill }) {
  const { deleteDeposit, isDeletingDeposit } = useDeleteDeposit();

  const { id, createdAt, amount } = deposit;
  const [date, time] = formatTimestampToDateTime(createdAt);
  function handleDeleteDeposit() {
    deleteDeposit(id);
  }
  return (
    <Table.Row role="row">
      <DateTime>
        {/* <Time>{time}</Time> */}
        <Date>{date}</Date>
      </DateTime>
      <Amount>{formatCurrency(amount)}</Amount>
      <ButtonContainer>
        <Modal>
          <Modal.Open opens={id}>
            <Button variation="danger" size="small" disabled={isActiveBill === false}>
              حذف
            </Button>
          </Modal.Open>
          <Modal.Window name={id}>
            <ConfirmDelete
              resourceName={`الايداع بمبلغ ${amount}`}
              onConfirm={handleDeleteDeposit}
              disabled={isDeletingDeposit}
            />
          </Modal.Window>
        </Modal>
      </ButtonContainer>
    </Table.Row>
  );
}

export default DepositRow;
