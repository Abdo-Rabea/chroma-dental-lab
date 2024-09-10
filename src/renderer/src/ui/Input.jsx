import styled, { css } from 'styled-components';

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  padding: 0.8rem 1.2rem;
  ${(props) =>
    props.size === 'medium' &&
    css`
      padding: 0.9rem 1.2rem;
      border-radius: var(--border-radius-lg);
      font-size: 1.6rem;
    `}
`;

export default Input;
