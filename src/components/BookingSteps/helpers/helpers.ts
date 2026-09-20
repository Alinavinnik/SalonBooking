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
