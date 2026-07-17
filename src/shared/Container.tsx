import type { ReactNode } from "react"

interface Iprops{
    children: ReactNode
    className?: string
}
const Container: React.FC<Iprops> = ({children, className}) => {
    return (
        <div className={`w-full px-6 ${className}`}>
            {children}
        </div>
    )
}
export default Container;