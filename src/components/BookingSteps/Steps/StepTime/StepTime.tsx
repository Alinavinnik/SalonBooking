import { useQuery } from "@tanstack/react-query";
import { services } from "../../data";
import css from "./StepTime.module.css";
import { getScheduleByMasterId } from "../../../../api/mastersServices";
import {
  getHoursAndMinutes,
  getSlots,
  timeinMinutes,
  toggleSelection,
} from "../../helpers/helpers";
import SelectableCard from "../../SelectableCard/SelectableCard";

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
  const { data, isPending } = useQuery({
    queryKey: ["schedule", selectedMasterId],
    queryFn: () => {
      if (!selectedMasterId) {
        return;
      }
      return getScheduleByMasterId(selectedMasterId);
    },
    enabled: !!selectedMasterId,
  });

  if (isPending) {
    return <div>Завантаження...</div>;
  }
  if (!data?.[0]) {
    return <div>Розклад майстра не знайдено</div>;
  }

  const [startHours, startMinutes] = getHoursAndMinutes(data[0].startTime);
  const startTimeInMinutes = timeinMinutes(startHours, startMinutes);

  const [endHours, endMinutes] = getHoursAndMinutes(data[0].endTime);
  const endTimeInMinutes = timeinMinutes(endHours, endMinutes);

  const selectedService = services.find(
    (servise) => servise.id === selectedServiceId,
  );
  const serviseDuration = selectedService?.duration;

  const slots = getSlots(startTimeInMinutes, serviseDuration, endTimeInMinutes);

  const handelClick = (time: string) => {
    onSelect(toggleSelection({ id: time, selectedItem: selectedTime }));
  };
  return (
    <div className={css.content}>
      <ul>
        {slots.map((time) => (
          <SelectableCard
            key={time}
            onSeleced={() => handelClick(time)}
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
