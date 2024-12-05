import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { PAGE_SIZE } from '../utils/constants';

const StyledPagination = styled.div`
  /* direction: ltr; */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const P = styled.p`
  font-size: 1.4rem;
  & > span {
    display: inline-block;
    font-weight: 600;
    min-width: 20px;
    text-align: center;
  }
`;

// const Buttons = styled.div`
//   display: flex;
//   gap: 0.6rem;
// `;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? ' var(--color-brand-600)' : 'var(--color-grey-50)'};
  color: ${(props) => (props.active ? ' var(--color-brand-50)' : 'inherit')};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-right: 0.4rem;
  }

  &:has(span:first-child) {
    padding-left: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ count = 0 }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const pageCount = Math.ceil(count / PAGE_SIZE);
  const isLastPage = currentPage === pageCount,
    isFirstPage = currentPage === 1;

  function nextPage() {
    const next = isLastPage ? currentPage : currentPage + 1;
    searchParams.set('page', next);
    setSearchParams(searchParams);
  }
  function prevPage() {
    const prev = isFirstPage ? currentPage : currentPage - 1;
    searchParams.set('page', prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;
  return (
    <StyledPagination>
      <PaginationButton onClick={prevPage} disabled={isFirstPage}>
        <HiChevronRight />
        <span>السابق</span>
      </PaginationButton>
      <P>
        عرض <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> إلي{' '}
        <span>{Math.min(currentPage * PAGE_SIZE, count)} </span> من {` `}
        <span>{count}</span>
      </P>
      <PaginationButton onClick={nextPage} disabled={isLastPage}>
        <span>التالي</span>
        <HiChevronLeft />
      </PaginationButton>
    </StyledPagination>
  );
}

export default Pagination;
