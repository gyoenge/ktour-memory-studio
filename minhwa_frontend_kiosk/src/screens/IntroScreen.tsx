import React from 'react';
import styled from 'styled-components';
import introBackground from '../assets/kiosk_page1.png';

const IntroWrapper = styled.div`
  width: 100%;
  height: 100%;

  background: url(${introBackground}) center center / cover no-repeat;
  
  cursor: pointer;
  
  animation: fadeIn 0.5s ease-in-out;
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const IntroScreen: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return <IntroWrapper onClick={onNext} />;
};

export default IntroScreen;