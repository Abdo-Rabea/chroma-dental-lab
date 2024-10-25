import styled from 'styled-components';
import logoLight from '../assets/logo-light.svg';
import logoDark from '../assets/logo-dark.svg';
import { useDarkMode } from '../context/DarkModeContext';
import { CgHello } from 'react-icons/cg';
const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();
  const src = isDarkMode ? logoDark : logoLight;
  return (
    <StyledLogo>
      <Img src={src} alt="logo" />
    </StyledLogo>
  );
}

export default Logo;
