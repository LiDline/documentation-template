import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { useTheme } from '../theme/ThemeContext';

const CodeExample = ({
  children,
  language = 'bash',
  needButtonCopy = true,
  needBackground = true,
}) => {
  const { isDarkThemeActive } = useTheme();
  const [copySuccess, setCopySuccess] = useState('');

  const code = typeof children === 'string' ? children.trim() : '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
      setCopySuccess('Failed to copy!');
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        ...(needBackground
          ? {
              border: '1px solid #ccc',
              borderRadius: '8px',
              overflow: 'hidden',
              marginBottom: '40px',
            }
          : {}),
      }}
    >
      <SyntaxHighlighter
        language={language}
        style={isDarkThemeActive ? nightOwl : oneLight}
        customStyle={{
          margin: '0',
          padding: needBackground ? '16px' : '',
        }}
      >
        {code}
      </SyntaxHighlighter>

      {needButtonCopy && (
        <button
          onClick={handleCopy}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            backgroundColor: isDarkThemeActive ? '#444' : '#ddd',
            color: isDarkThemeActive ? '#fff' : '#000',
            border: 'none',
            borderRadius: '4px',
            padding: '4px 8px',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          {copySuccess || 'Copy'}
        </button>
      )}
    </div>
  );
};

export default CodeExample;
