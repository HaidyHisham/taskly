import { useState, useEffect, useRef } from 'react';
import { useMobile } from './shared.hooks';

export interface IUseHandlePagination<T extends { id: string | number }> {
    incomingData: T[];
    meta?: { totalPages?: number; totalCount?: number };
    isFetching: boolean;
    currentPage: number;
    setCurrentPage: (page: number | ((prev: number) => number)) => void;
}

export const useHandlePagination = <T extends { id: string | number }>({
    incomingData,
    meta,
    isFetching,
    setCurrentPage,
    currentPage,
}: IUseHandlePagination<T>) => {
    const observerTarget = useRef<HTMLDivElement | null>(null);
    const [hasMore, setHasMore] = useState(false);
    const { isMobile } = useMobile(1024);
    const [accumulatedList, setAccumulatedList] = useState<T[]>([]);

    const handleCurrentPage = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        if (meta?.totalPages && currentPage >= meta.totalPages) {
            setHasMore(false);
        } else {
            setHasMore(true);
        }
    }, [currentPage, meta?.totalPages]);

    useEffect(() => {
        if (!incomingData) return;

        if (currentPage === 1) {
            setAccumulatedList(incomingData);
        } else {
            setAccumulatedList((prev) => {
                const existingIds = new Set(prev.map((item) => item.id));
                const newUnique = incomingData.filter((item) => !existingIds.has(item.id));
                return [...prev, ...newUnique];
            });
        }
    }, [incomingData, currentPage]);

    // Infinite Scroll Observer Configuration
    useEffect(() => {
        const target = observerTarget.current;
        if (!target || !isMobile || !hasMore || isFetching) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry && entry.isIntersecting) {
                    setCurrentPage((prev) => prev + 1);
                }
            },
            { threshold: 0, rootMargin: '10px' }
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, [isMobile, hasMore, isFetching, setCurrentPage]);

    return {
        accumulatedList,
        observerTarget,
        hasMore,
        isMobile,
        handleCurrentPage,
    };
};
