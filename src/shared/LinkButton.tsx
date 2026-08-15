import React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  children: React.ReactNode;
  to: string;
  className?: string;
  btnClassName?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'tertiay';
}

const LinkButton: React.FC<IProps> = ({
  children,
  to,
  className = '',
  btnClassName = '',
  variant = 'primary',
}) => {
  const linkVariant = {
    primary:
      'text-white rounded-sm primary-gradient shadow-primary font-semibold',
    secondary: 'text-primary [&>*]:text-primary font-semibold',
    ghost: 'text-slate-md/60 font-medium',
    tertiay: 'bg-surface-low text-primary rounded-sm font-semibold gap-2',
  };

  return (
    <Link
      to={to}
      className={`px-6 py-3 text-body leading-5 flex items-center justify-center gap-1.75 capitalize cursor-pointer font-medium ${linkVariant[variant]} ${className} ${btnClassName}`}
    >
      {children}
    </Link>
  );
};

export default LinkButton;