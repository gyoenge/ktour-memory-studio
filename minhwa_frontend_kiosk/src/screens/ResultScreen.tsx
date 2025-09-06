import React from 'react';
import styled from 'styled-components';
import type { UserSelections } from '../types';

import finalResultImage from '../assets/results/result_sample.png'; // 1단계에서 저장한 이미지 경로
import { ScreenTitle } from '../components/common/Title';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 25px;
  height: 100%;
`;

const FinalImage = styled.img`
  width: 250px;
  // aspect-ratio: 0.7988;
  // height: 100%;
  // object-fit: cover;
  border-radius: 4px;
  margin-top: 10px;
  margin-bottom: 80px;
`;

// const ButtonGroup = styled.div`
//   display: flex;
//   gap: 15px;
//   margin-top: auto;
// `;
// const ActionButton = styled.button` /* ... */ `;
// const SecondaryButton = styled(ActionButton)`
//     background: #5a524c;
//     color: ${({ theme }) => theme.colors.primaryText};
// `;


interface ResultScreenProps {
  selections: UserSelections;
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = () => {

  return (
    <Wrapper>
      <ScreenTitle style={{margin: "0 0 15px 0"}}>
        K-memory is ready!
      </ScreenTitle>
      {/* <ResultImageWrapper> */}
        {/* <FinalImageContainer> */}
           <FinalImage src={finalResultImage} alt="완성된 K-TOUR 사진" />
        {/* </FinalImageContainer> */}
      {/* </ResultImageWrapper> */}
      {/* <ButtonGroup>
         <SecondaryButton onClick={() => alert('인쇄 기능은 데모에서 지원되지 않습니다.')}>인쇄하기</SecondaryButton>
         <ActionButton onClick={onRestart}>다시하기</ActionButton>
      </ButtonGroup> */}
    </Wrapper>
  );
};

export default ResultScreen;
