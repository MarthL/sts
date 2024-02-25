import { Typography } from "@mui/material";

interface ErrorLalbel {
  message: string;
}

export const ErrorLabel = (props: ErrorLalbel) => {
  const { message } = props;
  return (
    <>
      <Typography color={'red'}>{message}</Typography>
    </>
  )
};