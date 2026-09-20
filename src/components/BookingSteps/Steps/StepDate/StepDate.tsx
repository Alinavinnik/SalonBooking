import { useQuery } from "@tanstack/react-query";
import { getScheduleByMasterId } from "../../../../api/mastersServices";
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
  const dates = getDate(14);
  const { data } = useQuery({
    queryKey: ["schedule", selectedMasterId],
    queryFn: () => {
      if (!selectedMasterId) {
        return;
      }
      return getScheduleByMasterId(selectedMasterId);
    },
    enabled: !!selectedMasterId,
  });

  const handleClick = (dateValue: string) => {
    onSelect(
      toggleSelection({
        id: dateValue,
        selectedItem: selectedDate,
      }),
    );
  };
  const availableDays = dates.filter((date) =>
    data?.[0].workingDays.includes(date.getDay()),
  );

  return (
    <div className={css.content}>
      <h1>Оберіть Дату</h1>
      <ul className={css.dateSlots}>
        {availableDays.slice(0, 6).map((date, i) => {
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
