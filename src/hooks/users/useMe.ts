import { useQuery } from "react-query";
import { api } from "../../services/api";

type User = {
  id: number;
  name: string;
  login: string;
  email: string;
  admin: boolean;
  active: boolean;
  invites: Invite[] | null;
}

export type Invite = {
  id: number;
  email: string;
  idFamily: number;
  inviteCode: string;
  invitedName: string;
  invitedFamilyName: string;
}

type MeResponse = {
  user: User;
  isLoggedIn: boolean;
}

export async function getMe(): Promise<MeResponse> {
  try {
    const response = await api.get('v1/me');
    const user = response.data as User;
    return { user, isLoggedIn: true };
  } catch {
    return { user: null, isLoggedIn: false };
  }
}

export function useMe() {
  return useQuery(['me'], async () => getMe(), {});
}
