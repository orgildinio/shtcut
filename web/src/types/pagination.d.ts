export interface PaginationTableProps {
    pageSize: number;
    pageIndex: number;
    setPageIndex: (index: number) => void;
    totalItemsCount: number;
    handleOnChange: (index: number) => void;
    setPageSize?: (val: number) => void;
    totalPages?: number;
}

export interface ButtonPaginationProps {
    children: React.ReactNode;
    index: number;
    setPageIndex: (index: number) => void;
    pageIndex: number;
    handleOnChange: (index: number) => void;
}

export type UsePaginationActions = {
    handlePageChange: (index: number) => void;
    setPage: Dispatch<SetStateAction<number>>;
    setPerPage: Dispatch<SetStateAction<number>>;
};

export type UsePaginationState = {
    page: number;
    perPage: number;
};

export interface UsePaginationReturnType {
    pagination: UsePaginationState;
    paginationActions: UsePaginationActions;
}

export interface Pagination {
    current: number;
    currentPage: string;
    next: number;
    nextPage: string;
    perPage: number;
    totalCount: number;
}
