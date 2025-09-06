import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import loadingIcon from '../assets/icons/clockIcon.png';

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
  color: ${({ theme }) => theme.colors.primaryText};
`;

const ClockIcon = styled.img` 
  width: 120px;  
  height: 120px;  
  animation: ${rotate} 4s linear infinite;
  margin-bottom: 20px; 
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  margin-top: 25px;
`;

const LoadingSubtext = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.secondaryText};
  font-family: ${({ theme }) => theme.fonts.korean};
  margin-top: 10px;
`;

interface LoadingScreenProps {
  onFinished: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinished }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinished();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <Wrapper>
      <ClockIcon src={loadingIcon} alt="Loading Icon" />
      <LoadingText>Creating your K-memory...</LoadingText>
      <LoadingSubtext>AI is generating your photo!</LoadingSubtext>
    </Wrapper>
  );
};

export default LoadingScreen;
