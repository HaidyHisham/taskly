import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import BoardIcon from '@/assets/icons/board.svg?react';
import ListIcon from '@/assets/icons/list.svg?react';
import type { ReactNode } from 'react';

type TaskView = 'board' | 'list';

const options: { label: string; value: TaskView; icon: ReactNode }[] = [
  {
    label: 'Board View',
    value: 'board',
    icon: <BoardIcon className="text-slate-dark w-3.5" />,
  },
  {
    label: 'List View',
    value: 'list',
    icon: <ListIcon className="text-primary w-2.75" />,
  },
];

interface Props {
  className?: string;
}

const TaskViewSelect = ({ className }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTasksView = (searchParams.get('view') as TaskView) || 'board';

  const handleViewChange = (value: TaskView) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('view', value);
    setSearchParams(newSearchParams);
  };

  return (
    <Select
      options={options}
      className={className ?? "w-44"}
      classNamePrefix="custom"
      isSearchable={false}
      value={options.find((option) => option.value === currentTasksView) || options[0]}
      onChange={(option) => {
        if (option) {
          handleViewChange(option.value);
        }
      }}
      components={{
        IndicatorSeparator: () => null,
      }}
      styles={{
        control: (provided) => ({
          ...provided,
          backgroundColor: 'white',
          border: '1px solid #C3C6D633',
          boxShadow: 'var(--app-shadow)',
          padding: '4px 8px',
          borderRadius: '4px',
          alignItems: 'center',
        }),
        indicatorsContainer: (provided) => ({
          ...provided,
          color: 'var(--slate-dark)',
        }),
      }}
      formatOptionLabel={({ label, icon }) => (
        <div className="flex items-center gap-2">
          <span>{icon}</span>
          <span className="text-body font-medium text-slate-dark leading-5 capitalize">
            {label}
          </span>
        </div>
      )}
    />
  );
};

export default TaskViewSelect;