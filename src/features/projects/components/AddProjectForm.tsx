import { useForm } from "react-hook-form";
import FormField from "@/shared/FormField"
import Label from "@/shared/Label";
import Button from "@/shared/Button";

function AddProjectForm() {
    const { handleSubmit, control, formState: { errors } } = useForm()
    const onSubmit = (data: any) => {
        console.log(data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-1.5 md:col-span-2">
                    <FormField
                        control={control}
                        name="name"
                        label="Project title"
                        type="text"
                        placeholder="Project Title"
                        containerClassName="w-full"
                        fieldMsg={errors.name?.message as string}
                        variant={errors.name ? 'error' : 'default'}

                    />
                </div>
                {/* description */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                    <Label
                        htmlFor="description"
                        className="flex! justify-between! items-center"
                        activeVariant={errors.description ? 'error' : 'default'}
                    >
                        description
                        <span className="text-slate-medium/60 text-capitalize!">Optional</span>
                    </Label>
                    <FormField
                        control={control}
                        name="description"
                        placeholder={`Provide a high-level overview of the project's architectural objectives and key milestones...`}
                        isTextArea


                    />
                    <span className="text-label block text-end font-medium text-slate-medium">
                        0/500 characters
                    </span>
                   {/*buttons*/}

                    <div className="flex flex-col lg:flex-row justify-between items-end gap-4 mt-8">
                        <Button
                            variant="ghost"
                            className="lg:w-fit! font-bold text-slate-medium! text-base! order-1 lg:order-0"
                        >
                            Back
                        </Button>

                        <Button
                           
                            type="submit"
                            className="lg:w-fit! text-base! shadow-primary"
                        >
                            Create Project
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default AddProjectForm