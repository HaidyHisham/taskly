import { useForm } from 'react-hook-form';
import FormField from '@/shared/FormField'
import Label from '@/shared/Label'
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema, type TTaskInput } from '../schemas/task.schema';
import Button from '@/shared/Button';
import { useParams } from 'react-router-dom';

function AddTaskForm() {
    const { projectId } = useParams();

    const { control, formState: { errors } } = useForm<TTaskInput>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            project_id: projectId,
            status: 'TO DO',
        },
    });
  return (
   <form className='lg:bg-white rounded-lg lg:shadow-sm lg:px-9 lg:py-10 flex flex-col gap-8'>
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
          />
        </div>
         {/* actions */}
        <div className="flex flex-col lg:flex-row justify-end items-end gap-4 mt-6">
          <Button
            variant="ghost"
            type="button"
            className="lg:w-fit font-bold text-slate-md text-base order-1 lg:order-0"  
          >
            Back
          </Button>
          <Button
            type="submit"
            className="lg:w-fit font-bold text-base"
          >
          Create Task
          </Button>
        </div>
        </div>
   </form>
  )
}

export default AddTaskForm