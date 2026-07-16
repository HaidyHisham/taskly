import type { InputHTMLAttributes } from "react";
import FormInput from "./FormInput";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  variant?: 'default' | 'error';
  fieldMsg?: string;
  isOptional?: boolean;
  containerClassName?: string;
  showPasswordToggle?: boolean;
}
const FormFields: React.FC<IProps> = ({label, variant='default', fieldMsg, isOptional = false, containerClassName, ...props})=>{

    return (
        <div className={`flex flex-col ${containerClassName}`} >
           <label className={`font-bold pb-2 text-label tracking-[0.55px] uppercase ${variant === 'error' ? 'text-error' : 'text-slate-medium'}`}>
            {label}
          {isOptional && (
          <span className="text-secondary-light tracking-normal">
            {' '}
            (optional)
          </span>
        )}
            </label>
           <FormInput id={label} {...props} variant={variant}/>
           <p className={`${variant === 'error' ? 'text-error' : 'text-slate-light'} text-label`}>{fieldMsg}</p>

        </div>
    )
}
export default FormFields;