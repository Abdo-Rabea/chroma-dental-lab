import styled from 'styled-components';

const StyledNoDataFound = styled.div`
  color: var(--color-red-700);
  font-size: larger;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
function NoDataFound() {
  return <StyledNoDataFound>لا يوجد بيانات</StyledNoDataFound>;
}

export default NoDataFound;
