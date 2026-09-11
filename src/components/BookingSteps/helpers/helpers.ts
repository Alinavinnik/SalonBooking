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
