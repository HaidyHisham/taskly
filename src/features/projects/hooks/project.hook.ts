import { fetchPaginatedProjects, resetProjects, setCurrentPage } from "@/shared/store/slices/project.slice";
import { useAppDispatch, useAppSelector } from "@/shared/store/store";
import { useEffect, useRef, useState } from "react";
import { useMobile } from "@/shared/hooks/shared.hooks";

export const useHandlePagination = () => {
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);

  const { isMobile } = useMobile(1024);

  const dispatch = useAppDispatch();

  const {
    projects,
    limit,
    currentPage,
    loading,
    totalPages,
    totalCount,
    error,
  } = useAppSelector((state) => state.project);

  const offset = (currentPage - 1) * limit;

  
  useEffect(() => {
    return () => {
      dispatch(resetProjects());
    };
  }, [dispatch]);


  useEffect(() => {
    dispatch(fetchPaginatedProjects({ limit, offset, append: isMobile }));
  }, [currentPage, limit, offset, isMobile, dispatch]);

  useEffect(() => {
    // handle hasMore state
    if (
      (projects?.length === 0 && loading === 'success') ||
      (totalPages !== undefined && currentPage >= totalPages)
    ) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [projects, currentPage, loading, totalPages]);

  // observer for infinite scroll on mobile
  useEffect(() => {
    if (!isMobile) return;
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMore && loading === 'success') {
          dispatch(setCurrentPage(currentPage + 1));
        }
      },
      { threshold: 0, root: null, rootMargin: '0px' }
    );
    // watching target element
    observer.observe(target);
    return () => observer.disconnect();
  }, [isMobile, hasMore, loading, currentPage, dispatch]);

  return {
    projects,
    totalCount,
    loading,
    error,
    isMobile,
    hasMore,
    observerTarget,
  };
};