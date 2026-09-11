import type { ReactNode } from "react";
import css from "./SelectableCard.module.css";

interface SelectableCardProps {
  children: ReactNode;
  isSelected: boolean;
  onSeleced: () => void;
}

const SelectableCard = ({
  children,
  isSelected,
  onSeleced,
}: SelectableCardProps) => {
  return (
    <li>
      <button
        type="button"
        onClick={onSeleced}
        className={css.serviceButton}
        aria-pressed={isSelected}
      >
        {children}
      </button>
    </li>
  );
};

export default SelectableCard;
