import React, { useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import styled from '@emotion/styled';
import ControlPanelComponent from './ControlPanelComponent';

const FullScreenModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const FullScreenModalContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FullScreenModalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  border: none;
  color: white;
  font-size: 34px;
  cursor: pointer;
  z-index: 10;
  background-color: transparent;
`;

const ImageModal = ({ nameFile, alt, num }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 27) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const src = '/images/' + nameFile;

  return (
    <div style={{ flex: 1 }}>
      <img src={src} alt={alt} onClick={openModal} />
      {isOpen && (
        <FullScreenModalContainer>
          <FullScreenModalContent>
            <TransformWrapper
              minScale={0.7}
              maxScale={3}
              wheel={{
                step: 0.1,
              }}
            >
              <TransformComponent>
                <FullScreenModalImage src={src} alt={alt} />
              </TransformComponent>

              <ControlPanelComponent />
            </TransformWrapper>

            <CloseButton onClick={closeModal}>&times;</CloseButton>
          </FullScreenModalContent>
        </FullScreenModalContainer>
      )}
      <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '24px', marginBottom: '24px' }}>
        Рисунок {num} - {alt}.
      </p>
    </div>
  );
};

export default ImageModal;
