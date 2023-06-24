import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';
import React from 'react';
import { InputFormik } from "../../components/Form/input";
import NextLink from "next/link";
import { Formik } from "formik";
import { createUserValidationSchema } from "../users/create";
import { useRouter } from "next/router";
import { useSignIn } from "../../hooks/users/useSignIn";

const initialValues = {
  name: '',
  login: '',
  email: '',
  password: '',
  password_confirmation: ''
}

export default function SignupCard() {
  const router = useRouter();
  const mainColor = useColorModeValue('white', 'gray.700')
  const createUser = useSignIn(() => router.push('/'))
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const handleCreateUser = async (values) => {
    await createUser.mutateAsync(values)
  }

  return (
    <Container maxW={'7xl'} height="100vh">
      <Flex h="calc(100%)" justify={"center"} align={"center"} >

        <Stack spacing={5} maxW={'auto'} w={isMobile ? "full" : "md"}>
          <Stack align={'center'}>
            <Heading fontSize={'2xl'} textAlign={'center'}>
              Crie sua conta
            </Heading>
          </Stack>

          <Formik initialValues={initialValues}
                  validateOnChange={false}
                  validationSchema={createUserValidationSchema}
                  onSubmit={handleCreateUser}>
            {({handleSubmit, handleChange, values, errors}) =>
              <>
                <form onSubmit={handleSubmit}>
                  <Box rounded={'lg'}
                       bg={mainColor}
                       boxShadow={'0px 0px 10px rgba(0, 0, 0, 0.2)'}
                       p={5}>
                    <Stack spacing={4}>
                      <HStack>
                          <InputFormik label={"Nome"}
                                       name={"name"}
                                       important={"*"}
                                       type={"text"}
                                       onChange={handleChange}
                                       value={values.name}
                                       error={errors.name}
                          />
                      </HStack>
                      <InputFormik label={"Email"}
                                   name={"email"}
                                   important={"*"}
                                   type={"text"}
                                   onChange={handleChange}
                                   value={values.email}
                                   error={errors.email}
                      />
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
                      <Stack spacing={10} pt={2}>
                        <Button type={"submit"}
                                size="lg"
                                bg={'black'}
                                color={'white'}
                                _hover={{
                                  bg: 'gray',
                                }}>
                          Registrar
                        </Button>
                      </Stack>
                      <Stack pt={6}>
                        <NextLink href={"/"}>
                          <Text align={'center'}>
                            Já tem uma conta? <Link color={'blue.400'}>Login</Link>
                          </Text>
                        </NextLink>
                      </Stack>
                    </Stack>
                  </Box>
                </form>
              </>
            }
          </Formik>
        </Stack>
      </Flex>
    </Container>
  );
}
