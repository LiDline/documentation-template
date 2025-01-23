import React, { useState, useEffect, useRef } from 'react';
import CloseIcon from '@material-ui/icons/Close';

import styled from '@emotion/styled';
import { Search } from '@styled-icons/fa-solid/Search';
import SearchResultModal from './SearchResultModal';

const SearchIcon = styled(Search)`
  width: 1em;
  pointer-events: none;
  margin-right: 10px;
  position: absolute;
  left: 15px;
  color: #2fd2c5;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 767px) {
    width: 100%;
    margin-left: 15px;
`;

const Input = styled.input`
  outline: none;
  border: none;
  font-size: 1em;
  background: white;
  transition: ${(props) => props.theme.shortTrans};
  border-radius: ${(props) => props.theme.smallBorderRadius};
  padding-right: 2.5em;
  width: 100%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0.5em;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.gray};
`;

const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 767px) {
    width: 100%;
    margin-left: 15px;
  }
`;

const SearchBox = ({ index, isDarkThemeActive }) => {
  const [searchValue, setSearchValue] = useState('');
  const [result, setResult] = useState();
  // Добавлено состояние для открытия/закрытия модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Ссылка на модальное окно
  const modalRef = useRef(null);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    setResult(index.search(e.target.value));
    // Открываем модальное окно только если есть текст в поле
    setIsModalOpen(e.target.value.length > 0);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    setIsModalOpen(false); // Закрываем модальное окно при очистке поиска
  };

  // Закрываем модальное окно при Esc или кнопки мыши вне
  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      setIsModalOpen(false);
    }
  };
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsModalOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Form className={'formElement'}>
      <InputWrapper>
        <SearchIcon />
        <Input
          className={'searchInput'}
          type="text"
          placeholder="Поиск"
          aria-label="Search"
          value={searchValue}
          onChange={handleChange}
          onFocus={() => setIsModalOpen(searchValue.length > 0)}
        />
        {searchValue && (
          <CloseButton onClick={handleClearSearch}>
            <CloseIcon className="clearIcon" onClick={handleClearSearch} />
          </CloseButton>
        )}
      </InputWrapper>
      {isModalOpen && result && (
        <div ref={modalRef}>
          <SearchResultModal
            results={result}
            keyword={searchValue}
            isDarkThemeActive={isDarkThemeActive}
          />
        </div>
      )}
    </Form>
  );
};

export default SearchBox;
