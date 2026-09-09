import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://6aa17b202703577aa1e3bb1e.mockapi.io",
});

interface MastersResponse {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  serviceIds: string[];
}

export const getMasters = async () => {
  const { data } = await apiClient.get<MastersResponse[]>("/masters");
  return data;
};
