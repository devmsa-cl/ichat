import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`body {
    background-color: ${({ theme }) => theme.bg};
    margin: 0;
    padding: 0;
    font-family: "Lato", sans-serif;
    font-size: 62.5%;
    transition: background-color .3s;
    color: ${({ theme }) => theme.textColor}
}`;
