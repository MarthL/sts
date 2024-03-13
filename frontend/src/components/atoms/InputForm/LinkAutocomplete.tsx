import React, { Dispatch, SetStateAction, useState } from "react";
import { getLinksCollection } from "../../../api/links";
import { useFormContext } from "react-hook-form";
import { createFilterOptions, TextField, Autocomplete } from "@mui/material";

interface Link {
  id: number,
  url: string
}

interface LinkAutocompleteProps {
  label: string;
  collection: Link[];
  value: Link | null | undefined;
  registerProps: string;
  defaultValue?: string;
  setValue: Dispatch<SetStateAction<Link | null>>;
}

export const LinkAutocomplete = (props: LinkAutocompleteProps) => {
  const { label, value, registerProps, collection, setValue } = props;
  const { register } = useFormContext();
  const [suggestions, setSuggestions] = useState(collection);
  
  const OPTIONS_LIMIT = 5;
  const filterOptions = createFilterOptions({
    limit: OPTIONS_LIMIT
  });

  const handleInputChange = (event: any) => {
    if ( event !== null){
      getLinksCollection(event.target.value).then((res) => {
        console.log('get Links collection event.target.value : ', event.target.value)
        setSuggestions(res);
        console.log('link setSuggestions res', res)
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
        const link = option as Link;
        return link.url;
      }}
      onChange={(event, selectedElement) => {
        if (selectedElement) {
          const link = selectedElement as Link;
          setValue(link);
        }
      }}
      onInputChange={handleInputChange}
      sx={{ width: '100%' }}
      renderInput={(params) => (
        <TextField
          {...params}
          defaultValue={value ? value?.url : ''}
          label={label}
          {...register(registerProps)}
        />
      )}
    />
  );
}