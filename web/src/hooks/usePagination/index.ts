import { UsePaginationReturnType } from '@shtcut/types/pagination';
import { useMemo, useState } from 'react';

export const usePagination = (): UsePaginationReturnType => {
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const handlePageChange = (index: number) => {
        setPage(index);
    };

    const pagination = useMemo(
        () => ({
            page: page + 1,
            perPage
        }),
        [page, perPage]
    );

    const paginationActions = {
        handlePageChange,
        setPage,
        setPerPage
    };

    return {
        pagination,
        paginationActions
    };
};
