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

type Service = {
  id: string;
  category: string;
  name: string;
  duration: number;
  price: number;
};

export const services: Service[] = [
  // Волосся
  {
    id: "hair-1",
    category: "hair",
    name: "Жіноча стрижка",
    duration: 60,
    price: 900,
  },
  {
    id: "hair-2",
    category: "hair",
    name: "Чоловіча стрижка",
    duration: 45,
    price: 700,
  },
  {
    id: "hair-3",
    category: "hair",
    name: "Дитяча стрижка",
    duration: 40,
    price: 500,
  },
  {
    id: "hair-4",
    category: "hair",
    name: "Стрижка кінчиків",
    duration: 30,
    price: 500,
  },
  {
    id: "hair-5",
    category: "hair",
    name: "Укладка волосся",
    duration: 45,
    price: 700,
  },
  {
    id: "hair-6",
    category: "hair",
    name: "Вечірня зачіска",
    duration: 90,
    price: 1400,
  },
  {
    id: "hair-7",
    category: "hair",
    name: "Фарбування коренів",
    duration: 120,
    price: 1600,
  },
  {
    id: "hair-8",
    category: "hair",
    name: "Фарбування в один тон",
    duration: 150,
    price: 2000,
  },
  {
    id: "hair-9",
    category: "hair",
    name: "Складне фарбування",
    duration: 240,
    price: 3500,
  },
  {
    id: "hair-10",
    category: "hair",
    name: "Тонування волосся",
    duration: 120,
    price: 1700,
  },
  {
    id: "hair-11",
    category: "hair",
    name: "Відновлення волосся",
    duration: 90,
    price: 1300,
  },
  {
    id: "hair-12",
    category: "hair",
    name: "Миття та сушіння волосся",
    duration: 30,
    price: 400,
  },

  // Нігті
  {
    id: "nails-1",
    category: "nails",
    name: "Класичний манікюр",
    duration: 60,
    price: 600,
  },
  {
    id: "nails-2",
    category: "nails",
    name: "Апаратний манікюр",
    duration: 60,
    price: 650,
  },
  {
    id: "nails-3",
    category: "nails",
    name: "Манікюр із покриттям",
    duration: 90,
    price: 900,
  },
  {
    id: "nails-4",
    category: "nails",
    name: "Зняття та манікюр із покриттям",
    duration: 120,
    price: 1050,
  },
  {
    id: "nails-5",
    category: "nails",
    name: "Чоловічий манікюр",
    duration: 60,
    price: 700,
  },
  {
    id: "nails-6",
    category: "nails",
    name: "Класичний педикюр",
    duration: 75,
    price: 900,
  },
  {
    id: "nails-7",
    category: "nails",
    name: "Педикюр із покриттям",
    duration: 120,
    price: 1200,
  },
  {
    id: "nails-8",
    category: "nails",
    name: "Зняття гель-лаку",
    duration: 30,
    price: 250,
  },
  {
    id: "nails-9",
    category: "nails",
    name: "Укріплення нігтів",
    duration: 30,
    price: 300,
  },
  {
    id: "nails-10",
    category: "nails",
    name: "Ремонт одного нігтя",
    duration: 15,
    price: 100,
  },
  {
    id: "nails-11",
    category: "nails",
    name: "Нарощування нігтів",
    duration: 180,
    price: 1600,
  },
  {
    id: "nails-12",
    category: "nails",
    name: "Дизайн нігтів",
    duration: 30,
    price: 300,
  },

  // Брови
  {
    id: "brows-1",
    category: "brows",
    name: "Корекція брів",
    duration: 30,
    price: 400,
  },
  {
    id: "brows-2",
    category: "brows",
    name: "Фарбування брів",
    duration: 30,
    price: 400,
  },
  {
    id: "brows-3",
    category: "brows",
    name: "Корекція та фарбування брів",
    duration: 45,
    price: 600,
  },
  {
    id: "brows-4",
    category: "brows",
    name: "Моделювання форми брів",
    duration: 40,
    price: 500,
  },
  {
    id: "brows-5",
    category: "brows",
    name: "Ламінування брів",
    duration: 60,
    price: 800,
  },
  {
    id: "brows-6",
    category: "brows",
    name: "Ламінування та фарбування брів",
    duration: 75,
    price: 1000,
  },
  {
    id: "brows-7",
    category: "brows",
    name: "Освітлення брів",
    duration: 30,
    price: 450,
  },
  {
    id: "brows-8",
    category: "brows",
    name: "Довготривала укладка брів",
    duration: 60,
    price: 850,
  },
  {
    id: "brows-9",
    category: "brows",
    name: "Фарбування вій",
    duration: 30,
    price: 400,
  },
  {
    id: "brows-10",
    category: "brows",
    name: "Ламінування вій",
    duration: 90,
    price: 1100,
  },
];
