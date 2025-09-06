import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'GyeonggiBatangOTF';
    src: url('/assets/fonts/GyeonggiBatangOTF.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'GyeonggiBatangOTF', serif;
    background-color: #1a1a1a; /* 키오스크 외부 배경색 */
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    overflow: hidden;
  }
`;
