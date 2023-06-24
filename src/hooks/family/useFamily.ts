import { useQuery } from "react-query";
import { api } from "../../services/api";

type Family = {
  id: number;
  name: string;
}

async function getFamily(): Promise<Family[]> {
  const response = await api.get('v1/family');
  return response.data;
}

export function useFamily() {
  return useQuery(['family'], () => getFamily(), {
    staleTime: 3000,
  })
}
