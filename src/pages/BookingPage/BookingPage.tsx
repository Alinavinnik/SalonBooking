import { useState } from "react";
import ServiceStep from "../../components/BookingSteps/ServeceStep/ServiceStep";
import css from "./BookingPage.module.css";
import StepMaster from "../../components/BookingSteps/StepMaster/StepMaster";

const BookingPage = () => {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null,
  );
  const [currentStep, setCurrentStep] = useState(0);
  const lastStep = 5;

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };
  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };
  return (
    <section className={css.booking}>
      <div className="container">
        <h1></h1>
        {currentStep === 0 && (
          <ServiceStep
            selectedServiceId={selectedServiceId}
            onSelectService={setSelectedServiceId}
          />
        )}
        {currentStep === 1 && <StepMaster />}
        <div>
          {currentStep > 0 && (
            <button type="button" onClick={handleBack}>
              Назад
            </button>
          )}
          {currentStep < lastStep && (
            <button
              type="button"
              onClick={handleNext}
              disabled={!selectedServiceId}
            >
              Далі
            </button>
          )}
          {currentStep === lastStep && (
            <button type="button">Підтвердити запис</button>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingPage;
