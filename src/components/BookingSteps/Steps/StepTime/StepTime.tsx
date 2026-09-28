import { useQuery } from "@tanstack/react-query";
import { services } from "../../data";
import css from "./StepTime.module.css";
import { getScheduleByMasterId } from "../../../../api/services";
import {
  getHoursAndMinutes,
  getSlots,
  timeInMinutes,
  toggleSelection,
} from "../../helpers/helpers";
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

  if (isPending) {
    return <p>Завантаження...</p>;
  }
  if (!schedules?.[0]) {
    return <p>Розклад майстра не знайдено</p>;
  }
  if (!selectedDate) {
    return <p></p>;
  }
  const date = new Date(selectedDate);
  const dayOfWeek = date.getDay();

  const workingSchedules = schedules.filter((schedule) => {
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

  const slots = workingSchedules.flatMap((schedule) => {
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
  const handleClick = (time: string) => {
    onSelect(toggleSelection({ id: time, selectedItem: selectedTime }));
  };
  const appointmentsForSelectedDate = appointments.filter(
    (appointment) =>
      appointment.masterId === selectedMasterId &&
      appointment.date === selectedDate,
  );

  const appointmentsIntervals = appointmentsForSelectedDate.map(
    (appointment) => {
      const [appointmentHours, appointmentMinutes] = getHoursAndMinutes(
        appointment.time,
      );
      const start = timeInMinutes(appointmentHours, appointmentMinutes);
      const service = services.find(
        (service) => service.id === appointment.serviceId,
      );

      return { start, duration: service?.duration };
    },
  );

  return (
    <div className={css.content}>
      <h1>Оберіть час </h1>
      <ul className={css.timeSlots}>
        {filteredSlots.map((time) => (
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
