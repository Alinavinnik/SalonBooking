import css from "./StepTime.module.css";

interface StepTimeProps {
  selectedServiceId: string | null;
  selectedMasterId: string | null;
  selectedDate: string | null;
}

const StepTime = ({
  selectedMasterId,
  selectedServiceId,
  selectedDate,
}: StepTimeProps) => {
  return <div className={css.content}></div>;
};

export default StepTime;
