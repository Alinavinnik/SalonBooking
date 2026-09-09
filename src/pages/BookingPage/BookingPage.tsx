import { useState } from "react";
import ServiceStep from "../../components/BookingSteps/ServeceStep/ServiceStep";
import css from "./BookingPage.module.css";

const BookingPage = () => {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null,
  );
  return (
    <section className={css.booking}>
      <div className="container">
        <h1></h1>
        <ServiceStep
          selectedServiceId={selectedServiceId}
          onSelectService={setSelectedServiceId}
        />
      </div>
    </section>
  );
};

export default BookingPage;
