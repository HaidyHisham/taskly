
import TaskHeader from '../TaskHeader';
import TaskBoardColumn from './TaskBoardColumn';
import { TASK_STATUS } from '../../types/tasks.types';

const statusList = Object.values(TASK_STATUS);

function TaskBoard() {
  return (
    <section className="flex flex-col gap-6 h-full min-h-0">
  <TaskHeader />
  <div className="hidden lg:flex gap-6 w-full pb-3 h-full flex-1 min-h-0 overflow-x-auto scroll">
    {statusList.map((status) => (
      <TaskBoardColumn key={status} status={status} />
    ))}
  </div>
</section>
  );
}

export default TaskBoard;