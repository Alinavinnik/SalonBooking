interface ToggleProps {
  id: string;
  selectedItem: string | null;
}

export const toggleSelection = ({ id, selectedItem }: ToggleProps) => {
  if (id === selectedItem) {
    return null;
  }
  return id;
};
