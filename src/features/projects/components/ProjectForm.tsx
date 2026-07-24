import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import FormField from "@/shared/FormField";
import Label from "@/shared/Label";
import Button from "@/shared/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProjectSchema, type TAddProjectInput } from "../schemas/project.schema.";
import { toast } from "react-toastify";
import { getAccessToken } from "@/features/auth/utils/auth";
import { createProject, updateProject, getProjects } from "../services/project.services";

interface ProjectFormProps {
  mode: 'add' | 'edit';
}

function ProjectForm({ mode }: ProjectFormProps) {
  const isEdit = mode === 'edit';
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId?: string }>();
  const location = useLocation();
  const passedProject = location.state?.project;
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

  useEffect(() => {
    if (isEdit) {
      if (passedProject) {
        reset({
          name: passedProject.name || '',
          description: passedProject.description || '',
        });
      } else if (projectId) {
        const loadProjectDetails = async () => {
          try {
            setIsLoading(true);
            const token = getAccessToken();
            if (token) {
              const projects = await getProjects({ accessToken: token });
              const currentProject = projects.find((p: any) => p.id === projectId);
              if (currentProject) {
                reset({
                  name: currentProject.name || '',
                  description: currentProject.description || '',
                });
              }
            }
          } catch (error) {
            console.error("Failed to load project details", error);
          } finally {
            setIsLoading(false);
          }
        };
        loadProjectDetails();
      }
    } else {
      reset({
        name: '',
        description: '',
      });
    }
  }, [isEdit, projectId, passedProject, reset]);

  const onSubmit = async (data: TAddProjectInput) => {
    try {
      setIsLoading(true);
      const token = getAccessToken();
      if (!token) {
        throw new Error("No authenticated user found. Please login.");
      }

      if (isEdit) {
        if (!projectId) {
          throw new Error("Invalid project ID.");
        }
        await updateProject({ data, accessToken: token, projectId: projectId });
        toast.success("Project updated successfully");
        navigate("/project");
      } else {
        await createProject({ data, accessToken: token });
        toast.success("Project created successfully");
        reset();
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to submit form");
    } finally {
      setIsLoading(false);
    }
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
