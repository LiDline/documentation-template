import React, {useEffect} from 'react';
import styled from '@emotion/styled';
import { MDXProvider } from '@mdx-js/react';
import { ArrowUp } from 'react-feather';

import ThemeProvider from './theme/themeProvider';
import mdxComponents from './mdxComponents';
import Sidebar from './sidebar';
import RightSidebar from './rightSidebar';
import config from '../../config.js';

const Wrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.background};

  .sideBarUL li a {
    color: ${({ theme }) => theme.colors.text};
  }

  .sideBarUL .item > a:hover {
    background-color: #1ed3c6;
    color: #fff !important;

    /* background: #F8F8F8 */
  }

  @media only screen and (max-width: 767px) {
    display: block;
  }
`;

const Content = styled('main')`
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

const MaxWidth = styled('div')`
  @media only screen and (max-width: 50rem) {
    width: 100%;
    position: relative;
  }
`;

const LeftSideBarWidth = styled('div')`
  width: 298px;
`;

const RightSideBarWidth = styled('div')`
  width: 224px;
`;

// Кнопка вверх
const ScrollToTopButton = styled.button`
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
`;

const Layout = ({ children, location }) => {
  // Кнопка вверх
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.onscroll = function() {
        showScrollToTopButton();
      };
    }
  }, []);

  function showScrollToTopButton() {
    const scrollToTopButton = document.querySelector('.scrollToTopButton');
    if (document.documentElement.scrollTop > 50) {
      scrollToTopButton.style.display = 'block';
    } else {
      scrollToTopButton.style.display = 'none';
    }
  }
  function scrollToTop() {
    document.documentElement.scrollTop = 0;
  }
  
  return (
    <ThemeProvider location={location}>
      <MDXProvider components={mdxComponents}>
        <Wrapper>
          <LeftSideBarWidth className={'hiddenMobile'}>
            <Sidebar location={location} />
          </LeftSideBarWidth>
          {config.sidebar.title ? (
            <div
              className={'sidebarTitle sideBarShow'}
              dangerouslySetInnerHTML={{ __html: config.sidebar.title }}
            />
          ) : null}
          <Content>
            <MaxWidth>{children}</MaxWidth>
          </Content>
          <RightSideBarWidth className={'hiddenMobile'}>
            <RightSidebar location={location} />
          </RightSideBarWidth>
          <ScrollToTopButton className={'scrollToTopButton'} onClick={scrollToTop}>
            <ArrowUp size={16} className="arrow-up-icon" />
          </ScrollToTopButton>
        </Wrapper>
      </MDXProvider>
    </ThemeProvider>
  );
};

export default Layout;
