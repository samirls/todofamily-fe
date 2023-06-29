import { useMutation } from "react-query";
import { api } from "../../services/api";
import { useToast } from "@chakra-ui/react";
import { queryClient } from "../../services/queryClient";

type TodoChangeStatusParams = {
  id: number;
  status: boolean;
};

export function useTodoChangeStatus(onSuccess?: () => void, onError?: () => void) {
  const toast = useToast();

  return useMutation(async (values: TodoChangeStatusParams) => {
    await api.patch(`v1/todo`, null, {
      params: {
        id: values.id,
        status: values.status,
      },
    });
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["todo"]);
      await queryClient.invalidateQueries(["family"]);
      onSuccess?.();
      toast({
        description: "Status da tarefa atualizado com sucesso",
        status: "success",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
    },
    onError: async (err: any) => {
      toast({
        title: "Erro ao atualizar o status da tarefa",
        description: err.response.data.details,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      onError?.();
    },
  });
}
