import React from 'react';
import { TextField } from '@mui/material';
import { UseFormRegister } from 'react-hook-form';

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
  fullWidth: boolean;
  disabled: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<any>; // Ajout du register
}

export const InputProfileCustom: React.FC<InputProfileCustomProps> = (props: InputProfileCustomProps) => {
  const { label, type, value, fullWidth, disabled, onChange, register } = props;

  return (
    <TextField
        label={label}
        fullWidth={fullWidth}
        type={type}
        value={value}
        disabled={disabled}
        onChange={onChange}
        {...register} {/* Utilisation du register ici */...(register)}
        sx={{ margin: 'auto' }}
        InputLabelProps={{ shrink: true }}
    />
  );
};
