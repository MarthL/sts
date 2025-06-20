import React, { useState } from "react";
import { Autocomplete, TextField, createFilterOptions } from "@mui/material";
import { useFormContext } from 'react-hook-form';
import { Dispatch, SetStateAction } from "react";
import { getCitiesCollection } from "../../../api/cities";

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
  defaultValue?: string;
  setValue: Dispatch<SetStateAction<City | null>>;
}
export const CustomAutoComplete = (props: CustomAutoCompleteProps) => {
  const { label, value, registerProps, collection, setValue } = props;
  const { register } = useFormContext();

  const [suggestions, setSuggestions] = useState(collection);


  const OPTIONS_LIMIT = 10;
  const filterOptions = createFilterOptions({
    limit: OPTIONS_LIMIT
  });

  const handleInputChange = (event: any) => {
    if (event !== null) {
      getCitiesCollection(event.target.value).then((res) => {
        setSuggestions(res);
      })
        .catch((error) => {
          console.error(error);
        })
    }
  }

  return (
    <Autocomplete
      filterOptions={filterOptions}
      disablePortal
      options={suggestions}
      value={value}
      getOptionLabel={(option: unknown) => {
        const city = option as City;
        return `${city.city_name} (${city.zip_code})`;
      }}
      onChange={(event, selectedElement) => {
        if (selectedElement) {
          const city = selectedElement as City;
          setValue(city);
        }
      }}
      onInputChange={handleInputChange}
      sx={{ width: '100%' }}
      renderInput={(params) => (
        <TextField
          {...params}
          value={value ? value?.city_name : ''}
          label={label}
          {...register(registerProps)}
        />
      )}
    />
  );
};