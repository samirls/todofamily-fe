import { useQuery } from "react-query";
import { api } from "../../services/api";
import { useRouter } from "next/router";

export const Logout = () => {
  const router = useRouter();

  useQuery(['logout'], async () => {
    await api.post('v1/auth/logout')
    router.push("/");
  })

  return null
}

export default Logout;
