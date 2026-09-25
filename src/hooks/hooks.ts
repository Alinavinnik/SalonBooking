import { useQuery } from "@tanstack/react-query";
import { getMasters } from "../api/services";

export const useMasters = () => {
  const { data: masters } = useQuery({
    queryKey: ["masters"],
    queryFn: getMasters,
  });
  return masters;
};
