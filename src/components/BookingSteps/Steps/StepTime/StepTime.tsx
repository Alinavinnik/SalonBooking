import { useQuery } from "@tanstack/react-query";
import { services } from "../../service";
import css from "./StepTime.module.css";
import { getScheduleByMasterId } from "../../../../api/services";
import {
  getAppointmentsIntervals,
  getAvailableSlots,
  getSlots,
} from "../../helpers/slots";
import {
  timeInMinutes,
  getHoursAndMinutes,
  timeInString,
} from "../../helpers/time";
import { toggleSelection } from "../../helpers/selection";
import SelectableCard from "../../SelectableCard/SelectableCard";
import { useMasters } from "../../../../hooks/hooks";
import { appointments } from "../../appointments";

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
  const { data: schedules, isPending } = useQuery({
    queryKey: ["schedule", selectedMasterId],
    queryFn: () => {
      if (!selectedMasterId) {
        return;
      } else if (selectedMasterId === "any") {
        return getScheduleByMasterId();
      }
      return getScheduleByMasterId(selectedMasterId);
    },
    enabled: !!selectedMasterId,
  });

  const masters = useMasters();

  const availableMasters = masters?.filter((master) =>
    master.serviceIds.some((service) => service === selectedServiceId),
  );
  const availableMasterIds = availableMasters?.map((master) => master.id);
  if (!selectedDate) {
    return;
  }
  const date = new Date(selectedDate);
  const dayOfWeek = date.getDay();

  const workingSchedules = schedules?.filter((schedule) => {
    if (selectedMasterId === "any") {
      return (
        availableMasterIds?.includes(schedule.masterId) &&
        schedule.workingDays.includes(dayOfWeek)
      );
    }
    return schedule.workingDays.includes(dayOfWeek);
  });

  const service = services.find((service) => service.id === selectedServiceId);
  const serviceDuration = service?.duration;

  const appointmentsForSelectedDate = appointments.filter(
    (appointment) =>
      appointment.masterId === selectedMasterId &&
      appointment.date === selectedDate,
  );

  const appointmentsIntervals = getAppointmentsIntervals(
    appointmentsForSelectedDate,
    services,
  );

  const slots = workingSchedules?.flatMap((schedule) => {
    const [startHours, startMinutes] = getHoursAndMinutes(schedule.startTime);
    const startTimeInMinutes = timeInMinutes(startHours, startMinutes);
    const [endHours, endMinutes] = getHoursAndMinutes(schedule.endTime);
    const endTimeInMinutes = timeInMinutes(endHours, endMinutes);
    const slots = getSlots(
      startTimeInMinutes,
      serviceDuration,
      endTimeInMinutes,
    );
    return slots;
  });

  const filteredSlots = [...new Set(slots)].sort();
  if (!serviceDuration) {
    return;
  }
  const slotsInMinutes = filteredSlots.map((slot) => {
    const [hours, minutes] = getHoursAndMinutes(slot);

    const start = timeInMinutes(hours, minutes);

    return {
      start,
      end: start + serviceDuration,
    };
  });

  const availableSlots = getAvailableSlots(
    slotsInMinutes,
    appointmentsIntervals,
  );

  const availableSlotsTime = availableSlots
    .map((slot) => slot.start)
    .map((slot) => timeInString(slot));

  const handleClick = (time: string) => {
    onSelect(toggleSelection({ id: time, selectedItem: selectedTime }));
  };
  if (isPending) {
    return <p>Завантаження...</p>;
  }
  if (!schedules?.[0]) {
    return <p>Розклад майстра не знайдено</p>;
  }
  if (!selectedDate) {
    return <p></p>;
  }

  return (
    <div className={css.content}>
      <h1>Оберіть час </h1>
      <ul className={css.timeSlots}>
        {availableSlotsTime.map((time) => (
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
