import React from 'react';
import { TextField } from '@mui/material';
import { UseFormRegister, useForm, useFormContext } from 'react-hook-form';

// interface InputProfileCustomProps {
//     type: string,
//     value: string | number | undefined,
//     fullWidth: boolean,
//     disabled: boolean,
//     label: string
// }
// export const InputProfileCustom: React.FC<InputProfileCustomProps> = (props: InputProfileCustomProps) => {
//     const {type} = props;
//     const {value} = props;
//     const {fullWidth} = props;
//     const {disabled} = props;
//     const {label} = props;
//     return (
//         <>
//             <label htmlFor={label} />
//             <Input type={type} name={label} value={value} fullWidth={fullWidth} disabled={disabled}></Input>
//         </>
//     )
// };

{/* <TextField */}
            {/* fullWidth
            disabled
            type='text'
            {...register("username")}
            label={'Username'}
            value={username}
            onChange={handleUserNameChange}
            InputLabelProps={{ shrink: true }}

          /> */}

// interface InputProfileCustomProps extends React.InputHTMLAttributes<HTMLInputElement> {
//     label: string,
//     type: string,
//     value: string | number | undefined,
//     disabled: boolean,
//     onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
// }

// export const InputProfileCustom: React.FC<InputProfileCustomProps> = (props: InputProfileCustomProps) => {
//     const { label, type, value, disabled, onChange } = props;
//     return (
//         <TextField
//             label={label}
//             fullWidth
//             type={type}                
//             value={value}
//             disabled={disabled}
//             onChange={onChange}
//             sx={{ margin: 'auto' }}
//             InputLabelProps={{ shrink: true }}
//         />
//     )
// }

// InputProfileCustom.tsx




interface InputProfileCustomProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  value: string | number | undefined;
  disabled: boolean;
  registerProps: string;
}

export const InputProfileCustom: React.FC<InputProfileCustomProps> = (props: InputProfileCustomProps) => {
    const { label, type, value, disabled, registerProps } = props;
    const register = useFormContext().register;
  return (
    <TextField
        label={label}
        fullWidth
        type={type}
        value={value}
        disabled={disabled}
        {...register(registerProps)} // Utilisation du register ici
        sx={{ margin: 'auto' }}
        InputLabelProps={{ shrink: true }}
    />
  );
};
