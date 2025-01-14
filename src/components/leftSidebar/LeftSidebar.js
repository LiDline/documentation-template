import * as React from 'react';
import Tree from './tree';
import { StaticQuery, graphql } from 'gatsby';
import { ExternalLink } from 'react-feather';
import config from '../../../config';
import { Divider, LeftSidebarComponent, ListItemLeftSidebar } from '../styles/leftSidebarComponent';

const SidebarLayout = () => (
  <StaticQuery
    query={graphql`
      query {
        allMdx {
          edges {
            node {
              fields {
                slug
                title
              }
            }
          }
        }
      }
    `}
    render={({ allMdx }) => {
      return (
        <LeftSidebarComponent>
          <ul className={'sideBarUL'}>
            <Tree edges={allMdx.edges} />

            {config.sidebar.links && config.sidebar.links.length > 0 && <Divider />}
            
            {config.sidebar.links.map((link, key) => {
              if (link.link !== '' && link.text !== '') {
                return (
                  <ListItemLeftSidebar key={key} to={link.link}>
                    {link.text}
                    <ExternalLink size={14}/>
                  </ListItemLeftSidebar>
                );
              }
            })}
          </ul>
        </LeftSidebarComponent>
      );
    }}
  />
);

export default SidebarLayout;
