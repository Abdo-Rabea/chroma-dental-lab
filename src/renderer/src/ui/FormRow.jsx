import styled, { css } from 'styled-components';

const StyledFormRow = styled.div`
  ${(props) =>
    props.type === 'complex' &&
    css`
      display: grid;
      align-items: center;
      grid-template-columns: 14rem 1fr 1.2fr;
      gap: 2.4rem;

      padding: 1.2rem 0;

      &:first-child {
        padding-top: 0;
      }

      &:last-child {
        padding-bottom: 0;
      }

      &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
      }

      &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
      }
    `}

  //* for deposit
  ${(props) =>
    props.type === 'simple' &&
    css`
      display: flex;
      flex-direction: column;
      row-gap: 5px;
      width: 30rem;
      margin-top: 2rem;
    `}
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
  height: 2.1rem; //*deposit
`;

function FormRow({ label, error, children }) {
  return (
    <StyledFormRow type={label ? 'complex' : 'simple'}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {<Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
