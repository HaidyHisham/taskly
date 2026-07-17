import LogoIcon from '@/assets/icons/logo.svg?react';

const Logo:React.FC = () => {
  return (
    <div className="flex gap-2 items-center">
      <LogoIcon className="w-5 text-primary-container" />
      <span className="text-xl leading-7 tracking-[-0.5px] font-bold text-slate-dark uppercase">
        Taskly
      </span>
    </div>
  );
};
export default Logo;