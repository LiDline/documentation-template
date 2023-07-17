import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  font-family: 'Roboto', sans-serif;
`;

const Title = styled.h3`
  margin-bottom: 0.5rem;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: 1.25rem;
`;

const Content = styled.p`
  font-family: 'Roboto;
  font-size: 1rem;
  font-weight: normal;
`;

const resultGraphql = ({ ref, keyword }) => {
  const data = useStaticQuery(graphql`
    query GetTitles {
      allMdx {
        nodes {
          slug
          internal {
            content
          }
          frontmatter {
            title
            metaTitle
            metaDescription
          }
        }
      }
    }
  `);

  const res = data.allMdx.nodes.find((result) => result.slug === ref);
  const { title } = res.frontmatter;
  let content = res.internal.content;

  // Удалить строки с "title", "metaTitle", "metaDescription" и "---" из исходного текста
  content = content
    .replace(/title:.*\n/g, '')
    .replace(/metaTitle:.*\n/g, '')
    .replace(/metaDescription:.*\n/g, '')
    .replace(/---\n/g, '')
    .replace(/import.*\n/g, '')
    .replace(/<.*\n/g, '')
    .replace(/style*\n/g, '');
  // Удалить все символы Markdown из исходного текста
  content = content.replace(/(?:__|[*#])|\[(.*?)\]\(.*?\)/g, '$1');

  // Найти индекс ключевого слова в тексте
  const keywordIndex = content.indexOf(keyword);

  const counter = 70;
  // Определить начало и конец куска текста с ключевым словом
  const start = keywordIndex - counter >= 0 ? keywordIndex - counter : 0;
  const end = keywordIndex + keyword.length + counter;

  const keywordFragment = content.substring(start, end);
  const highlightedFragment = keyword
    ? keywordFragment.replace(
        new RegExp(`(${keyword})`, 'gi'),
        '<mark style="background-color: yellow">$1</mark>'
      )
    : keywordFragment;

  const truncatedFragment = `${highlightedFragment}${end < content.length ? '...' : ''}`;

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Content dangerouslySetInnerHTML={{ __html: truncatedFragment }} />
    </Wrapper>
  );
};

export default resultGraphql;
