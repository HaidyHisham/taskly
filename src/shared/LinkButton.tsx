import React from 'react';
import Button from './Button';
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
    className,
    btnClassName,
    variant = 'primary',
}) => {
    return (
        <Button variant={variant} className={`w-fit! p-0! font-medium! flex ${className} ${btnClassName}`}>
            <Link
                to={to}
                className="w-full h-full px-6! py-3! flex gap-1.75 items-center justify-center"
            >
                {children}
            </Link>
        </Button>
    );
};

export default LinkButton;