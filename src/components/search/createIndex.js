import { graphql, useStaticQuery } from 'gatsby';

import SearchBox from '../search/input';

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

  var lunr = require('./lib/lunr.js');
  require('./lunr.stemmer.support.js')(lunr);
  // require('./lunr.multi.js')(lunr);
  require('./lunr.ru.js')(lunr);

  // Create lunr index
  const index = lunr(function () {
    // this.use(lunr.multiLanguage('en', 'ru'));
    this.use(lunr.ru);

    this.ref('slug');
    this.field('title', { boost: 10 });
    this.field('content');

    data.allMdx.nodes.forEach((node) => {
      this.add({
        slug: node.slug,
        title: node.frontmatter.title,
        content: node.internal.content,
      });
    });
  });

  return <SearchBox index={index} isDarkThemeActive={isDarkThemeActive}/>;
};

export default SearchLunr;
