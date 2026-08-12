import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormField from '@/shared/FormField'
import Label from '@/shared/Label'
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema, type TTaskInput } from '../schemas/task.schema';
import Button from '@/shared/Button';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { TASK_STATUS_OPTIONS, type TaskStatus } from '../types/tasks.types';
import { useAppDispatch, useAppSelector } from '@/shared/store/store';
import { fetchMembers } from '@/shared/store/slices/members.slice';
import { fetchEpics } from '@/shared/store/slices/epics.slice';
import { createTask } from '../services/tasks.services';
import { getAccessToken } from '@/features/auth/utils/auth';
import { toast } from 'react-toastify';

function AddTaskForm() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const selectedStatus = (searchParams.get('status') || 'TO_DO') as TaskStatus;
    const selectedEpicId = searchParams.get('epic') || searchParams.get('epicId') || '';
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useAppDispatch();
    const projectMembers = useAppSelector((state) => state.members.members);
    const projectEpics = useAppSelector((state) => state.epics.epics);

    useEffect(() => {
        if (projectId) {
            dispatch(fetchMembers(projectId));
            dispatch(fetchEpics({ projectId }));
        }
    }, [projectId, dispatch]);

    const membersOptions = [
        { value: '', label: 'Unassigned' },
        ...(projectMembers?.map((member) => ({
            value: member?.user_id,
            label: member?.metadata?.name || member?.user_id,
        })) || []),
    ];

    const epicsOptions = [
        { value: '', label: 'None' },
        ...(projectEpics?.map((epic) => ({
            value: epic.id,
            label: epic.title,
        })) || []),
    ];

    const {
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm<TTaskInput>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            project_id: projectId || '',
            title: '',
            description: '',
            status: selectedStatus,
            assignee_id: '',
            epic_id: selectedEpicId,
            due_date: '',
        },
    });

    const descriptionWatcher = watch('description');

    const onSubmit = async (data: TTaskInput) => {
        try {
            setIsLoading(true);
            const token = getAccessToken();
            if (!token) {
                throw new Error('No authenticated user found. Please login.');
            }
            if (!projectId) {
                throw new Error('Project ID is missing.');
            }

            await createTask({
                data: {
                    ...data,
                    project_id: projectId,
                },
                accessToken: token,
            });

            toast.success('Task created successfully!');
            reset();
            navigate(`/project/${projectId}/tasks`);
        } catch (error: any) {
            toast.error(error?.message || 'Failed to create task');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='lg:bg-white rounded-lg lg:shadow-sm lg:px-9 lg:py-10 flex flex-col gap-8'>
            <div className="flex flex-col gap-8">
                {/* title */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                    <Label
                        htmlFor="title"
                        activeVariant={errors.title ? 'error' : 'default'}
                    >
                        title
                        <span className="text-error"> *</span>
                    </Label>
                    <FormField
                        control={control}
                        name="title"
                        label="title"
                        placeholder="e.g., Finalize structural schematics"
                        disabled={isLoading}
                    />
                </div>
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* status */}
                    <div className="flex flex-col gap-1.5 w-full">
                        <Label
                            htmlFor="status"
                            activeVariant={errors.status ? 'error' : 'default'}
                        >
                            status
                            <span className="text-error"> *</span>
                        </Label>
                        <FormField
                            control={control}
                            name="status"
                            label="status"
                            isSelect
                            options={TASK_STATUS_OPTIONS}
                            disabled={isLoading}
                        />
                    </div>
                    {/* assignee */}
                    <div className="flex flex-col gap-1.5 w-full">
                        <Label
                            htmlFor="assignee_id"
                            activeVariant={errors.assignee_id ? 'error' : 'default'}
                        >
                            assignee
                        </Label>
                        <FormField
                            control={control}
                            name="assignee_id"
                            label="assignee"
                            isSelect
                            placeholder="Select Team Member"
                            options={membersOptions}
                            disabled={isLoading}
                        />
                    </div>

                </div>
                {/* epic */}
                <div className="flex flex-col gap-1.5">
                    <Label
                        htmlFor="epic_id"
                        activeVariant={errors.epic_id ? 'error' : 'default'}
                    >
                        Epic
                    </Label>
                    <FormField
                        control={control}
                        name="epic_id"
                        label="epic"
                        isSelect
                        placeholder="Select an Epic..."
                        options={epicsOptions}
                        disabled={isLoading}
                    />
                </div>
                {/* due date */}
                <div className="flex flex-col gap-1.5">
                    <Label
                        htmlFor="due_date"
                        activeVariant={errors.due_date ? 'error' : 'default'}
                    >
                        Due date
                    </Label>
                    <FormField
                        control={control}
                        name="due_date"
                        label="due_date"
                        type="date"
                        disabled={isLoading}
                    />
                </div>
                {/* description */}
                <div className="flex flex-col gap-1.5">
                    <Label
                        htmlFor="description"
                        className="flex! justify-between! items-center"
                        activeVariant={errors.description ? 'error' : 'default'}
                    >
                        description
                    </Label>
                    <FormField
                        control={control}
                        name="description"
                        label="description"
                        placeholder={`Provide detailed context for this task...`}
                        isTextArea
                        disabled={isLoading}
                    />
                    <span className="text-label block text-end font-medium text-slate-medium">
                        {descriptionWatcher?.length || 0}/500 characters
                    </span>
                </div>
                {/* actions */}
                <div className="flex flex-col lg:flex-row justify-end items-end gap-4 mt-6">
                    <Button
                        variant="ghost"
                        type="button"
                        disabled={isLoading}
                        onClick={() => navigate(`/project/${projectId}/tasks`)}
                        className="lg:w-fit font-bold text-slate-md text-base order-1 lg:order-0"
                    >
                        Back
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="lg:w-fit font-bold text-base"
                    >
                        {isLoading ? 'Creating...' : 'Create Task'}
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default AddTaskForm