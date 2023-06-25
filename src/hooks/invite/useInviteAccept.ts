import { useMutation } from "react-query";
import { api } from "../../services/api";
import { useToast } from "@chakra-ui/react";
import { queryClient } from "../../services/queryClient";

type InviteParams = {
  userId: number;
  familyId: number;
  familyCode: string;
}

export function useInviteAccept(onSuccess?: () => void, onError?: () => void) {
  const toast = useToast();
  return useMutation(async (values: InviteParams) => {
    const response = await api.put(`v1/family`, null, {
      params: {
        userId: values.userId,
        familyId: values.familyId,
        familyCode: values.familyCode,
      }
    });
    return response.data;
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['me'])
      await queryClient.invalidateQueries(['family'])
      onSuccess?.();
      toast({
        description: 'Você agora faz parte da família',
        status: 'success',
        duration: 1500,
        isClosable: true,
        position: "top"
      });
    },
    onError: async (err: any) => {
      await queryClient.invalidateQueries(['me'])
      await queryClient.invalidateQueries(['family'])
      toast({
        title: err.response.data.title,
        description: err.response.data.details,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "top"
      });
      onError?.();
    },
  });
}

