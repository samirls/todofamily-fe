import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Heading,
  Text,
  HStack,
  LightMode,
  SimpleGrid,
  Tooltip,
  useColorModeValue,
  VStack
} from "@chakra-ui/react";
import NextLink from "next/link";

import * as yup from "yup";
import { useRouter } from "next/router";
import React from "react";
import { Formik } from 'formik';
import { useCreateUser } from "../../hooks/useCreateUser";
import { InputFormik } from "../../components/Form/input";
import SidebarWithHeader from "../../components/SideBar";


export const createUserValidationSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório.').min(3, 'No mínimo 3 caracteres.'),
  email: yup.string().required('E-mail obrigatório.').email('E-mail inválido.'),
  password: yup.string().required('Senha obrigatória.').min(6, 'No mínimo 6 caracteres.'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')
  ], 'As senhas precisam ser iguais.')
});


const initialValues = {
  name: '',
  login: '',
  email: '',
  password: '',
  password_confirmation: '',
  admin: false,
  active: false
}

export default function CreateUser() {
  const router = useRouter()
  const mainColor = useColorModeValue('white', 'gray.800');
  const createUser = useCreateUser(() => router.push('/users'))

  const handleCreateUser = async (values) => {
    await createUser.mutateAsync(values)
  }

  return (
    <SidebarWithHeader containerSize={"full"}>
      <Flex justifyContent={"space-between"} h={"70px"} alignItems={"center"}>
        <HStack spacing={"10px"}>
          <>
            <Text fontSize={"22px"} fontWeight={"medium"}>Adicionar Usuário</Text>
          </>
        </HStack>
      </Flex>
      <Flex w="100%" maxWidth={"auto"} mx={"auto"}>
        <Box flex={1}
             p={5}
             bg={"white"}
             borderRadius={5}
             borderLeft={"1px"}
             borderBottom={"1px"}
             borderRight={"1px"}
             borderColor={"gray.100"}
             boxShadow="0px 0px 4px rgba(0, 0, 0, 0.1)"
        >
          <Formik initialValues={initialValues}
                  validateOnChange={false}
                  validationSchema={createUserValidationSchema}
                  onSubmit={handleCreateUser}
          >
            {({handleSubmit, handleChange, values, errors}) =>
              <>
                <form onSubmit={handleSubmit}>
                  <VStack spacing={8}>
                    <SimpleGrid minChildWidth={"240px"} spacing={8} w={"100%"}>
                      <InputFormik label={"Nome Completo"}
                                   name={"name"}
                                   important={"*"}
                                   type={"text"}
                                   onChange={handleChange}
                                   value={values.name}
                                   error={errors.name}
                      />
                    </SimpleGrid>
                    <SimpleGrid minChildWidth={"240px"} spacing={8} w={"100%"}>
                      <InputFormik label={"Email"}
                                   name={"email"}
                                   important={"*"}
                                   type={"text"}
                                   onChange={handleChange}
                                   value={values.email}
                                   error={errors.email}
                      />

                    </SimpleGrid>
                    <SimpleGrid minChildWidth={"240px"} spacing={8} w={"100%"}>
                      <InputFormik label={"Senha"}
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
                  </VStack>

                  <Flex mt={8} justify={"flex-start"}>
                    <HStack spacing={4}>
                      <Checkbox id="admin"
                                name="admin"
                                onChange={handleChange}
                                isChecked={values.admin}
                      >
                        Admin
                      </Checkbox>
                      <Checkbox id="active"
                                name="active"
                                onChange={handleChange}
                                isChecked={values.active}
                      >
                        Ativo
                      </Checkbox>
                    </HStack>
                  </Flex>
                  <Flex justify={"flex-end"}>
                    <HStack spacing={1}>
                      <NextLink href={"/users"} passHref>
                        <Button
                          fontSize={"13px"}
                          fontWeight={"medium"}
                          colorScheme={"gray"}
                          size={"sm"}
                        >Cancelar
                        </Button>
                      </NextLink>
                      <Button size={"sm"} color={"white"} bg={"black"} fontWeight={"medium"} type={"submit"}>Salvar</Button>
                    </HStack>
                  </Flex>
                </form>
              </>
            }
          </Formik>
        </Box>
      </Flex>
    </SidebarWithHeader>
  );
}
