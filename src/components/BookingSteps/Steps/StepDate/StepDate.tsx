import { useQuery } from "@tanstack/react-query";
import { getMasters, getScheduleByMasterId } from "../../../../api/services";
import { getDate, toggleSelection } from "../../helpers/helpers";
import SelectableCard from "../../SelectableCard/SelectableCard";
import css from "./StepDate.module.css";

interface StepDateProps {
  onSelect: (date: string | null) => void;
  selectedDate: string | null;
  selectedMasterId: string | null;
  selectedServiceId: string | null;
}

const StepDate = ({
  onSelect,
  selectedDate,
  selectedMasterId,
  selectedServiceId,
}: StepDateProps) => {
  const dates = getDate(14);

  const { data: masters } = useQuery({
    queryKey: ["masters"],
    queryFn: getMasters,
  });

  const availableMasters = masters?.filter((master) =>
    master.serviceIds.some((service) => service === selectedServiceId),
  );
  const availableMasterIds = availableMasters?.map((master) => master.id);

  const { data: schedules } = useQuery({
    queryKey: ["schedule", selectedMasterId],
    queryFn: () => {
      if (!selectedMasterId) {
        return;
      }
      if (selectedMasterId === "any") {
        return getScheduleByMasterId();
      }
      return getScheduleByMasterId(selectedMasterId);
    },
    enabled: !!selectedMasterId,
  });

  const availableMaterSchedule = schedules?.filter((schedule) =>
    availableMasterIds?.includes(schedule.masterId),
  );

  const handleClick = (dateValue: string) => {
    onSelect(
      toggleSelection({
        id: dateValue,
        selectedItem: selectedDate,
      }),
    );
  };
  const availableDays = dates.filter((date) =>
    schedules?.[0].workingDays.includes(date.getDay()),
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
