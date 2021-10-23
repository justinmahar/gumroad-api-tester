import { FaTimesCircle } from '@react-icons/all-files/fa/FaTimesCircle';
import React, { KeyboardEvent } from 'react';
import { Form, FormControlProps } from 'react-bootstrap';
import { InputProps } from 'react-html-props';
import { combineClassNames } from '../component-utils';

type InputFormControlProps = FormControlProps & InputProps;

interface CancelableFormControlProps extends InputFormControlProps {
  onCancel?: () => void;
  inputClassName?: string;
  inputStyle?: React.CSSProperties;
}

export const CancelableFormControl = ({
  onCancel,
  inputClassName,
  inputStyle,
  ...formControlProps
}: CancelableFormControlProps): JSX.Element => {
  const value = formControlProps.value;
  const { width, ...remainingFormControlStyles } = formControlProps.style || {};
  return (
    <div
      className={combineClassNames('d-flex align-items-center position-relative', formControlProps.className)}
      style={{ width: width || '100%', ...remainingFormControlStyles }}
    >
      <Form.Control
        {...formControlProps}
        className={inputClassName}
        style={{ paddingRight: '2rem', ...inputStyle }}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (onCancel && !!value && e.key === 'Escape') {
            e.preventDefault();
            onCancel();
          }

          if (formControlProps.onKeyDown) {
            formControlProps.onKeyDown(e);
          }
        }}
      />
      {onCancel && value && value.toString().length > 0 && (
        <div
          className="p-2 d-flex align-items-center text-dark cursor-pointer position-absolute end-0"
          onClick={() => {
            if (onCancel) {
              onCancel();
            }
          }}
        >
          <FaTimesCircle />
        </div>
      )}
    </div>
  );
};
