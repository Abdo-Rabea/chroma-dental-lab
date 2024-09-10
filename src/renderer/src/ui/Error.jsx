import styled from 'styled-components';

const StyledError = styled.div`
  background-color: var(--color-grey-100);
  color: var(--color-red-700);
  padding: 4.8rem;
  text-align: center;
  font-size: 1.7rem;
`;
function Error({ message }) {
  return <StyledError>{message}</StyledError>;
}
export default Error;
