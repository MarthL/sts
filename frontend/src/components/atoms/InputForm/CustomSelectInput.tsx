import React, {useState} from "react";
import { Select, MenuItem } from "@mui/material";
import { useFormContext } from 'react-hook-form';


interface CustomSelectInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    value: any;
    registerProps: string;
}

export const CustomSelectInput: React.FC<CustomSelectInputProps> = (props: CustomSelectInputProps) => {
    const { label, value, registerProps } = props;
    const register = useFormContext().register;
    const valueCollection = [value]
    const [values, setValue] = useState('');
    return (
        <Select
            label={label}
            fullWidth
            value={value?.id ? value.id.toString() : ''}
            {...register(registerProps)}
            onChange={(event) => {
                const selectedValueId = event.target.value;
                const selectedValue = valueCollection.find((v) => v.id === parseInt(selectedValueId, 10));
                setValue(selectedValue);
              }}
        >
            {valueCollection.map((value) => (
               <MenuItem value={value?.id}></MenuItem>
            ))}            
        </Select>
    )
}