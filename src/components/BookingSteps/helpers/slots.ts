import type {
  Appointment,
  AppointmentInterval,
  Schedule,
  Service,
  SlotInterval,
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
export const getSlotsIntervals = (
  slots: SlotInterval[],
  serviceDuration: number,
) => {
  const slotIntervals = slots.map((slot) => {
    const [hours, minutes] = getHoursAndMinutes(slot.time);

    const start = timeInMinutes(hours, minutes);

    return {
      start,
      end: start + serviceDuration,
      masterId: slot.masterId,
    };
  });
  return slotIntervals;
};

export const getAvailableSlots = (
  slots: TimeInterval[],
  appointments: AppointmentInterval[],
) => {
  return slots.filter((slot) => {
    const hasConflict = appointments.some(
      (appointment) =>
        appointment.masterId === slot.masterId &&
        slot.start < appointment.end &&
        slot.end > appointment.start,
    );

    return !hasConflict;
  });
};

export const getSlotsFromSchedule = (
  workingSchedules: Schedule[],
  serviceDuration: number,
) => {
  const slotsFromSchedule = workingSchedules.flatMap((schedule) => {
    const masterId = schedule.masterId;
    const [startHours, startMinutes] = getHoursAndMinutes(schedule.startTime);
    const startTimeInMinutes = timeInMinutes(startHours, startMinutes);
    const [endHours, endMinutes] = getHoursAndMinutes(schedule.endTime);
    const endTimeInMinutes = timeInMinutes(endHours, endMinutes);
    const slots = getSlots(
      startTimeInMinutes,
      serviceDuration,
      endTimeInMinutes,
    );
    return slots.map((time) => ({ time, masterId }));
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
    const masterId = appointment.masterId;

    return { start, duration, end: start + duration, masterId };
  });
  return appointmentsIntervals;
};
