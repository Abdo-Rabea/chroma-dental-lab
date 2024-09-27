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

//* modal is the one that passes onCloseModal
function ConfirmCreate({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">تأكيد {resourceName}</Heading>
      <p>هل انت متأكد من {resourceName}.</p>

      <div>
        <Button variation="secondary" disabled={disabled} onClick={onCloseModal}>
          إلغاء
        </Button>
        <Button variation="primary" disabled={disabled} onClick={onConfirm}>
          تأكيد
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmCreate;
