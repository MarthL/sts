import React from 'react';

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

// interface InputProfileCustomProps extends React.InputHTMLAttributes<HTMLInputElement> {
//     label: string,
//     type: string,
//     value: string | number | undefined,
//     fullWidth: boolean,
//     disabled: boolean
// }

// export const InputProfileCustom: React.FC<InputProfileCustomProps> = (props: InputProfileCustomProps) => {
//     const { label, ...inputProps } = props;
//     return (
//         <label>
//             {label}
//             <input {...inputProps}></input>
//         </label>
//     )
// }