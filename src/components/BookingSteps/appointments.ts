interface Appointment {
  id: string;
  serviceId: string;
  masterId: string;
  date: string;
  time: string;
}

interface Appointment {
  id: string;
  serviceId: string;
  masterId: string;
  date: string;
  time: string;
}

export const appointments: Appointment[] = [
  {
    id: "appointment-1",
    serviceId: "hair-1",
    masterId: "master-1",
    date: "2026-09-29",
    time: "10:00",
  },
  {
    id: "appointment-2",
    serviceId: "hair-2",
    masterId: "master-1",
    date: "2026-09-29",
    time: "14:00",
  },
  {
    id: "appointment-3",
    serviceId: "hair-8",
    masterId: "master-2",
    date: "2026-09-29",
    time: "10:00",
  },
  {
    id: "appointment-4",
    serviceId: "hair-5",
    masterId: "master-3",
    date: "2026-09-30",
    time: "12:00",
  },
];
