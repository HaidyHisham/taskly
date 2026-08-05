import Button from "@/shared/Button";
import FormField from "@/shared/FormField"
import Label from "@/shared/Label"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { epicsSchema, type TEpicsInput } from "../schemas/epics.schema";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/shared/store/store";
import { fetchMembers } from "@/shared/store/slices/members.slice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAccessToken } from "@/features/auth/utils/auth";
import { createEpic } from "../services/epics.services";

function EpicForm() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const projectMembers = useAppSelector((state) => state.members.members);
    const dispatch = useAppDispatch();

    const {
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm<TEpicsInput>({
        resolver: zodResolver(epicsSchema),
        mode: 'onBlur',
        defaultValues: {
            title: '',
            description: '',
            assignee_id: '',
            deadline: '',
        },
    });

    const descriptionWatcher = watch('description');
    const onSubmit = async (data: TEpicsInput) => {
        try {
            setIsLoading(true);
            const token = getAccessToken();
            if (!token) {
                throw new Error("No authenticated user found. Please login.");
            }
            if (!projectId) {
                throw new Error("Project ID is missing.");
            }

            const cleanedData = {
                ...data,
                assignee_id: data.assignee_id || null,
                description: data.description || null,
                deadline: data.deadline || null,
            };

            await createEpic({
                data: cleanedData,
                accessToken: token,
                projectId,
            });

            toast.success("Epic created successfully!");
            reset();
            navigate(`/project/${projectId}/tasks`);
        } catch (error: any) {
            toast.error(error.message || "Failed to create epic");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (projectMembers.length === 0 && projectId) {
            dispatch(fetchMembers(projectId as string));
        }
    }, [projectId]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className="lg:bg-white rounded-lg lg:shadow-sm lg:px-9 lg:py-10 flex flex-col gap-9">
            <div className="flex flex-col lg:flex-row lg:items-center gap-1.5 ">
                <Label
                    htmlFor="title"
                    activeVariant={errors.title ? 'error' : 'default'}
                    className="lg:w-1/6"
                > title
                    <span className="text-error"> *</span>
                </Label>
                <FormField
                    control={control}
                    name="title"
                    placeholder="e.g. Structural Foundation Phase"
                    containerClassName="flex-1"
                    fieldMsg="Minimum 3 characters required"
                    disabled={isLoading}
                />
            </div>
            <div className="flex flex-col lg:flex-row gap-1.5 ">
                <Label
                    htmlFor="description"
                    className="flex! flex-row! lg:flex-col! justify-between! items-center! lg:justify-start! lg:items-start! lg:w-1/6"
                    activeVariant={errors.description ? 'error' : 'default'}
                >
                    description
                    <span className="text-secondary/50 normal-case font-normal">Optional</span>
                </Label>
                <div className="flex-1">
                    <FormField
                        control={control}
                        name="description"
                        placeholder="Describe the scope and objectives of this epic..."
                        isTextArea
                        disabled={isLoading}
                    />

                    <span className="text-label block text-end font-medium text-slate-medium">
                        {descriptionWatcher?.length || 0}/500 characters
                    </span>
                </div>

            </div>
            <div className="flex flex-col lg:flex-row gap-9 mb-10">
                <div className="flex flex-col gap-1.5 flex-1">
                    <Label
                        htmlFor="assignee_id"
                        className="flex! flex-row! lg:flex-col! justify-between! items-center! lg:justify-start! lg:items-start! w-1/6"
                        activeVariant={errors.assignee_id ? 'error' : 'default'}
                    >
                        assignee
                    </Label>
                    <FormField
                        control={control}
                        name="assignee_id"
                        containerClassName="flex-1"
                        isSelect
                        disabled={isLoading}
                    >
                        <option value="">Select a member...</option>
                        {projectMembers.map((member) => (
                            <option key={member.user_id} value={member.user_id}>
                                {member.metadata?.name || member.metadata?.email}
                            </option>
                        ))}
                    </FormField>
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                    <Label
                        htmlFor="deadline"
                        className="flex! flex-row! lg:flex-col! justify-between! items-center! lg:justify-start! lg:items-start! w-1/6"
                        activeVariant={errors.deadline ? 'error' : 'default'}
                    >
                        deadline
                    </Label>
                    <FormField
                        control={control}
                        type="date"
                        name="deadline"
                        disabled={isLoading}
                    />
                </div>

            </div>
            {/* actions */}
            <div className="flex flex-col lg:flex-row justify-end items-end gap-4">
                <Button
                    variant="ghost"
                    type="button"
                    disabled={isLoading}
                    onClick={() => navigate(`/project/${projectId}/tasks`)}
                    className="lg:w-fit! font-bold text-slate-md! text-base! order-1 lg:order-0"
                >
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    type="submit"
                    disabled={isLoading}
                    className="lg:w-fit! text-base!"
                >
                    {isLoading ? "Creating..." : "Create Epic"}
                </Button>
            </div>

        </form>
    )
}

export default EpicForm