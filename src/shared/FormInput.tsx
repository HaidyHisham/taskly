import { useState, type InputHTMLAttributes } from "react";
import Eye from "@assets/icons/Eye.svg?react"
import EyeOff from "@assets/icons/eye-off.svg?react"
interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'error';
  reset?: boolean;
  showPasswordToggle?: boolean;
}

const FormInput: React.FC<IProps> = ({ variant = 'default', reset = false, showPasswordToggle = true, ...props }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const containerVariants = {
    default: reset
      ? 'bg-surface-low/50 focus-within:outline-primary focus-visible:outline-primary'
      : 'bg-surface-highest focus-within:outline-primary focus-visible:outline-primary',
    error:
      'bg-error/10 outline outline-1 outline-error focus-within:outline-error focus-visible:outline-error',
  };

  const inputVariants = {
    default: reset
      ? 'bg-transparent placeholder:text-secondary-light text-secondary focus-within:outline-primary focus-visible:outline-primary'
      : 'bg-surface-highest placeholder:text-secondary-light text-secondary focus-within:outline-primary focus-visible:outline-primary',
    error:
      'text-error placeholder:text-error/60 focus-within:outline-error focus-visible:outline-error',
  };

  return (
    <div className={`w-full flex justify-between items-center gap-0.5 rounded-4px focus-within:outline-1 focus-visible:outline-1 ${containerVariants[variant]} ${props.className}`}>
      <input {...props} 
      className={`w-full focus-within:outline-0 focus-visible:outline-0 px-4 py-3.5 bg-transparent ${inputVariants[variant]}`}
        type={props.type === "password" ? (showPasswordToggle && isPasswordShown) ? "text" : "password" : props.type} />

      {props.type === "password" && showPasswordToggle && (
        <div className="w-1/4 cursor-pointer flex items-center justify-end px-4 py-3.5"
          onClick={() => setIsPasswordShown(!isPasswordShown)}>
          {isPasswordShown ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </div>
      )}

    </div>
  );
}

export default FormInput