import { Button, Stack, } from "@chakra-ui/react";
import { FormikProps } from "formik";
import { LoginFormData } from "../../../hooks/login/useLogin";
import { InputFormik } from "../input";
import { InputFormikPassword } from "../PasswordInput";

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
          placeholder={"Password"}
          name="password"
          type="password"
          onChange={handleChange}
          value={values.password}
          error={errors.password}
        />
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
    </form>
  );
};
