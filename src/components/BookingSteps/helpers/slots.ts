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

interface Appointment {
  start: number;
  end: number;
}
interface TimeInterval {
  start: number;
  end: number;
}

export const getAvailableSlots = (
  slots: TimeInterval[],
  appointments: Appointment[],
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
