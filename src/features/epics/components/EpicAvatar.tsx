import type { ReactNode } from "react";

interface IProps {
  content: string | ReactNode;
  className?: string;
}
function EpicAvatar({ content, className }: IProps) {
  return (
    <div
      className={`rounded-xl bg-primary size-6 lg:size-7 flex items-center justify-center lg:pt-1.5 lg:pb-1.75 text-white ${className}`}
    >
      <span className="font-bold text-label-sm leading-3.75 uppercase">
        {content}
      </span>
    </div>
  );
}

export default EpicAvatar;