import { useState } from "react";
import ServiceStep from "../../components/BookingSteps/Steps/ServeceStep/ServiceStep";
import css from "./BookingPage.module.css";
import StepMaster from "../../components/BookingSteps/Steps/StepMaster/StepMaster";
import StepDate from "../../components/BookingSteps/Steps/StepDate/StepDate";

const BookingPage = () => {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null,
  );
  const [selectedMasterId, setSelectedMasterId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const lastStep = 5;

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };
  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };
  const getIsNextDisabled = () => {
    if (currentStep === 0) return !selectedServiceId;

    return false;
  };
  const isNextDisabled = getIsNextDisabled();

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
        {currentStep === 1 && (
          <StepMaster
            onSelect={setSelectedMasterId}
            selectedMaster={selectedMasterId}
            selectedServiceId={selectedServiceId}
          />
        )}
        {currentStep === 2 && (
          <StepDate
            selectedDate={selectedDate}
            onSelect={setSelectedDate}
            selectedMasterId={selectedMasterId}
          />
        )}
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
              disabled={isNextDisabled}
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
