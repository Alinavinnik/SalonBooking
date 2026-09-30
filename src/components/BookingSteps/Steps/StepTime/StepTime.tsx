import css from "./StepTime.module.css";

import { toggleSelection } from "../../helpers/selection";
import SelectableCard from "../../SelectableCard/SelectableCard";
import { useAvailableSlots } from "../../../../hooks/hooks";

interface StepTimeProps {
  selectedServiceId: string | null;
  selectedMasterId: string | null;
  selectedDate: string | null;
  onSelect: (time: string | null) => void;
  selectedTime: string | null;
}

const StepTime = ({
  selectedMasterId,
  selectedServiceId,
  selectedDate,
  onSelect,
  selectedTime,
}: StepTimeProps) => {
  const { availableSlots, isPending } = useAvailableSlots({
    selectedMasterId,
    selectedServiceId,
    selectedDate,
  });

  const handleClick = (time: string) => {
    onSelect(toggleSelection({ id: time, selectedItem: selectedTime }));
  };
  if (isPending) {
    return <p>Завантаження...</p>;
  }

  return (
    <div className={css.content}>
      <h1>Оберіть час </h1>
      <ul className={css.timeSlots}>
        {availableSlots.map((time) => (
          <SelectableCard
            key={time}
            onSelected={() => handleClick(time)}
            isSelected={time === selectedTime}
          >
            {time}
          </SelectableCard>
        ))}
      </ul>
    </div>
  );
};

export default StepTime;
