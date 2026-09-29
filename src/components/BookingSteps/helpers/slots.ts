import type {
  Appointment,
  AppointmentInterval,
  Schedule,
  Service,
  TimeInterval,
} from "../types/types";
import { getHoursAndMinutes, timeInMinutes } from "./time";

export const getSlots = (
  startTime: number,
  duration: number | undefined,
  endTime: number,
) => {
  let currentTime = startTime;
  const availableTimes = [];
  const slotInterval = 30;
  while (duration && duration + currentTime <= endTime) {
    const hours = Math.floor(currentTime / 60);
    const minutes = currentTime % 60;
    const timeInString = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

    availableTimes.push(timeInString);
    currentTime += slotInterval;
  }
  return availableTimes;
};
export const getSlotsIntervals = (slots: string[], serviceDuration: number) => {
  const slotIntervals = slots.map((slot) => {
    const [hours, minutes] = getHoursAndMinutes(slot);

    const start = timeInMinutes(hours, minutes);

    return {
      start,
      end: start + serviceDuration,
    };
  });
  return slotIntervals;
};

export const getAvailableSlots = (
  slots: TimeInterval[],
  appointments: AppointmentInterval[],
) => {
  const availableSlots = slots.filter((slot) => {
    const hasConflict = appointments.some(
      (appointment) =>
        slot.start < appointment.end && slot.end > appointment.start,
    );
    return !hasConflict;
  });
  return availableSlots;
};

export const getSlotsFromSchedule = (
  workingSchedules: Schedule[],
  serviceDuration: number,
) => {
  const slotsFromSchedule = workingSchedules.flatMap((schedule) => {
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
  return slotsFromSchedule;
};

export const getAppointmentsIntervals = (
  appointmentInterval: Appointment[],
  services: Service[],
) => {
  const appointmentsIntervals = appointmentInterval.map((appointment) => {
    const [appointmentHours, appointmentMinutes] = getHoursAndMinutes(
      appointment.time,
    );
    const start = timeInMinutes(appointmentHours, appointmentMinutes);
    const service = services.find(
      (service) => service.id === appointment.serviceId,
    );
    const duration = service?.duration || 0;

    return { start, duration, end: start + duration };
  });
  return appointmentsIntervals;
};
