export default (date) => {
  const Year = date.getFullYear();
  const Month = date.getMonth();
  const Day = date.getDate();
  const Hour = date.getHours();
  const Minutes = date.getMinutes();
  const Seconds = date.getSeconds();
  const changeMonthRu = (m) => {
    switch (m) {
      case 0: return 'января';
      case 1: return 'февраля';
      case 2: return 'марта';
      case 3: return 'апреля';
      case 4: return 'мая';
      case 5: return 'июня';
      case 6: return 'июля';
      case 7: return 'августа';
      case 8: return 'сентября';
      case 9: return 'октября';
      case 10: return 'ноября';
      default: return 'декабря';
    }
  };
  return `${Day} ${changeMonthRu(Month)} ${Year} в ${Hour}:${Minutes}:${Seconds}`;
};

export const isEmailValid = (value) => RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(value);
