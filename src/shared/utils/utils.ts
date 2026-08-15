//  ------------------------ get user name initials ------------------------
export const getNameInitials = (name: string) => {
  return name?.split(' ').length > 1
    ? name
      ?.split(' ')
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
    : name?.split('').slice(0, 2).join('');
};

//  ------------------------ formate date ------------------------
export const formateDateString = (
  date: string,
  type: string = 'en-GB',
  options?: Intl.DateTimeFormatOptions
) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString(
    type,
    options || {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
  );
};
//  -------------------------- get date status --------------------------
export const getDueDateStatus = (dueDate?: string) => {
  if (!dueDate) return { isDueToday: false, isDelayed: false, deadline: null };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const deadline = new Date(dueDate);

  if (deadline) {
    deadline.setHours(0, 0, 0, 0);
  }

  const isDueToday = deadline.getTime() === today.getTime();
  const isDelayed = deadline.getTime() < today.getTime();

  return {
    isDueToday,
    isDelayed,
    deadline,
  };
};




//  ------------------------ get pagination range ------------------------
export const getPaginationRange = (
  currentPage: number,
  totalPages: number,
  siblingCount: number = 1
): (number | string)[] => {
  // If total pages is small, return all pages without ellipses
  const totalPageNumbers = siblingCount * 2 + 5; // First, Last, Current, 2*Ellipses

  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  // Case 1: Show right dots only (Near the start)
  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, '...', totalPages];
  }

  // Case 2: Show left dots only (Near the end)
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return [firstPageIndex, '...', ...rightRange];
  }

  // Case 3: Show both left and right dots (In the middle)
  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
  }

  return [];
};