import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaFileInvoiceDollar, FaUserDoctor, FaWallet } from 'react-icons/fa6';
import { RiToothFill } from 'react-icons/ri';

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    justify-content: right;
    color: var(--color-grey-600);
    font-size: 1.8rem;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/doctors">
            <FaUserDoctor />
            <span>الأطباء</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/bills">
            <FaFileInvoiceDollar />
            <span>الفواتير</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/deposits">
            <FaWallet />
            <span>الايداعات</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/products">
            <RiToothFill />
            <span>المنتجات</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
