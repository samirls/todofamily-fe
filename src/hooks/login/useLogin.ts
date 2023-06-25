import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

export interface LoginFormData {
  email: string;
  password: string;
}

type ErrorType = {
  title: string;
  details: string;
};

export function useLogin() {
  const toast = useToast();
  const router = useRouter();

  return useMutation(
    async ({email, password}: LoginFormData) => {
      await api.post(`/v1/auth/login`, {email, password});
      await router.push("/families");
      await queryClient.invalidateQueries(['me'])
    },
    {
      onError: (error: AxiosError<ErrorType>) => {
        if (error.response?.status === 401) {
          toast({
            title: "Erro na autenticação",
            description: "Login ou senha incorretos.",
            status: "error",
            duration: 3000,
            position: "top",
            isClosable: true,
          });
        } else {
          toast({
            title: "Erro 500",
            description:
              "Um erro aconteceu ao tentar concluir sua solicitação, tente novamente mais tarde.",
            status: "error",
            duration: 3000,
            position: "top",
            isClosable: true,
          });
        }
      },
    }
  );
}
