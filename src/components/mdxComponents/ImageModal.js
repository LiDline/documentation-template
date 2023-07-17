import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

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

const ImageModal = ({ src, alt }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleWheel = (event) => {
    closeModal();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        closeModal();
      }
    };

    const handleClickOutside = (event) => {
      if (event.target === modalRef.current) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('wheel', handleWheel);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('wheel', handleWheel);
    };
  }, [isOpen]);

  return (
    <>
      <img src={src} alt={alt} onClick={openModal} />
      {isOpen && (
        <FullScreenModalContainer ref={modalRef} onClick={closeModal}>
          <FullScreenModalContent>
            <FullScreenModalImage src={src} alt={alt} />
            <CloseButton onClick={closeModal}>&times;</CloseButton>
          </FullScreenModalContent>
        </FullScreenModalContainer>
      )}
    </>
  );
};

export default ImageModal;
