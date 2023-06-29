import { useQuery } from "react-query";
import { api } from "../../services/api";

type Family = {
  id: number;
  name: string;
  todos: Todos[] | null;
}

type Todos = {
  id: number;
  todoName: string;
  concluded: boolean;
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
