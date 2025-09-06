import { styled } from "styled-components";

export const ActionButton = styled.button`
  background: linear-gradient(145deg, ${({ theme }) => theme.colors.accent}, ${({ theme }) => theme.colors.accentDark});
  color: ${({ theme }) => theme.colors.background};
  font-weight: 700;
  border: none;
  border-radius: 12px;
  padding: 15px 20px;
  cursor: pointer;
  width: 100%;
  margin-top: auto;

  /* PhotoSelectionScreen ?? */ 
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: translateY(-2px);
  }
`;