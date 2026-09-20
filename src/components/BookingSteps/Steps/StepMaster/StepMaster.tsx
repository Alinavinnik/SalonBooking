import { useQuery } from "@tanstack/react-query";
import { getMasters } from "../../../../api/services";
import SelectableCard from "../../SelectableCard/SelectableCard";
import { toggleSelection } from "../../helpers/helpers";
import css from "./StepMaster.module.css";

interface StepMasterProps {
  onSelect: (masterId: string | null) => void;
  selectedMaster: string | null;
  selectedServiceId: string | null;
}
const ANY_MASTER = "any";

const StepMaster = ({
  onSelect,
  selectedMaster,
  selectedServiceId,
}: StepMasterProps) => {
  const { data: masters } = useQuery({
    queryKey: ["masters"],
    queryFn: getMasters,
  });
  const handleClick = (masterId: string) => {
    onSelect(toggleSelection({ id: masterId, selectedItem: selectedMaster }));
  };
  return (
    <div>
      <h2>Оберіть майстра</h2>
      <ul className={css.masterSlots}>
        <SelectableCard
          onSeleced={() => handleClick(ANY_MASTER)}
          isSelected={ANY_MASTER === selectedMaster}
        >
          Будь-який майстер <span>Найближчий вільний час</span>
        </SelectableCard>
        {masters
          ?.filter((master) =>
            master.serviceIds.some(
              (serviceId) => serviceId === selectedServiceId,
            ),
          )
          .map((master) => {
            return (
              <SelectableCard
                key={master.id}
                onSeleced={() => handleClick(master.id)}
                isSelected={master.id === selectedMaster}
              >
                {master.name}
                <span>{master.specialization}</span>
              </SelectableCard>
            );
          })}
      </ul>
    </div>
  );
};

export default StepMaster;
