import { Button, Checkbox, Link, Stack, Text } from "@chakra-ui/react";
import { FormikProps } from "formik";
import { LoginFormData } from "../../../hooks/login/useLogin";
import { InputFormik } from "../input";
import { InputFormikPassword } from "../PasswordInput";
import NextLink from "next/link";

interface LoginFormProps {
  onSubmit: (values: any) => void;
  formik: FormikProps<LoginFormData>;
}

export const LoginForm = ({formik}: LoginFormProps) => {
  const {handleChange, values, errors} = formik;

  return (
    <form onSubmit={formik.handleSubmit} style={{width: "100%"}}>
      <Stack>
        <InputFormik
          placeholder={"Email"}
          name="email"
          type="text"
          onChange={handleChange}
          value={values.email}
          error={errors.email}
        />
        <InputFormikPassword
          placeholder={"Senha"}
          name="password"
          type="password"
          onChange={handleChange}
          value={values.password}
          error={errors.password}
        />
      </Stack>

      <Stack
        mt={"10px"}
        direction={{base: 'row', sm: 'row'}}
        align={'start'}
        justify={'space-between'}
      >
        <Checkbox fontSize={"15px"}>Lembrar</Checkbox>
        <NextLink href={"/forgot"}>
          <Text align={'center'} mt={3} size={"15px"}>
            <Link color={"black"}>Esqueceu sua senha?</Link>
          </Text>
        </NextLink>
      </Stack>
      <Button w={"full"}
              type="submit"
              marginTop={6}
              color={"white"}
              bg={"black"}
              isLoading={formik.isSubmitting}
      >
        Entrar
      </Button>
      <NextLink href={"/sign-in"}>
        <Text align={'center'} mt={"20px"} size={"15px"}>
          <Link color={'black'}>Cadastre-se</Link>
        </Text>
      </NextLink>
    </form>
  );
};
