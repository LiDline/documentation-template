import styled from '@emotion/styled';

export const GeneralDiv = styled('div')`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const Wrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.background};
  max-width: 100%;

  .sideBarUL li a {
    color: ${({ theme }) => theme.colors.text};
  }

  .sideBarUL .item > a:hover {
    background-color: #1ed3c6;
  }

  @media only screen and (max-width: 767px) {
    display: block;
  }

  @media only screen and (min-width: 1920px) {
    max-width: 1920px;
    margin: 0 auto;
  }
`;

export const Content = styled('main')`
  display: flex;
  flex-grow: 1;
  margin: 0px 88px;
  padding-top: 3rem;
  background: ${({ theme }) => theme.colors.background};

  table tr {
    background: ${({ theme }) => theme.colors.background};
  }

  @media only screen and (max-width: 1023px) {
    padding-left: 0;
    margin: 0 10px;
    padding-top: 3rem;
  }
`;

export const MaxWidth = styled('div')`
  @media only screen and (max-width: 50rem) {
    width: 100%;
    position: relative;
  }
`;

// Кнопка вверх
export const ScrollToTopButton = styled.button`
  display: none;
  position: fixed;
  bottom: 25px;
  right: 25px;
  width: 50px;
  height: 50px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s;

  &:hover {
    opacity: 1;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
    100% {
      transform: translateY(0);
    }
  }

  .arrow-up-icon {
    width: 25px;
    height: 25px;
  }

  @media only screen and (min-width: 1920px) {
    right: calc(50% - 960px + 25px);
  }
`;

export const RightSideBarWidth = styled('div')`
  width: 250px;
`;

export const LeftSideBarWidth = styled('div')`
  width: 300px;
`;
