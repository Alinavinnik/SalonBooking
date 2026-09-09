import { useState } from "react";
import { categories, services, type CategoryId } from "../data";
import css from "./ServiceStep.module.css";
interface ServiceStepProps {
  selectedServiceId: string | null;
  onSelectService: (serviceId: string) => void;
}

const ServiceStep = ({
  selectedServiceId,
  onSelectService,
}: ServiceStepProps) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>("hair");
  const handleClick = (categoryId: CategoryId) => {
    setSelectedCategory(categoryId);
  };

  const filtredCategories = services.filter(
    (category) => category.category === selectedCategory,
  );
  return (
    <div>
      <h2>Оберіть послугу</h2>
      <div className={css.categories}>
        {categories.map((category) => (
          <button
            className={css.categoryBtn}
            key={category.id}
            type="button"
            onClick={() => handleClick(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>
      <div>
        {filtredCategories.map((service) => (
          <button
            key={service.id}
            type="button"
            onClick={() => onSelectService(service.id)}
            className={css.serviceButton}
            aria-pressed={selectedServiceId === service.id}
          >
            <span>{service.name}</span>
            <span className={css.serviceInfo}>
              <span>{service.price} грн</span>
              <span>{service.duration} хв</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceStep;
