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
import { useCreateTodo } from "../../../hooks/todos/useCreateTodo";

const todoValidationSchema = yup.object().shape({
  todoName: yup.string().required('Nome da família obrigatório'),
})

interface ModalTypes {
  onOk?: () => void;
  onCancel?: () => void;
  trigger: (onOpen?: () => void, onClose?: () => void) => ReactNode;
  text?: string;
  familyId: number;
}

const initialValues = {
  todoName: ''
}

export function TodoModal({ onCancel, trigger, familyId }: ModalTypes) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const router = useRouter();
  const createTodo = useCreateTodo(() => router.push('/todos'))

  const handleOk = useCallback(() => {
    onClose();
  }, [onClose])

  const handleCreateTodo = async (values) => {
    handleOk()
    await createTodo.mutate({ ...values, familyId })
  }

  const handleCancel = useCallback(() => {
    onCancel?.();
    onClose();
  }, [onClose, onCancel])

  return (
    <>
      { trigger(onOpen, onClose) }
      <Modal
        onClose={handleCancel}
        isOpen={isOpen}
        isCentered
        size={"sm"}
      >
        <ModalOverlay backdropFilter='blur(1px)' />
        <ModalContent bg={"white"}>
          <Formik initialValues={initialValues}
                  validationSchema={todoValidationSchema}
                  onSubmit={handleCreateTodo}
          >
            {({handleSubmit, handleChange, values, errors, isSubmitting}) =>
              <>
                <form onSubmit={handleSubmit}>
                  <Stack>
                    <ModalHeader fontWeight={"medium"}>Adicionar Tarefa</ModalHeader>
                    <ModalCloseButton />
                  </Stack>
                  <ModalBody justifyContent={"center"}>
                    <Box flex={1} borderRadius={8} bg={"white"} >
                      <VStack spacing={8}>
                        <SimpleGrid minChildWidth={"150px"} spacing={5} w={"100%"}>
                          <SimpleGrid minChildWidth={"240px"} spacing={5} w={"100%"}>
                            <InputFormik label={"Nome da Tarefa"}
                                         name={"todoName"}
                                         important={"*"}
                                         type={"text"}
                                         onChange={handleChange}
                                         value={values.todoName}
                                         error={errors.todoName}
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
