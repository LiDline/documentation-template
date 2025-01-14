import React, { useState, useEffect } from 'react';
import config from '../../../config';
import TreeNode from './treeNode';
import calculateTreeData from './calculateTreeData';

const Tree = ({ edges }) => {
  let [treeData] = useState(() => {
    return calculateTreeData(edges);
  });

  const [collapsed, setCollapsed] = useState({});

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const defaultCollapsed = {};

      treeData?.items.forEach((item) => {
        if (includesItem(item, document.location.pathname)) {
          defaultCollapsed[item.url] = false;
        } else {
          defaultCollapsed[item.url] = true;
        }
      });

      setCollapsed(defaultCollapsed);
    }
  }, []);

  const toggle = (url) => {
    setCollapsed({
      ...collapsed,
      [url]: !collapsed[url],
    });
  };

  return (
    <TreeNode
      className={`${config.sidebar.frontLine ? 'showFrontLine' : 'hideFrontLine'} firstLevel`}
      setCollapsed={toggle}
      collapsed={collapsed}
      {...treeData}
    />
  );
};

function includesItem(item, location) {
  if (location.includes(item.url) && location != item.url) {
    return true;
  }

  if (item.items?.length) {
    return item.items.some((i)=>includesItem(i, location))
  }

  return false;
}

export default Tree;
