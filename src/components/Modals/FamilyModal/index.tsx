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

const familyValidationSchema = yup.object().shape({
  name: yup.string().required('Nome da família obrigatório'),
})

interface ModalTypes {
  onOk?: () => void;
  onCancel?: () => void;
  trigger: (onOpen?: () => void, onClose?: () => void) => ReactNode;
  text?: string;
}

const initialValues = {
  name: ''
}

export function FamilyModal({onOk, onCancel, trigger}: ModalTypes) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const router = useRouter();
  const createFamily = useCreateFamily(() => router.push('/familys'))

  const handleOk = useCallback(() => {
    onClose();
  }, [onClose])

  const handleCreateFamily = async (values) => {
    handleOk()
    await createFamily.mutate({
      ...values
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
        <ModalContent bg={"white"}>
          <Formik initialValues={initialValues}
                  validationSchema={familyValidationSchema}
                  onSubmit={handleCreateFamily}
          >
            {({handleSubmit, handleChange, values, errors, isSubmitting}) =>
              <>
                <form onSubmit={handleSubmit}>
                  <Stack>
                    <ModalHeader fontWeight={"medium"}>Adicionar Família</ModalHeader>
                    <ModalCloseButton />
                  </Stack>
                  <ModalBody justifyContent={"center"}>
                    <Box flex={1} borderRadius={8} bg={"white"} >
                      <VStack spacing={8}>
                        <SimpleGrid minChildWidth={"150px"} spacing={5} w={"100%"}>
                          <SimpleGrid minChildWidth={"240px"} spacing={5} w={"100%"}>
                            <InputFormik label={"Nome da Família"}
                                         name={"name"}
                                         important={"*"}
                                         type={"text"}
                                         onChange={handleChange}
                                         value={values.name}
                                         error={errors.name}
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
