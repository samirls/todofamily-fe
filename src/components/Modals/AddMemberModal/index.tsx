import {
  Box,
  Button,
  HStack,
  LightMode,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import React, { ReactNode, useCallback } from "react";
import * as yup from "yup";
import { useRouter } from "next/router";
import { Formik } from 'formik';
import { InputFormik } from "../../Form/input";
import { useCreateFamily } from "../../../hooks/family/useCreateFamily";
import { useInviteMember } from "../../../hooks/invite/useInviteMember";

const memberValidationSchema = yup.object().shape({
  email: yup.string().required('Nome da família obrigatório'),
})

interface ModalTypes {
  onOk?: () => void;
  onCancel?: () => void;
  trigger: (onOpen?: () => void, onClose?: () => void) => ReactNode;
  text?: string;
  familyId: number;
}

const initialValues = {
  email: ''
}

export function AddMemberModal({onOk, onCancel, trigger, familyId}: ModalTypes) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const router = useRouter();
  const inviteMember = useInviteMember(() => router.push('/families'))

  const handleOk = useCallback(() => {
    onClose();
  }, [onClose])

  const handleInviteMember = async (values) => {
    handleOk()
    await inviteMember.mutate({familyId, ...values})
  }

  const handleCancel = useCallback(() => {
    onCancel?.();
    onClose();
  }, [onClose, onCancel])

  return (
    <>
      {trigger(onOpen, onClose)}
      <Modal
        onClose={handleCancel}
        isOpen={isOpen}
        isCentered
        size={"sm"}
      >
        <ModalOverlay backdropFilter='blur(1px)' />
        <ModalContent bg={"white"}>
          <Formik initialValues={initialValues}
                  validationSchema={memberValidationSchema}
                  onSubmit={handleInviteMember}
          >
            {({handleSubmit, handleChange, values, errors, isSubmitting}) =>
              <>
                <form onSubmit={handleSubmit}>
                  <Stack>
                    <ModalHeader fontWeight={"medium"}>Adicionar Membro</ModalHeader>
                    <ModalCloseButton />
                  </Stack>
                  <ModalBody justifyContent={"center"}>
                    <Box flex={1} borderRadius={8} bg={"white"} >
                      <VStack spacing={8}>
                        <SimpleGrid minChildWidth={"150px"} spacing={5} w={"100%"}>
                          <SimpleGrid minChildWidth={"240px"} spacing={5} w={"100%"}>
                            <InputFormik label={"Email do membro"}
                                         name={"email"}
                                         important={"*"}
                                         type={"text"}
                                         onChange={handleChange}
                                         value={values.email}
                                         error={errors.email}
                            />
                          </SimpleGrid>
                        </SimpleGrid>
                      </VStack>
                    </Box>
                  </ModalBody>
                  <ModalFooter>
                    <HStack spacing={1}>
                      <LightMode>
                        <Button size={"sm"} fontWeight={"medium"} onClick={handleCancel}>Cancelar</Button>
                        <Button size={"sm"} fontWeight={"medium"} isLoading={isSubmitting} bg={"gray.800"} color={"white"} type={"submit"}>Salvar</Button>
                      </LightMode>
                    </HStack>
                  </ModalFooter>
                </form>
              </>
            }
          </Formik>
        </ModalContent>
      </Modal>
    </>
  )
}
