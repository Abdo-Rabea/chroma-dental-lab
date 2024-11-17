import styled, { css } from 'styled-components';

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  ${(props) =>
    props.size === 'medium' &&
    css`
      padding: 0.9rem 1.2rem;
      border-radius: var(--border-radius-lg);
      font-size: 1.6rem;
    `}
  ${(props) =>
    props.size === 'large' &&
    css`
      transition: flex-basis 0.2s ease-out;
      padding: 0.9rem 1.2rem;
      border-radius: var(--border-radius-lg);
      font-size: 1.6rem;
      flex-basis: 30%;
      &:focus {
        flex-basis: calc(30% + 5px);
      }
    `}
`;

export default Input;
