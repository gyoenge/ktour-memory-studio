import React from 'react';
import styled from 'styled-components';

const OptionCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  flex-shrink: 0;
`;

const CardImageContainer = styled.div<{ isSelected: boolean }>`
  width: 90px;
  height: 90px;
  border-radius: 20px;
  overflow: hidden;
  border: 3px solid ${({ theme, isSelected }) => isSelected ? theme.colors.accent : theme.colors.border};
  transition: all 0.2s ease;
  padding: 4px;
  background-color: ${({ theme }) => theme.colors.background};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const CardImage = styled.img<{ isElement?: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  /* 요소(element) 아이콘인 경우 하얀색으로 보이도록 필터 적용 */
  // filter: ${({ isElement }) => isElement ? 'invert(90%) sepia(20%) saturate(300%) hue-rotate(320deg) brightness(100%) contrast(90%)' : 'none'};
`;

const CardLabel = styled.span`
  color: ${({ theme }) => theme.colors.secondaryText};
  font-size: 0.75rem;
  margin-top: 8px;
  font-family: ${({ theme }) => theme.fonts.korean};
  text-align: center;
  width: 90px;
  word-break: keep-all;
`;

interface OptionCardProps {
  item: { id: string; name: string; url: string };
  isSelected: boolean;
  onClick: () => void;
  isElement?: boolean;
}

const OptionCard: React.FC<OptionCardProps> = ({ item, isSelected, onClick, isElement = false }) => {
  return (
    <OptionCardContainer onClick={onClick}>
      <CardImageContainer isSelected={isSelected}>
        <CardImage src={item.url} alt={item.name} isElement={isElement} />
      </CardImageContainer>
      <CardLabel>{item.name}</CardLabel>
    </OptionCardContainer>
  );
};

export default OptionCard;
