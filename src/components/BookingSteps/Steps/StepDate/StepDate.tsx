import { useState } from "react";
import { getDate, toggleSelection } from "../../helpers/helpers";
import SelectableCard from "../../SelectableCard/SelectableCard";
import css from "./StepDate.module.css";

interface StepDateProps {
  onSelect: (date: string | null) => void;
  selectedDate: string | null;
  selectedMasterId: string | null;
}

const StepDate = ({
  onSelect,
  selectedDate,
  selectedMasterId,
}: StepDateProps) => {
  const dates = getDate(6);
  const handleClick = (dateValue: string) => {
    onSelect(
      toggleSelection({
        id: dateValue,
        selectedItem: selectedDate,
      }),
    );
  };

  return (
    <div>
      <h1>Оберіть Дату</h1>
      <ul>
        {dates.map((date, i) => {
          const dateValue = date.toISOString().split("T")[0];
          return (
            <SelectableCard
              key={i}
              onSeleced={() => handleClick(dateValue)}
              isSelected={selectedDate === dateValue}
            >
              <span>
                {date.toLocaleDateString("uk-UA", {
                  weekday: "short",
                })}
              </span>
              {date.getDate()}
            </SelectableCard>
          );
        })}
      </ul>
    </div>
  );
};

export default StepDate;
