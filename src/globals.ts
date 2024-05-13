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
    height: 100%;
  }
  ul, ol {
    list-style: none;
  }
  
  button, a {
    cursor: pointer;
    color: inherit;
  }
  ::-webkit-scrollbar {
    width: 0.8rem;  
}
::-webkit-scrollbar-thumb {
    background: rgba(50,50,50,0.6); /* 스크롤바 색상 */
    border-radius: 0.6rem; /* 스크롤바 둥근 테두리 */
}
::-webkit-scrollbar-track {
    background: rgba(97, 97, 97, .1);  /*스크롤바 뒷 배경 색상*/
}
::-webkit-scrollbar-button{}
`;

export default GlobalStyle;
