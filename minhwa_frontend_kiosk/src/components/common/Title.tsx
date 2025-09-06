import { styled } from "styled-components";

export const ScreenTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primaryText};
  text-align: center;
  font-size: 20px; 
  font-weight: 500;
  margin: 0;
`;

export const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.korean};
  color: ${({ theme }) => theme.colors.secondaryText};
  text-align: center;
`;
