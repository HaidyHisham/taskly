
interface IProps {
    title: string;
    description?: string;
    align?: "left" | "center";
    className?: string;
}
function Title({ title, description, align = "center", className = "" }: IProps) {
  const alignmentClass = align === "left" ? "text-start" : "text-center";

  return (
    <div className={`max-w-100  space-y-2 ${alignmentClass} ${className}`.trim()}>
      <h1 className="form-headline text-slate-dark">
        {title}
      </h1>
      <p className="text-slate-medium">
        {description}
      </p>
    </div>
  );
}

export default Title