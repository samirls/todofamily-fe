import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { AxiosError } from "axios";

type ErrorType = {
  title: string;
  details: string;
}

export function useDeleteTodo() {
  const toast = useToast()
  return useMutation(async (todoId: number) => {
    const response = await api.delete(`v1/todo/${todoId}`)
    return response.data.user;
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['family'])
      toast({
        description: 'Tarefa deletada com sucesso!',
        status: 'success',
        duration: 1500,
        isClosable: true,
        position: "top"
      });
    }, onError: (error: AxiosError<ErrorType>) => {
      toast({
        title: error.response.data.title,
        description: error.response.data.details,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  });
}
