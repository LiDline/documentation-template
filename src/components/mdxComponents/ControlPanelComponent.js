import React from 'react';
import styled from '@emotion/styled';
import { useControls } from 'react-zoom-pan-pinch';

const ControlPanel = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(17, 13, 13, 0.4);
  border-radius: 5px;
  padding: 12px;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  margin: 10px 10px;
  cursor: pointer;

  &:hover {
    color: #ffcc00;
  }
`;

const ControlPanelComponent = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <ControlPanel className="controlPanel">
      <ControlButton onClick={() => zoomIn()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-zoom-in"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
          <line x1="11" x2="11" y1="8" y2="14"></line>
          <line x1="8" x2="14" y1="11" y2="11"></line>
        </svg>
      </ControlButton>

      <ControlButton onClick={() => zoomOut()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-zoom-out"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
          <line x1="8" x2="14" y1="11" y2="11"></line>
        </svg>
      </ControlButton>

      <ControlButton onClick={() => resetTransform()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4.75 10.75h-3m12.5-2c0 3-2.798 5.5-6.25 5.5c-3.75 0-6.25-3.5-6.25-3.5v3.5m9.5-9h3m-12.5 2c0-3 2.798-5.5 6.25-5.5c3.75 0 6.25 3.5 6.25 3.5v-3.5"
          ></path>
        </svg>
      </ControlButton>
    </ControlPanel>
  );
};

export default ControlPanelComponent;
