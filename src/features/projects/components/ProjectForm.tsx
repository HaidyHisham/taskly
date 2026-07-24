import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import FormField from "@/shared/FormField";
import Label from "@/shared/Label";
import Button from "@/shared/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProjectSchema, type TAddProjectInput } from "../schemas/project.schema.";


interface ProjectFormProps {
  mode: 'add' | 'edit';
}

function ProjectForm({ mode }: ProjectFormProps) {
  const isEdit = mode === 'edit';
  const navigate = useNavigate();
  const { projectId, id } = useParams<{ projectId?: string; id?: string }>();
  const activeProjectId = projectId || id;
  const [isLoading, setIsLoading] = useState(false);



  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<TAddProjectInput>({
    resolver: zodResolver(addProjectSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const descriptionWatcher = watch('description');


  const onSubmit = async (data: TAddProjectInput) => {
    console.log(data)
  };

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
            placeholder="Provide a high-level overview of the project's architectural objectives and key milestones..."
            isTextArea
          />
          <span className="text-label block text-end font-medium text-slate-medium">
            {descriptionWatcher?.length || 0}/500 characters
          </span>

          {/*buttons*/}
          <div className="flex flex-col lg:flex-row justify-between items-end gap-4 mt-8">
            <Button
              type="button"
              variant="ghost"
              disabled={isLoading}
              onClick={() => navigate("/project")}
              className="lg:w-fit! font-bold text-slate-medium! text-base! order-1 lg:order-0"
            >
              Back
            </Button>

            <Button
              type="submit"
              disabled={isLoading}
              className="lg:w-fit! text-base! shadow-primary"
            >
              {isEdit 
                ? (isLoading ? "Saving..." : "Save Changes") 
                : (isLoading ? "Creating..." : "Create Project")
              }
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ProjectForm;
