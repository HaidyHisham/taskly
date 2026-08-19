import type { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  className?: string;
}

const Badge = ({ children, className }: IProps) => {
  return (
    <div
      className={`px-3 py-1 rounded-sm uppercase w-fit font-bold text-[10px] leading-3.75 ${className}`}
    >
      {children}
    </div>
  );
};

export default Badge;