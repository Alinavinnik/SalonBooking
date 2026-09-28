import type { ReactNode } from "react";
import css from "./SelectableCard.module.css";

interface SelectableCardProps {
  children: ReactNode;
  isSelected: boolean;
  onSelected: () => void;
}

const SelectableCard = ({
  children,
  isSelected,
  onSelected: onSelected,
}: SelectableCardProps) => {
  return (
    <li>
      <button
        type="button"
        onClick={onSelected}
        className={css.serviceButton}
        aria-pressed={isSelected}
      >
        {children}
      </button>
    </li>
  );
};

export default SelectableCard;
