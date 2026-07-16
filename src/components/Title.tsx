
interface IProps {
    title: string;
    description?: string;
}
function Title({ title, description}: IProps) {
  return (
    <div className={`text-center max-w-[400px] mx-auto space-y-2`}>
      <h1 className="form-headline">
        {title}
      </h1>
      <p className=" text-slate-medium ">
        {description}
      </p>
    </div>
  );
}

export default Title