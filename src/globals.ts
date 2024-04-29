import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';

export {};

const GlobalStyle = createGlobalStyle`
  ${normalize}

  * {
  margin: 0;
  padding: 0;
  border:none;
  box-sizing: border-box;
  text-decoration: none;
  font-family: Pretendard;
  }

  html, body {
    font-size: 62.5%;
  }

  ul, ol {
    list-style: none;
  }

  button, a {
    cursor: pointer;
    color: inherit;
  }
`;

export default GlobalStyle;
