import React, { useState } from 'react';
import styled from 'styled-components';

import localPhoto1 from '../assets/photos/photo1.png';
import localPhoto2 from '../assets/photos/photo2.png';
import localPhoto3 from '../assets/photos/photo3.png';
import { ActionButton } from '../components/common/ActionButton';
import { ScreenTitle, Subtitle } from '../components/common/Title';

const samplePhotos = [
    localPhoto1,
    localPhoto2,
    localPhoto3,
    // 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?q=80&w=2070&auto=format&fit=crop',
    // 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
    // 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop',
];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; 
  height: 100%;
  padding: 20px; 
`;

const PhotoPreview = styled.div`
  width: calc(100% - 60px); 
  aspect-ratio: 1; 

  border-radius: 10px; 
  background-color: ${({ theme }) => theme.colors.background};
  overflow: hidden;
  margin-bottom: 20px;
  // min-height: 0px;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  // margin-top: 10px;
`;

const Thumbnail = styled.img<{ isSelected: boolean }>`
  width: 70px;
  height: 70px;
  border-radius: 12px;
  object-fit: cover;
  cursor: pointer;

  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.5)};
  // border: 1px solid #444; // 은은한 테두리 추가
  box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.5); // 안쪽 그림자로 파인 느낌 표현
  border: 3px solid ${({ theme, isSelected }) => isSelected ? theme.colors.accent : 'transparent'};
  transition: all 0.2s ease;
  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }
`;


interface PhotoSelectionScreenProps {
  onNext: (selectedPhoto: string) => void;
}

const PhotoSelectionScreen: React.FC<PhotoSelectionScreenProps> = ({ onNext }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(samplePhotos[0]);

  return (
    <Wrapper>
      <ScreenTitle style={{width: "100%", marginBottom: "10px"}}>
        Take your facial photo
      </ScreenTitle>
      <PhotoPreview>
        <PreviewImage src={selectedPhoto} alt="선택된 사진 미리보기" />
      </PhotoPreview>
      <Subtitle style={{margin: "0 0 15px 0"}}>
        -- select photo to use -- 
      </Subtitle>
      <ThumbnailContainer>
        {samplePhotos.map((photo, index) => (
          <Thumbnail
            key={index}
            src={photo}
            alt={`사진 옵션 ${index + 1}`}
            isSelected={selectedPhoto === photo}
            onClick={() => setSelectedPhoto(photo)}
          />
        ))}
      </ThumbnailContainer>
      <ActionButton onClick={() => onNext(selectedPhoto)}>Next</ActionButton>
    </Wrapper>
  );
};

export default PhotoSelectionScreen;
