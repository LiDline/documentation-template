import * as React from 'react';

import config from '../../../config';
import Link from '../link';
import { useTheme } from '../theme/ThemeContext';
import ArrowBar from './arrow';

const TreeNode = ({ className = '', setCollapsed, collapsed, url, title, items, ...rest }) => {
  const isCollapsed = collapsed[url];

  const collapse = () => {
    setCollapsed(url);
  };

  const hasChildren = items.length !== 0;

  const [location, setLocation] = React.useState(undefined);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setLocation(document.location);
    }
  }, []);

  const active =
    location && (location.pathname === url || location.pathname === config.gatsby.pathPrefix + url);

  const calculatedClassName = `${className} item ${active ? 'active' : ''}`;

  const { isDarkThemeActive } = useTheme();

  return (
    <li className={calculatedClassName}>
      {title && (
        <Link to={url}>
          {title}
          {!config.sidebar.frontLine && title && hasChildren ? (
            <button onClick={collapse} className="collapser">
              {!isCollapsed ? (
                <ArrowBar isDarkThemeActive={isDarkThemeActive} active={active} closed={false} />
              ) : (
                <ArrowBar isDarkThemeActive={isDarkThemeActive} active={active} />
              )}
            </button>
          ) : null}
        </Link>
      )}

      {!isCollapsed && hasChildren ? (
        <ul>
          {items.map((item, index) => (
            <TreeNode
              key={item.url + index.toString()}
              setCollapsed={setCollapsed}
              collapsed={collapsed}
              {...item}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export default TreeNode;
