import * as React from 'react';
import styled from '@emotion/styled';
import { StaticQuery, graphql } from 'gatsby';
import Link from './link';

import { DarkModeSwitch } from './DarkModeSwitch';
import SearchLunr from './search/createIndex';
import favicon from './images/logo.svg';
import Sidebar from './sidebar';

function myFunction() {
  var x = document.getElementById('navbar');

  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

const StyledBgDiv = styled('div')`
  height: 60px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #f8f8f8;
  position: relative;
  display: none;
  background: ${(props) => (props.isDarkThemeActive ? '#001932' : undefined)};

  @media (max-width: 767px) {
    display: block;
  }
`;

const Header = ({ location, isDarkThemeActive, toggleActiveTheme }) => (
  <StaticQuery
    query={graphql`
      query headerTitleQuery {
        site {
          siteMetadata {
            logo {
              link
            }
            headerLinks {
              link
              text
            }
          }
        }
      }
    `}
    render={(data) => {
      const {
        site: {
          siteMetadata: { logo, headerLinks },
        },
      } = data;
      const finalLogoLink = logo.link !== '' ? logo.link : 'https://затычка/';

      return (
        <div className={'navBarWrapper'}>
          <nav className={'navBarDefault'}>
            <div className={'navBarHeader'}>
              <Link to={finalLogoLink} className={'navBarBrand'}>
                <img className={'img-responsive displayInline'} src={favicon} alt={'User Guide'} />
                <div className="logoContainer">
                  <div className="logoText">Smart-Маршрутизация</div>
                  <div className="userGuideText">v.1.2</div>
                </div>
              </Link>
            </div>
            <div className={'searchWrapper hiddenMobile '}>
              <SearchLunr isDarkThemeActive={isDarkThemeActive} />
            </div>
            <div id="navbar" className={'topnav'}>
              <div className={'visibleMobile'}>
                <Sidebar location={location} />
                <hr />
              </div>
              <ul className={'navBarUL navBarNav navBarULRight'}>
                <DarkModeSwitch
                  isDarkThemeActive={isDarkThemeActive}
                  toggleActiveTheme={toggleActiveTheme}
                />
              </ul>
            </div>
          </nav>
          <StyledBgDiv isDarkThemeActive={isDarkThemeActive}>
            <div className={'navBarDefault removePadd'}>
              <span
                onClick={myFunction}
                className={'navBarToggle'}
                onKeyDown={myFunction}
                role="button"
                tabIndex={0}
              >
                <span className={'iconBar'}></span>
                <span className={'iconBar'}></span>
                <span className={'iconBar'}></span>
              </span>
            </div>
            <div className={'searchWrapper'}>
              <SearchLunr />
            </div>
          </StyledBgDiv>
        </div>
      );
    }}
  />
);

export default Header;
