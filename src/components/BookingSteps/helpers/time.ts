export const getHoursAndMinutes = (time: string) =>
  time.split(":").map((time) => Number(time));

export const timeInMinutes = (hour: number, minutes: number) =>
  hour * 60 + minutes;

export const timeInString = (time: number) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};
