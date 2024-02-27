import { useEffect, useState } from "react";
import { Autocomplete, TextField, createFilterOptions } from "@mui/material";
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

    //console.log('new value : ', event.target.value);
  }
  
  useEffect(() => {
    //console.log(city)
  }, [])

  //console.log(props);
  return (
    <Autocomplete
      filterOptions={filterOptions}
      disablePortal
      options={collection}
      value={value}
      getOptionLabel={(option: unknown) => {
        const city = option as City;
        return city.city_name;
      }}
      onChange={(event, selectedElement) => {
        const city = selectedElement as City;
        setValue(city);
      }}
      onInputChange={handleInputChange}
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
