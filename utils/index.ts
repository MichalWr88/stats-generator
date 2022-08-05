export const parseLocalDate = (date: string | number | Date) => {
  if (date instanceof Date) {
    return date.toLocaleDateString("pl-PL", {
      day: "2-digit",
      month: "2-digit",
    });
  }
  return date
};
