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

export const getNextDays = (numberOfDays: number) => {
  const today = new Date();
  const dates: Date[] = [];
  for (let i = 0; i < numberOfDays; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    dates.push(date);
  }
  return dates;
};
