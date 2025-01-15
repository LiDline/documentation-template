import * as React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Link from './link';
import { DarkModeSwitch } from './theme/DarkModeSwitch';
import SearchLunr from './search/SearchLunr.js';
import favicon from './images/logo.svg';
import LeftSidebar from './leftSidebar/LeftSidebar';
import { StyledBgDiv, FixedWindow, HeaderDiv } from './styles/Header';

function myFunction() {
  var x = document.getElementById('navbar');

  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

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
        <HeaderDiv isDarkThemeActive={isDarkThemeActive}>
          <FixedWindow>
            <nav className={'navBarDefault'}>
              <div className={'navBarHeader'}>
                <Link to={finalLogoLink} className={'navBarBrand'}>
                  <img
                    className={'img-responsive displayInline'}
                    src={favicon}
                    alt={'User Guide'}
                  />
                  <div className="logoContainer">
                    <div className="logoText">Some logo text</div>
                    <div className="userGuideText">ru</div>
                  </div>
                </Link>
              </div>

              <div className={'searchWrapper hiddenMobile '}>
                <SearchLunr isDarkThemeActive={isDarkThemeActive} />
              </div>

              <div id="navbar" className={'topnav'}>
                <div className={'visibleMobile'}>
                  <LeftSidebar location={location} />
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
          </FixedWindow>
        </HeaderDiv>
      );
    }}
  />
);

export default Header;
