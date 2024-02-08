import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
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
  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedElementId = event.target.value as string;
    const selectedElement = collection?.find((val: any) => val.id === parseInt(selectedElementId, 10)) || null;
    setValue(selectedElement);
  };
  return (
    <>
      <Select
        {...register(registerProps)}
        label={label}
        fullWidth
        value={value && value.length > 0 ? value.toString() : ''}
        onChange={handleChange}
      >
        {collection.map((val: any) => (
          <MenuItem key={val.id} value={val.id.toString()}>
            {val.job_title || val.city_name}
          </MenuItem>
        ))}
      </Select>
    </>
  )
}