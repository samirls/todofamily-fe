import { useMutation } from "react-query";
import { api } from "../../services/api";
import { useToast } from "@chakra-ui/react";

type InviteParams = {
  email: string;
  familyId: number;
}

export function useInviteMember(onSuccess?: () => void, onError?: () => void) {
  const toast = useToast();
  return useMutation(async (values: InviteParams) => {
    const response = await api.post(`v1/invite`, null, {
      params: {
        email: values.email,
        familyId: values.familyId,
      }
    });
    return response.data;
  }, {
    onSuccess: async () => {
      onSuccess?.();
      toast({
        description: 'Convite enviado com sucesso!',
        status: 'success',
        duration: 1500,
        isClosable: true,
      });
    },
    onError: (err: any) => {
      toast({
        title: err.response.data.title,
        description: err.response.data.details,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      onError?.();
    },
  });
}

