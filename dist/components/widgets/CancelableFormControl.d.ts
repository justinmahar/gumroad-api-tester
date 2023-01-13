import React from 'react';
import { FormControlProps } from 'react-bootstrap';
import { InputProps } from 'react-html-props';
type InputFormControlProps = FormControlProps & InputProps;
interface CancelableFormControlProps extends InputFormControlProps {
    onCancel?: () => void;
    inputClassName?: string;
    inputStyle?: React.CSSProperties;
}
export declare const CancelableFormControl: ({ onCancel, inputClassName, inputStyle, ...formControlProps }: CancelableFormControlProps) => JSX.Element;
export {};
