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
  font-family: Pretendard Variable;
  }

  html, body {
    font-size: 62.5%;

    background: linear-gradient(
      72deg,
      #e2a5ff,
      rgba(0, 102, 255, 0.7) 100%
    );


    background-repeat: no-repeat;   
    background-size: cover;
  }

  html{
    height:100%;
    width:100%;
  }
  body{
    min-height:100%;
    min-width: 100%;
  }
  @media (max-width: 520px) {
    html, body {
      height: 100vh;
      width: 100vw;
    }

    body {
      min-height: 100vh;
      min-width: 100vw;
    }
  }
  ul, ol {
    list-style: none;
  }
  
  button, a {
    cursor: pointer;
    color: inherit;
  }
  ::-webkit-scrollbar {
    width: 0.6rem;  
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
