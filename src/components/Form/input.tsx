import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Text
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";

interface InputProps extends ChakraInputProps {
  name?: string;
  label?: string;
  error?: any;
  important?: string;
  fontWeight?: string;
  fontSize?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
  important,
  name,
  label,
  fontWeight = "medium",
  fontSize = "1rem",
  error = null,
  ...rest
}: InputProps, ref) => {

  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel fontWeight={fontWeight} fontSize={fontSize} m={0} htmlFor={name}>
          {label}<span style={{color: "red"}}>{important}</span>
        </FormLabel>
      )}
      <ChakraInput
        isDisabled={rest.isDisabled}
        name={name}
        placeholder={rest.placeholder}
        type={rest.type}
        value={rest.value}
        onChange={rest.onChange}
        focusBorderColor={"blue.500"}
        bg={"white"}
      />
      <FormErrorMessage mt={1}>
        <Text fontSize={"13px"}>{error}</Text>
      </FormErrorMessage>
    </FormControl>
  );
};

export const InputFormik = forwardRef(InputBase);
