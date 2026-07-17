import type { InputHTMLAttributes } from "react";
import FormInput from "./FormInput";
import {
  type FieldValues,
  useController,
  type UseControllerProps
} from 'react-hook-form';

interface IProps<TFieldValues extends FieldValues = FieldValues>
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'name'>,
    Omit<UseControllerProps<TFieldValues>, 'defaultValue'> {
  label: string;
  variant?: 'default' | 'error';
  fieldMsg?: string;
  isOptional?: boolean;
  containerClassName?: string;
  showPasswordToggle?: boolean;
}

const FormField = <TFieldValues extends FieldValues = FieldValues>(
  props: IProps<TFieldValues>
) => {
  const { field, fieldState } = useController(props);
  const {
    label,
    variant = 'default',
    fieldMsg,
    isOptional = false,
    containerClassName = '',
    control,
    rules,
    shouldUnregister,
    disabled, 
    showPasswordToggle = true,
    ...restHtmlProps
  } = props;

     const activeVariant = fieldState.error ? 'error' : variant;

  return (
    <div className={`flex flex-col gap-6px ${containerClassName}`}>
      <label
        className={`text-label-sm tracking-[0.55px] uppercase ${activeVariant === 'error' ? 'text-error' : 'text-slate-md'}`}
        htmlFor={label}
      >
        {label}
        {isOptional && (
          <span className="text-secondary-light tracking-normal">
            {' '}
            (optional)
          </span>
        )}
      </label>
      <FormInput
        id={label}
        variant={activeVariant}
        disabled={disabled}
        {...field}
        showPasswordToggle={showPasswordToggle}
        {...restHtmlProps}
      />
      {fieldState.error ? (
        <p className="text-error text-label">{fieldState.error.message}</p>
      ) : (
        fieldMsg && <p className="text-slate-light text-label">{fieldMsg}</p>
      )}
    </div>
  );
};

export default FormField;