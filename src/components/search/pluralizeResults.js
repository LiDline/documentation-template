const pluralizeResults = (count) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
  
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return 'результатов';
    }
  
    if (lastDigit === 1) {
      return 'результат';
    }
  
    if (lastDigit >= 2 && lastDigit <= 4) {
      return 'результата';
    }
  
    return 'результатов';
  };

  export default pluralizeResults;