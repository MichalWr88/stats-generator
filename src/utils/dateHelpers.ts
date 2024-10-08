export const parseLocalDate = (date: string | number | Date) => {
    if (date instanceof Date) {
      return date.toLocaleDateString('pl-PL', {
        day: '2-digit',
        month: '2-digit',
      });
    }
    return date;
  };

export  const getCurrentWeekNumber = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    const week = Math.ceil((day + start.getDay() + 1) / 7);
    return week;
  };

  export const getMaxWeeksNumberByYear = (year: number) => {
    const d = new Date(year, 11, 31);
    const week = d.getDay() === 0 ? 53 : 52;
    return week;
  };


  