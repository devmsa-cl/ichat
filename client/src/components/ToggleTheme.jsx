import styled from 'styled-components';
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md';
function ToggleTheme({ handle, theme }) {
  return (
    <Toggle onClick={handle}>
      {theme === 'light' ? <MdDarkMode /> : <MdOutlineDarkMode />}
    </Toggle>
  );
}

const Toggle = styled.div`
  cursor: pointer;
  font-size: 1.8rem;
  position: fixed;
  top: 10px;
  right: 10px;
`;

export default ToggleTheme;
