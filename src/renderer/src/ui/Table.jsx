import { createContext, useContext } from 'react';
import styled, { css } from 'styled-components';
const printBorderStyle = '2px solid var(--color-grey-700)';
const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  ${(props) =>
    props.width &&
    css`
      width: ${props.width};
      overflow-x: auto;
    `}
  @media print {
    width: fit-content;
    overflow: unset;
    overflow-wrap: anywhere;
    border: ${printBorderStyle};
  }
`;

//* so one value -> no redundanty

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  ${(props) =>
    props.maxwidth &&
    css`
      @media (max-width: ${props.maxwidth}px) {
        grid-template-columns: 1fr 2fr 0.5fr;
      }
    `}
  ${(props) =>
    props.hidelastcolumn &&
    css`
      @media screen {
        grid-template-columns: ${props.columns.substring(0, props.columns.lastIndexOf(' '))};
        & > :last-child {
          display: none;
        }
      }
    `}

  /* //todo: at the right media when the table breaks */
  /* grid-template-columns:repeat(6, 100px);
  width: fit-content; */

  column-gap: 2.4rem;
  align-items: center;
  transition: none;

  @media print {
    grid-template-columns: ${(props) => props.printcolumns};
    column-gap: 0;
    min-height: 35px;
    & > div,
    & > span {
      padding-top: auto;
      /* border-right: 1px solid blue; */
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      height: 100%;
      /* padding: 5px; */
      border-left: ${printBorderStyle};
    }
    & > :first-child {
      padding-left: 2px;
      padding-right: 2px;
    }
    & > :nth-last-child(2) {
      border-left: none;
    }

    //* to remove actions column
    & > :last-child {
      display: none;
    }
  }
`;

const StyledHeader = styled(CommonRow)`
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  font-size: 1.5rem;
  color: var(--color-grey-600);
  @media print {
    padding: 0;
    border-bottom: ${printBorderStyle};
    background-color: transparent;
    color: var(--color-grey-800);
  }
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
  @media print {
    padding: 0;
    background-color: transparent;
    &:not(:last-child) {
      border-bottom: ${printBorderStyle};
    }
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
  @media print {
    margin: 0;
  }
`;

const Footer = styled.footer`
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  background-color: var(--color-grey-50);
  @media print {
    border-top: ${printBorderStyle};
    background-color: transparent;
  }
  /* display: flex;
  justify-content: flex-start; */
  /* align-items: center; */
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContext = createContext();

function Table({
  columns,
  children,
  maxwidth,
  width,
  printcolumns,
  tableRole, // not used (it was used to stlye last row for the desposit row)
  hidelastcolumn = false
}) {
  return (
    <TableContext.Provider value={{ columns, maxwidth, printcolumns, hidelastcolumn, tableRole }}>
      <StyledTable width={width} role="table">
        {children}
      </StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns, maxwidth, printcolumns, hidelastcolumn } = useContext(TableContext);
  return (
    <StyledHeader
      role="row"
      columns={columns}
      maxwidth={maxwidth}
      printcolumns={printcolumns}
      hidelastcolumn={hidelastcolumn}
      as="header"
    >
      {children}
    </StyledHeader>
  );
}
function Row({ children }) {
  const { columns, maxwidth, printcolumns, hidelastcolumn, tableRole } = useContext(TableContext);
  return (
    <StyledRow
      role="row"
      columns={columns}
      maxwidth={maxwidth}
      printcolumns={printcolumns}
      hidelastcolumn={hidelastcolumn}
      tableRole={tableRole}
    >
      {children}
    </StyledRow>
  );
}
function Body({ data, render }) {
  return <StyledBody>{data.map((d) => render(d))}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
