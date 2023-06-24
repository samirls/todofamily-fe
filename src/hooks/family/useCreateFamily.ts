import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";

export type createFamilyFormData = {
  name: string;
}

type ErrorType = {
  title: string;
  details: string;
}

export function useCreateFamily(onSuccess?: () => {}, onError?: () => {}) {
  const toast = useToast()
  return useMutation(async (family: createFamilyFormData) => {
    const response = await api.post('v1/family', {
      ...family
    })

    return response.data.user;
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['family'])

      onSuccess?.()
      toast({
        title: "Sucesso",
        description: "Família cadastrada com sucesso!",
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top'
      })
    }, onError: (error: AxiosError<ErrorType>) => {

      onError?.()
      toast({
        title: error.response.data.title,
        description: error.response.data.details,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top'
      })
    }
  });
}
