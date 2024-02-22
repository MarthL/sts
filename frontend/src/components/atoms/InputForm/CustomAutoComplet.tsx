import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useFormContext } from 'react-hook-form';
import { Dispatch, SetStateAction } from "react";

interface City {
  id: number;
  city_name: string,
  state: number,
  zip_code: number
}

interface CustomAutoCompleteProps {
  label: string;
  collection: City[];
  value: City | null | undefined;
  registerProps: string;
  setValue: Dispatch<SetStateAction<City | null>>;
}

export const CustomAutoComplete = (props: CustomAutoCompleteProps) => {
  const { label, value, registerProps, collection, setValue } = props;
  const { register } = useFormContext();


  return (
    <Autocomplete
      disablePortal
      options={collection}
      value={value}
      getOptionLabel={(city: City) => city.city_name}
      onChange={(event, selectedElement) => {
        setValue(selectedElement);
      }}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          {...register(registerProps)}
        />
      )}
    />
  );
};
