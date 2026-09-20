interface toogleProps {
  id: string;
  selectedItem: string | null;
}

export const toggleSelection = ({ id, selectedItem }: toogleProps) => {
  if (id === selectedItem) {
    return null;
  }
  return id;
};

export const getDate = (numberOfDays: number) => {
  const today = new Date();
  const dates: Date[] = [];
  for (let i = 0; i < numberOfDays; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    dates.push(date);
  }
  return dates;
};

export const getHoursAndMinutes = (time: string) =>
  time.split(":").map((time) => Number(time));

export const timeinMinutes = (hour: number, minutes: number) =>
  hour * 60 + minutes;

export const getSlots = (
  startTime: number,
  duration: number | undefined,
  endTime: number,
) => {
  let currentTime = startTime;
  const availableTimes = [];
  const slotInterval = 30;
  while (duration && duration + currentTime <= endTime) {
    const hours = Math.floor(currentTime / 60);
    const minutes = currentTime % 60;
    const timeInString = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

    availableTimes.push(timeInString);
    currentTime += slotInterval;
  }
  return availableTimes;
};
