
import ChevronLeftIcon from '@/assets/icons/chevron-left.svg?react';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg?react';
import Button from './Button';
import { useAppDispatch, useAppSelector } from './store/store';
import { fetchPaginatedProjects, setCurrentPage } from '@/shared/store/slices/project.slice';
import { useEffect } from 'react';

interface IProps { }

const Pagination = ({}: IProps) => {
  const { currentPage, totalPages } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();

   const handlePagination = (pageNum: number) => {
    dispatch(setCurrentPage(pageNum));
  };
  const isActiveStyle = (pageNum: number) =>
    pageNum === currentPage ? 'bg-primary! text-white!' : ''

  const baseStyle =
    'text-secondary! rounded-[2px]! size-[32px]! border border-slate-light p-0! font-bold! text-[12px]!';
    const limit = 12;

    useEffect(() => {
  const offset = (currentPage - 1) * limit;
  dispatch(fetchPaginatedProjects({ limit, offset }));
}, [currentPage, dispatch]);

  return (
    <div className="flex gap-2">
      {/* prev */}
     <Button
        variant="ghost"
        className={`${baseStyle}`}
        onClick={() => handlePagination(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon className="w-1" />
      </Button>
      {/* number list */}
     {Array.from({ length: totalPages || 0 }).map((_, index) => (
        <Button
          key={index}
          variant="ghost"
          className={`${baseStyle} ${isActiveStyle(index + 1)}`}
          onClick={() => handlePagination(index + 1)}
        >
          {index + 1}
        </Button>
      ))}
      

      {/* next */}
      <Button
        variant="ghost"
        className={`${baseStyle}`}
        onClick={() => handlePagination(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRightIcon className="w-1" />
      </Button>
    </div>
  );
};

export default Pagination;