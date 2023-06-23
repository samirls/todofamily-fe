import { Container, Flex, useColorModeValue } from "@chakra-ui/react";
import * as yup from 'yup';
import { Formik } from 'formik';
import { useLogin } from "../hooks/login/useLogin";
import { LoginForm } from "../components/Form/LoginForm";

export type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('Email obrigatório'),
  password: yup.string().required('Senha obrigatória')
})

const initialValues = {
  email: '',
  password: ''
}

export default function LoginPage() {
  const mainColor = useColorModeValue('white', 'gray.900');
  const boxColor = useColorModeValue('gray.50', 'gray.800');
  const login = useLogin()

  const handleSignIn = async (values: SignInFormData) => {
    await login.mutateAsync(values)
  }

  return (
    <Container maxW={'7xl'} height="100vh">
      <Flex h="calc(100%)" justify={"center"} align={"center"}>
        <Flex width="400px"
              height="auto"
              bg={boxColor}
              p={"8"}
              rounded={'lg'}
              flexDir={"column"}
              alignItems={"center"}
              boxShadow={'0px 0px 10px rgba(0, 0, 0, 0.2)'}
        >
          {
            mainColor == 'white' ? (<h1>Logo aqui</h1>) : (<h1>Logo aqui</h1>)
          }
          <Flex w={"full"} justify={"center"} mt={"30px"}>
            <Formik initialValues={initialValues}
                    validateOnChange={false}
                    validationSchema={signInFormSchema}
                    onSubmit={handleSignIn}
            >
              {
                formik => <LoginForm formik={formik} onSubmit={formik.handleSubmit} />
              }
            </Formik>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  )
}
