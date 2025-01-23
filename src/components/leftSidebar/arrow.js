import * as React from 'react';

export default function ArrowBar({ isDarkThemeActive, active, closed = true }) {
  const [screenWidth, setScreenWidth] = React.useState(1080);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setScreenWidth(window.innerWidth);
    }
  }, []);
  const isBlackArrow = !isDarkThemeActive && !active;
  // const customFill = screenWidth > 767 ? (isBlackArrow ? 'black' : 'white') : '#1ed3c6';

  const customFill = active
    ? 'white'
    : screenWidth > 767
    ? isDarkThemeActive
      ? 'white'
      : 'black'
    : '#1ed3c6';

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
      <path
        d={
          closed
            ? 'M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z'
            : 'M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z'
        }
        fill={customFill}
      />
    </svg>
  );
}
