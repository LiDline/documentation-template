import * as React from 'react';
import styled from '@emotion/styled';

import logoLightTheme from '../images/logoLightTheme.svg';
import logoDarkTheme from '../images/logoDarkTheme.svg';

const StyledImage = styled.img`
  width: 50px; /* Установите желаемую ширину */
  height: auto; /* Автоматический расчет высоты в соответствии с соотношением сторон */
  vertical-align: middle;
`;

const TextContainer = styled.span`
  vertical-align: middle; /* Выравнивание по центру по вертикали */
  color: ${(props) => (props.isDarkThemeActive ? 'white' : 'black')};
  padding: 2px;
`;

const PoweredBy = ({ isDarkThemeActive }) => (
  <TextContainer className="poweredBy" isDarkThemeActive={isDarkThemeActive}>
    Powered by{` `}
    <a href="https://lunrjs.com/">
      <StyledImage className={''} src={isDarkThemeActive ? logoDarkTheme : logoLightTheme} alt={'lunr.js'} />
    </a>
  </TextContainer>
);

export default PoweredBy;
