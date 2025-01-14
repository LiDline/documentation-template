import styled from '@emotion/styled';

export const RightSidebarComponent = styled('aside')`
  width: 100%;
  box-shadow: 5px -5px 5px -5px rgba(175, 158, 232, 0.4);
  height: calc(100vh - 80px); /* Вычитаем высоту заголовка */
  overflow: auto;
  position: fixed;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: sticky;
  top: 80px;

  background: ${(props) => props.theme.colors.background};

  .rightSideTitle {
    font-size: 10px;
    line-height: 1;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    padding: 7px 24px 7px 16px;
    border-left: 1px solid #e6ecf1;
    border-left-color: rgb(230, 236, 241);

    color: ${(props) => props.theme.colors.text};
  }

  .rightSideBarUL {
    margin-top: 32px;
  }

  .rightSideBarUL li {
    list-style-type: none;
    border-left: 1px solid #e6ecf1;
    border-left-color: rgb(230, 236, 241);
  }

  .rightSideBarUL li a {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.5;
    padding: 7px 24px 7px 16px;

    color: ${(props) => props.theme.colors.text};
  }

  @media only screen and (max-width: 50rem) {
    width: 100%;
    position: relative;
  }
`;

export const ListItem = styled(({ className, active, level, ...props }) => {

  const handleClick = (event) => {
    event.preventDefault();

    const element = document.querySelector(props.to);
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  return (
    <li className={className}>
      <a href={props.to} onClick={handleClick} {...props}>
        {props.children}
      </a>
    </li>
  );
})`
  list-style: none;

  a {
    color: #5c6975;
    text-decoration: none;
    font-weight: ${({ level }) => (level === 0 ? 700 : 400)} !important;
    padding: 0.45rem 0 0.45rem ${({ level }) => 1 + (level || 0) * 1}rem !important;
    display: block;
    position: relative;

    &:hover {
      color: #1ed3c6 !important;
    }

    ${({ active }) =>
      active &&
      `
      color: #1ED3C6;
      border-color: rgb(230,236,241) !important;
      border-style: solid none solid solid;
      border-width: 1px 0px 1px 1px;
      background-color: #fff;
    `}
    svg {
      float: right;
      margin-right: 1rem;
    }
  }
`;
