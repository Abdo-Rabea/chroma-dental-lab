import styled from 'styled-components';
import Button from './Button';
import Heading from './Heading';

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;
const Warning = styled.span`
  color: var(--color-red-700);
  margin-top: -2rem;
  font-size: 1.4rem;
  /* text-align: left; */
`;
//* modal is the one that passes onCloseModal
function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
  secondaryMessage = null
}) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">حذف {resourceName}</Heading>
      <p>هل انت متأكد من حذف {resourceName} بصورة دائمة.</p>
      {secondaryMessage && <Warning>{`${secondaryMessage} *`}</Warning>}
      <div>
        <Button variation="secondary" disabled={disabled} onClick={onCloseModal}>
          إلغاء
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          حذف
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
