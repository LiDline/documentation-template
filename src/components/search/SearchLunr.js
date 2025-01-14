import { graphql, useStaticQuery } from 'gatsby';
var lunr = require('./lib/lunr.js');
require('./lunr.stemmer.support.js')(lunr);
require('./lunr.multi.js')(lunr);
require('./lunr.ru.js')(lunr);
import React from 'react';

import SearchBox from './SearchBox.js';
import fixContentForSearch from './fixContentForSearch.js';

const SearchLunr = ({ isDarkThemeActive }) => {
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        nodes {
          slug
          frontmatter {
            title
          }
          internal {
            content
          }
        }
      }
    }
  `);

  const [index, setIndex] = React.useState();

  React.useEffect(() => {
    // Create lunr index
    const newIndex = lunr(function () {
      this.use(lunr.multiLanguage('en', 'ru'));
      // this.use(lunr.ru);

      this.ref('slug');
      this.field('title', { boost: 10 });
      this.field('content');

      data.allMdx.nodes.forEach((node) => {
        this.add({
          slug: node.slug,
          title: node.frontmatter.title,
          content: fixContentForSearch(node.internal.content, true),
        });
      });
    });

    setIndex(newIndex);
  }, []);

  return <SearchBox index={index} isDarkThemeActive={isDarkThemeActive} />;
};

export default SearchLunr;
