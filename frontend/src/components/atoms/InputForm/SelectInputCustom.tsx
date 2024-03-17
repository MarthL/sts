import { Select, MenuItem, TextField } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { useFormContext } from 'react-hook-form';
interface SelectInputCustomProps {
  label: string,
  value: string | null,
  collection: any,
  registerProps: string;
  setValue: Dispatch<SetStateAction<any>>
}

export const SelectInputCustom = (props: SelectInputCustomProps) => {
  const { label, value, registerProps, setValue, collection } = props;
  const register = useFormContext().register;
  return (
    <>
      <TextField select
        {...register(registerProps)}
        label={label}
        fullWidth
        value={value && value.length > 0 ? value.toString() : ''}
        onChange={(event) => {
          const selectedElementId = event.target.value;
          const selectedElement = collection?.find((val: any) => val.id === parseInt(selectedElementId, 10)) || null;
          setValue(selectedElement);
        }}
        variant={"outlined"} style={{ width: "100%" }}>

        {collection.map((val: any) => (
          <MenuItem key={val.id} value={val.id.toString()}>
            {val.job_title && val.job_title}
          </MenuItem>
        ))}
      </TextField>
    </>
  )
}