import { useQuery } from "@tanstack/react-query";
import { getMasters } from "../../../api/mastersServices";
import SelectableCard from "../SelectableCard/SelectableCard";
import { toggleSelection } from "../helpers/helpers";

interface StepMasterProps {
  onSelect: (masterId: string | null) => void;
  selectedMaster: string | null;
  selectedServiceId: string | null;
}

const StepMaster = ({
  onSelect,
  selectedMaster,
  selectedServiceId,
}: StepMasterProps) => {
  const { data: masters } = useQuery({
    queryKey: ["masters"],
    queryFn: getMasters,
  });
  console.log(masters);

  const handleClick = (masterId: string) => {
    onSelect(toggleSelection({ id: masterId, selectedItem: selectedMaster }));
  };
  return (
    <div>
      <h2>Оберіть майстра</h2>
      {masters
        ?.filter((master) =>
          master.serviceIds.some(
            (serviceId) => serviceId === selectedServiceId,
          ),
        )
        .map((master) => {
          return (
            <ul key={master.id}>
              <SelectableCard
                onSeleced={() => handleClick(master.id)}
                isSelected={master.id === selectedMaster}
              >
                {master.name}
                <span>{master.specialization}</span>
              </SelectableCard>
            </ul>
          );
        })}
    </div>
  );
};

export default StepMaster;
