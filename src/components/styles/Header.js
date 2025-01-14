import styled from '@emotion/styled';

export const HeaderDiv = styled('div')`
  position: sticky;
  top: 0;
  z-index: 1;
  background: ${(props) => (props.isDarkThemeActive ? '#001932' : undefined)};

  @media (max-width: 767px) {
    position: static;
  }
`;

export const StyledBgDiv = styled('div')`
  height: 60px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #f8f8f8;
  position: relative;
  display: none;
  background: ${(props) => (props.isDarkThemeActive ? '#001932' : undefined)};
  max-width: 100%;

  @media (max-width: 767px) {
    display: block;
  }
`;

export const FixedWindow = styled('main')`
  position: sticky;
  top: 0;
  z-index: 1;

  @media (max-width: 767px) {
    position: static;
  }

  @media only screen and (min-width: 1920px) {
    max-width: 1920px;
    margin: 0 auto;
  }
`;
