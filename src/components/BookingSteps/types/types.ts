export interface ToggleProps {
  id: string;
  selectedItem: string | null;
}

export interface AppointmentInterval {
  start: number;
  end: number;
}
export interface TimeInterval {
  start: number;
  end: number;
}

export interface Appointment {
  id: string;
  serviceId: string;
  masterId: string;
  date: string;
  time: string;
}
