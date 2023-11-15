import { OutlinedInput } from "@mui/material";

interface CustomInputProps {
  type: string;
  label: string;
}

export const CustomInput = (props: CustomInputProps) => {
  const { type, label } = props;
  return (
    <OutlinedInput
      type={type}
      label={label}
    />
  )
}