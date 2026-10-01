export type CategoryId = "hair" | "nails" | "brows";

type Category = {
  id: CategoryId;
  label: string;
};
export const categories: Category[] = [
  { id: "hair", label: "Волосся" },
  { id: "nails", label: "Нігті" },
  { id: "brows", label: "Брови" },
];

export type Service = {
  id: string;
  category: string;
  name: string;
  duration: number;
  price: number;
};
export interface Schedule {
  endTime: string;
  id: string;
  masterId: string;
  startTime: string;
  workingDays: number[];
}

export interface ToggleProps {
  id: string;
  selectedItem: string | null;
}

export interface AppointmentInterval {
  start: number;
  end: number;
  masterId: string;
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
