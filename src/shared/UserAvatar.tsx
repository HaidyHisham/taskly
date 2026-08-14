import type { ReactNode } from 'react';
import type { CSSProperties } from 'react';

interface IProps {
  content: string | ReactNode;
  className?: string;
  style?: CSSProperties;
}
const UserAvatar = ({ content, className, style }: IProps) => {
  return (
    <div
      className={`rounded-full bg-primary-container/20 size-6 lg:size-7 flex items-center justify-center text-primary font-bold text-body-xs uppercase ${className}`}
      style={style}
    >
      {content}
    </div>
  );
};

export default UserAvatar;