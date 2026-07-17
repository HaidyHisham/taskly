import {type ButtonHTMLAttributes } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    variant?: 'primary'|'secondary'|'ghost',
    children:React.ReactNode
}
const AuthButton: React.FC<IProps> = ({variant='primary', children, ...props})=>{
    const btnVariants ={
        primary: 'text-white rounded-4px primary-gradient shadow-sm font-semibold ',
        secondary: 'text-primary font-semibold',
        ghost: 'text-slate-md/60 font-medium',
    }

    return (
        <button {...props} className={` w-full px-6 py-2.5 text-body leading-5 flex items-center justify-center gap-0.5 capitalize cursor-pointer ${btnVariants[variant]} ${props.className}`}>
            {children}
        </button>
    )

}
export default AuthButton