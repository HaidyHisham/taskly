
import TaskHeader from '../TaskHeader';
import TaskBoardColumn from './TaskBoardColumn';
import { TASK_STATUS } from '../../types/tasks.types';
import { mockTasks } from '../../types/mockTasks';

const statusList = Object.values(TASK_STATUS);

function TaskBoard() {
    return (
        <section className="flex flex-col gap-6">
            <TaskHeader />
          <div className="hidden lg:flex gap-6 w-full pb-3 h-full flex-1 overflow-x-auto scroll">
            {statusList.map((status) => (
        <TaskBoardColumn
            key={status}
            status={status}
            tasks={mockTasks}
            
        />
    ))}
</div>
        </section>
    );
}

export default TaskBoard;