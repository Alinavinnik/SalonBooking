import { useState } from "react";
import ServiceStep from "../../components/BookingSteps/Steps/ServeceStep/ServiceStep";
import css from "./BookingPage.module.css";
import StepMaster from "../../components/BookingSteps/Steps/StepMaster/StepMaster";
import StepDate from "../../components/BookingSteps/Steps/StepDate/StepDate";
import StepTime from "../../components/BookingSteps/Steps/StepTime/StepTime";

const BookingPage = () => {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null,
  );
  const [selectedMasterId, setSelectedMasterId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

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
    if (currentStep === 1) return !selectedMasterId;
    if (currentStep === 2) return !selectedDate;
    if (currentStep === 3) return !selectedTime;
    return false;
  };
  const isNextDisabled = getIsNextDisabled();

  return (
    <section className={css.booking}>
      <div className="container">
        <div className={css.formContant}>
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
              selectedServiceId={selectedServiceId}
              selectedDate={selectedDate}
              onSelect={setSelectedDate}
              selectedMasterId={selectedMasterId}
            />
          )}
          {currentStep === 3 && (
            <StepTime
              selectedServiceId={selectedServiceId}
              selectedMasterId={selectedMasterId}
              selectedDate={selectedDate}
              onSelect={setSelectedTime}
              selectedTime={selectedTime}
            />
          )}
        </div>
        <div className={css.btnContainer}>
          {currentStep > 0 && (
            <button className={css.backBtn} type="button" onClick={handleBack}>
              Назад
            </button>
          )}
          {currentStep < lastStep && (
            <button
              className={css.nextBtn}
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
