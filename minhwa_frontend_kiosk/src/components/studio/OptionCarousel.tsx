import { styled } from "styled-components";

export const OptionCarousel = styled.div<{ showScrollbar?: boolean }>`
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 10px 5px;
  width: 100%; 
  
  /* 기본적으로 스크롤바 숨기기 */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  /* showScrollbar prop이 true일 때만 아래 스타일 적용 */
  ${({ showScrollbar }) => showScrollbar && `
    -ms-overflow-style: auto;
    scrollbar-width: thin; /* Firefox에서 얇은 스크롤바 표시 */
    scrollbar-color: #888 #333; /* 스크롤바 색상 (썸, 트랙) */

    &::-webkit-scrollbar {
      display: block; /* 스크롤바 다시 표시 */
      height: 8px; /* 가로 스크롤바 높이 */
    }
    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1); /* 트랙 배경 */
      border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #888; /* 스크롤바 색상 */
      border-radius: 4px;
      border: 2px solid transparent;
      background-clip: content-box;
    }
    &::-webkit-scrollbar-thumb:hover {
      background-color: #555;
    }
  `}
`;