import { Link } from "react-router-dom"
import PlusBorderIcon from "@/assets/icons/plusborder.svg?react"

function AddProjectCard() {
    return (
        <Link
            to={'/project/add'}
            className="rounded-lg p-6 bg-white flex justify-center items-center gap-y-3.5 h-full"
        >
            <div className="flex flex-col items-center gap-y-3.5">
                <div className="flex justify-center items-center size-12 rounded-lg bg-surface-low">
                    <PlusBorderIcon className="size-5 text-slate-dark" />
                </div>
                <span className="text-body tracking-[1.4px] leading-5 uppercase text-secondary font-bold">
                    Add Project
                </span>
            </div>
        </Link>
    )
}

export default AddProjectCard