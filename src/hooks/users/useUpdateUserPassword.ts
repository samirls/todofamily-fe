import { useMutation } from "react-query";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

export type updatePasswordUserFormData = {
  id: number;
  password: string;
  password_confirmation: string;
}

type ErrorType = {
  title: string;
}

export function useUpdateUserPassword(onSuccess?: () => {}, onError?: () => {}) {
  const toast = useToast()

  return useMutation(async (password: updatePasswordUserFormData) => {
    await api.patch('v1/user', {
      ...password
    })

    return null;
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['users'])
      onSuccess?.()
    }, onError: (erro: AxiosError<ErrorType>) => {
      onError?.()

      toast({
        title: erro.response.data.title,
        description: "Você não pode alterar a senha do desenvolvedor",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  });
}
