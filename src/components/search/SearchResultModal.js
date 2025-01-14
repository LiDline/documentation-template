import React from 'react';
import styled from '@emotion/styled';
import { Grid } from '@mui/material';

import ResultGraphql from './ResultGraphql';
import PoweredBy from './PoweredBy';
import pluralizeResults from './pluralizeResults';

const ModalContainer = styled('div')`
  position: absolute;
  top: 50px; /* Примерное значение вертикального отступа */
  left: 35%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 70%;
  max-height: 400px; /* Примерная фиксированная высота контейнера */
  background: ${(props) => (props.isDarkThemeActive ? '#001932' : 'white')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 8px;
  z-index: 999;
  color: black;
  overflow-y: auto; /* Добавлено для включения вертикальной прокрутки */
  border: 2px solid ${(props) => (props.isDarkThemeActive ? 'white' : '#001932')};
`;

const ResultItem = styled.li`
  margin-bottom: 8px;
  color: black;
  list-style-type: none;
  transition: background-color 0.3s ease;
  padding: 8px;

  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1), 0px -4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
`;

const LinkItem2 = styled.a`
  color: ${(props) => (props.isDarkThemeActive ? 'white' : 'black')};
  text-decoration: none;
`;

const Line = styled.hr`
  margin: 16px 0;
  border: none;
  border-top: 1px solid #ccc;
`;

const LengthText = styled.span`
  vertical-align: middle; /* Выравнивание по центру по вертикали */
  color: ${(props) => (props.isDarkThemeActive ? 'white' : 'black')};
`;

const SearchResultModal = ({ results, keyword, isDarkThemeActive }) => {
  return (
    <ModalContainer isDarkThemeActive={isDarkThemeActive}>
      {results.map((result) => (
        <ResultItem key={result.ref}>
          <LinkItem2
            href={result.ref ? `/${result.ref}` : '/'}
            isDarkThemeActive={isDarkThemeActive}
          >
            {ResultGraphql({ ref: result.ref, keyword, isDarkThemeActive })}
          </LinkItem2>
        </ResultItem>
      ))}
      <Line />
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <LengthText className="poweredBy" isDarkThemeActive={isDarkThemeActive}>
            {results.length} {pluralizeResults(results.length)}
          </LengthText>
        </Grid>
        <Grid item xs={6} textAlign="right">
          <PoweredBy isDarkThemeActive={isDarkThemeActive} />
        </Grid>
      </Grid>
    </ModalContainer>
  );
};

export default SearchResultModal;
