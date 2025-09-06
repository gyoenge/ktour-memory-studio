import React from 'react';
import styled from 'styled-components';
import kioskFrame from '../../assets/kiosk_frame.png';

const KioskFrame = styled.div`
  width: 400px;
  height: 850px;
  background: url(${kioskFrame}) center center / contain no-repeat;
  padding: 110px 25px 235px 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Screen = styled.main`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.screen || '#f5f3ef'}; // 이미지와 비슷한 색으로 변경
  border-radius: 15px;

  position: relative;
  top: 20px;

  width: calc(100% - 25px);
  // height: calc(100% - 150px);
  aspect-ratio: 0.6415;

  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

interface KioskLayoutProps {
  children: React.ReactNode;
}

const KioskLayout: React.FC<KioskLayoutProps> = ({ children }) => {
  return (
    <KioskFrame>
      <Screen>{children}</Screen>
    </KioskFrame>
  );
};

export default KioskLayout;