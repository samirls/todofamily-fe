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
import { useUpdateUserPassword } from "../../hooks/useUpdateUserPassword";
import { InputFormik } from "../Form/input";

const paasswordValidationSchema = yup.object().shape({
  password: yup.string().required('Senha obrigatória').min(6, 'No minimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')
  ], 'As senhas precisam ser iguais')
})

interface ModalTypes {
  onOk?: () => void;
  onCancel?: () => void;
  trigger: (onOpen?: () => void, onClose?: () => void) => ReactNode;
  text?: string;
  id: number;
  mainColor: string;
}

const initialValues = {
  password: ''
}

export function ModalPassword({onOk, onCancel, trigger, id, mainColor}: ModalTypes) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const router = useRouter();
  const updatePassword = useUpdateUserPassword(() => router.push('/users'))

  const handleOk = useCallback(() => {
    onClose();
  }, [onClose])

  const handleCreateAddress = async (values) => {
    handleOk()
    await updatePassword.mutate({
      id, ...values
    })
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
        <ModalContent bg={mainColor}>
          <Formik initialValues={initialValues}
                  validationSchema={paasswordValidationSchema}
                  onSubmit={handleCreateAddress}
          >
            {({handleSubmit, handleChange, values, errors, isSubmitting}) =>
              <>
                <form onSubmit={handleSubmit}>

                  <Stack>
                    <ModalHeader fontWeight={"medium"}>Alterar Senha</ModalHeader>
                    <ModalCloseButton />
                  </Stack>

                  <ModalBody justifyContent={"center"}>
                    <Box flex={1} borderRadius={8} bg={mainColor} >
                      <VStack spacing={8}>
                        <SimpleGrid minChildWidth={"150px"} spacing={5} w={"100%"}>
                          <SimpleGrid minChildWidth={"240px"} spacing={5} w={"100%"}>
                            <InputFormik label={"Nova Senha"}
                                         name={"password"}
                                         important={"*"}
                                         type={"password"}
                                         onChange={handleChange}
                                         value={values.password}
                                         error={errors.password}
                            />
                            <InputFormik label={"Confirmação da Senha"}
                                         name={"password_confirmation"}
                                         important={"*"}
                                         type={"password"}
                                         onChange={handleChange}
                                         value={values.password_confirmation}
                                         error={errors.password_confirmation}
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
