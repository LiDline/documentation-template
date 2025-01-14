import React, { useEffect } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: true });

const MermaidDiagram = ({ children }) => {
  useEffect(() => {
    mermaid.init(undefined, document.querySelectorAll('.mermaid'));
  }, [children]);

  return <div className="mermaid">{children}</div>;
};

export default MermaidDiagram;
