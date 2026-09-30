import { useQuery } from "@tanstack/react-query";
import { getMasters, getScheduleByMasterId } from "../api/services";
import { services } from "../components/BookingSteps/service";
import { appointments } from "../components/BookingSteps/appointments";
import {
  getAppointmentsIntervals,
  getAvailableSlots,
  getSlotsFromSchedule,
  getSlotsIntervals,
} from "../components/BookingSteps/helpers/slots";
import { timeInString } from "../components/BookingSteps/helpers/time";

export const useMasters = () => {
  const { data: masters } = useQuery({
    queryKey: ["masters"],
    queryFn: getMasters,
  });
  return masters;
};
interface UseAvailableSlotsProps {
  selectedMasterId: string | null;
  selectedServiceId: string | null;
  selectedDate: string | null;
}

export const useAvailableSlots = ({
  selectedMasterId,
  selectedServiceId,
  selectedDate,
}: UseAvailableSlotsProps) => {
  const { data: schedules, isPending } = useQuery({
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

  const masters = useMasters();

  if (!selectedDate || !selectedServiceId) {
    return {
      availableSlots: [],
      isPending,
    };
  }

  const availableMasters = masters?.filter((master) =>
    master.serviceIds.some((service) => service === selectedServiceId),
  );

  const availableMasterIds = availableMasters?.map((master) => master.id);

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

  if (!serviceDuration || !workingSchedules) {
    return {
      availableSlots: [],
      isPending,
    };
  }

  const appointmentsForSelectedDate = appointments.filter(
    (appointment) =>
      appointment.masterId === selectedMasterId &&
      appointment.date === selectedDate,
  );

  const appointmentsIntervals = getAppointmentsIntervals(
    appointmentsForSelectedDate,
    services,
  );

  const slots = getSlotsFromSchedule(workingSchedules, serviceDuration);

  const filteredSlots = [...new Set(slots)].sort();

  const slotIntervals = getSlotsIntervals(filteredSlots, serviceDuration);

  const availableSlots = getAvailableSlots(
    slotIntervals,
    appointmentsIntervals,
  );

  const availableSlotsTime = availableSlots.map((slot) =>
    timeInString(slot.start),
  );

  return {
    availableSlots: availableSlotsTime,
    isPending,
  };
};
