import type { TextareaHTMLAttributes } from 'react';

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'error';
}

const TextArea = ({variant = 'default', ...props }: IProps) => {
   const textAreaVariants = {
    default:
      'bg-surface-highest placeholder:text-slate-medium text-slate-highest focus-within:outline-primary focus-visible:outline-primary',
    error:
      'bg-error/10 text-error outline outline-1 outline-error focus-within:outline-error focus-visible:outline-error',
  };
  return (
   <div
      className={`w-full flex justify-between items-center gap-0.5 rounded-sm focus-within:outline-1 focus-visible:outline-1 ${textAreaVariants[variant]} ${props.className}`}
    >
      <textarea
        rows={5}
        {...props}
        className={`w-full focus-within:outline-0 focus-visible:outline-0 bg-transparent [:-webkit-autofill]:[-webkit-text-fill-color:var(--color-secondary)] autofill:text-secondary autofill:transition-colors autofill:duration-[5000000s] ps-4 py-3.5`}
      ></textarea>
    </div>
  );
};
export default TextArea