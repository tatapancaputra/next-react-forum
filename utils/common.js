export const padLeft = (num, targetLength = 2) => {
  return num.toString().padStart(targetLength, '0');
};

export const formatDateTime = (unixTimestamp, dateDivider = '-') => {
  const date = new Date(unixTimestamp * 1000);

  return (
    [
      date.getFullYear(),
      padLeft(date.getMonth() + 1),
      padLeft(date.getDate()),
    ].join(dateDivider) +
    ' ' +
    [padLeft(date.getHours()), padLeft(date.getMinutes())].join(':')
  );
};

export const kFormatter = (num) => {
  return Math.abs(num) > 999 ? (num / 1000).toFixed(1) + 'K' : num;
};
