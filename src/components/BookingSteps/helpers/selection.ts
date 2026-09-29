import type { ToggleProps } from "../types/types";

export const toggleSelection = ({ id, selectedItem }: ToggleProps) => {
  if (id === selectedItem) {
    return null;
  }
  return id;
};
