import { useQuery } from "@tanstack/react-query";
import { getMasters } from "../../../api/mastersServices";

const StepMaster = () => {
  const { data: masters } = useQuery({
    queryKey: ["masters"],
    queryFn: getMasters,
  });
  return (
    <div>
      <h2>Оберіть майстра</h2>
      {masters?.map((master) => {
        return (
          <ul key={master.id}>
            <li>
              <button>
                {master.name}
                <span>{master.specialization}</span>
              </button>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default StepMaster;
