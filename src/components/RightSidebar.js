import * as React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import config from '../../config';
import { RightSidebarComponent, ListItem } from './styles/rightSidebarComponents';

const renderTableOfContents = (items, level = 0) => {
  return items.map((innerItem, index) => {
    const itemId = innerItem.title ? innerItem.title.replace(/\s+/g, '').toLowerCase() : '#';

    return (
      <React.Fragment key={index}>
        <ListItem to={`#${itemId}`} level={level}>
          {innerItem.title}
        </ListItem>
        {innerItem.items && innerItem.items.length > 0 && (
          <ul>{renderTableOfContents(innerItem.items, level + 1)}</ul>
        )}
      </React.Fragment>
    );
  });
};

const SidebarLayout = ({ location }) => (
  <StaticQuery
    query={graphql`
      query {
        allMdx {
          edges {
            node {
              fields {
                slug
              }
              tableOfContents
            }
          }
        }
      }
    `}
    render={({ allMdx }) => {
      let finalNavItems;

      if (allMdx.edges !== undefined && allMdx.edges.length > 0) {
        allMdx.edges.forEach((item) => {
          if (
            item &&
            (item.node.fields.slug === location.pathname ||
              config.gatsby.pathPrefix + item.node.fields.slug === location.pathname)
          ) {
            if (item.node.tableOfContents.items) {
              finalNavItems = renderTableOfContents(item.node.tableOfContents.items);
            }
          }
        });
      }

      if (finalNavItems && finalNavItems.length) {
        return (
          <RightSidebarComponent>
            <ul className={'rightSideBarUL'}>
              <li className={'rightSideTitle'}>Содержание</li>
              {finalNavItems}
            </ul>
          </RightSidebarComponent>
        );
      } else {
        return (
          <RightSidebarComponent>
            <ul></ul>
          </RightSidebarComponent>
        );
      }
    }}
  />
);

export default SidebarLayout;
