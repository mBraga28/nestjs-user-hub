const generateAccessToken = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const minutesLate = (minutes: number) => {
  const MILLISECONDS_TO_SECOND = 60000;
  const timeNow = new Date().getTime();
  const thirtyMinutesLate = minutes * MILLISECONDS_TO_SECOND;

  return new Date(timeNow + thirtyMinutesLate);
};

const calculateMissingSeconds23hours = () => {
  const dataCurrent = new Date();
  const hourCurrent = dataCurrent.getHours();
  const minutesCurrent = dataCurrent.getMinutes();
  const secondsCurrent = dataCurrent.getSeconds();

  const hourTarget = 23;
  const minutesTarget = 59;
  const secondsTarget = 59;

  const secondsRemaining =
    (hourTarget - hourCurrent) * 60 * 60 + (minutesTarget - minutesCurrent) * 60 + (secondsTarget - secondsCurrent);

  return secondsRemaining;
};

export const Utils = {
  calculateMissingSeconds23hours,
  generateAccessToken,
  minutesLate,
};
