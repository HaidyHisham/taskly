import Check from "@assets/icons/check.svg?react";
import Circle from "@assets/icons/circle.svg?react";
interface IProps {
    label: string;
    isValid?:boolean;
}
const PasswordValidations: React.FC<IProps> = ({label, isValid=false}) =>{
    return (
        <div className="flex items-center gap-x-2">
           {isValid? <Check className="size-3.5"/> : <Circle className="size-3.5"/>}
           <p className="text-label text-secondary">{label}</p>
        </div>
    )
}
export default PasswordValidations;