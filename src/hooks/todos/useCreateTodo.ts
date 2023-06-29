import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";

export type createTodoFormData = {
  todoName: string;
}

type ErrorType = {
  title: string;
  details: string;
}

export function useCreateTodo(onSuccess?: () => {}, onError?: () => {}) {
  const toast = useToast()
  return useMutation(async (todo: createTodoFormData) => {
    const response = await api.post('v1/todo', {
      ...todo
    })

    return response.data.user;
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['family'])

      onSuccess?.()
      toast({
        title: "Sucesso",
        description: "Todo cadastrada com sucesso!",
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
