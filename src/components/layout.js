import React, { useEffect } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { ArrowUp } from 'react-feather';

import ThemeProvider from './theme/themeProvider';
import mdxComponents from './mdxComponents';
import LeftSidebar from './leftSidebar/LeftSidebar.js';
import RightSidebar from './RightSidebar.js';
import config from '../../config.js';
import {
  Content,
  GeneralDiv,
  LeftSideBarWidth,
  MaxWidth,
  RightSideBarWidth,
  ScrollToTopButton,
  Wrapper,
} from './styles/Layout.js';

const Layout = ({ children, location }) => {
  // Кнопка вверх
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.onscroll = function () {
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
        <GeneralDiv>
          <Wrapper>
            <LeftSideBarWidth className={'hiddenMobile'}>
              <LeftSidebar location={location} />
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
        </GeneralDiv>
      </MDXProvider>
    </ThemeProvider>
  );
};

export default Layout;
