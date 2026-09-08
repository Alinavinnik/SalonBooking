import { useState } from "react";
import { categories, services, type CategoryId } from "../data";

const ServiceStep = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>("hair");
  const handleClick = (categoryId: CategoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div>
      <h2>Оберіть послугу</h2>
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => handleClick(category.id)}
        >
          {category.label}
        </button>
      ))}
      <div>
        {selectedCategory === "brows" &&
          services
            .filter((category) => category.category === "brows")
            .map((category) => (
              <div key={category.id}>
                <h3>{category.name}</h3>
                <p>{category.price}</p>
                <p>{category.duration}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ServiceStep;
