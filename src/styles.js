import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Allenoire';
    src: url('public/Allenoire.otf'), format('opentype');
  }

  * {
    box-sizing: border-box;
    margin: 0;
  }

  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    font-size: 16px;
  }

  body {
    margin: 0;
    background-color: #F7DDA4;
    font-size: 1rem;
   
  }
  h1 {
    font-family: 'Allenoire', serif;
  }
`;
