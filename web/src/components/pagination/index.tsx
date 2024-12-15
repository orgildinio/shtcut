/** @format */

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shtcut-ui/react';

interface ButtonPaginationProps {
    children: React.ReactNode;
    index: number;
    setPageIndex: (index: number) => void;
    pageIndex: number;
    handleOnChange: (index: number) => void;
}

interface PaginationTableProps {
    pageSize: number;
    pageIndex: number;
    setPageIndex: (index: number) => void;
    totalItemsCount: number;
    handleOnChange: (index: number) => void;
    setPageSize?: (val: number) => void;
    totalPages?: number;
}

const ButtonPagination = (props: ButtonPaginationProps) => {
    const { children, index, setPageIndex, pageIndex, handleOnChange } = props;
    const handleOnChangeIndex = () => {
        setPageIndex(index);
        handleOnChange(index);
    };
    const isActive = pageIndex === index;

    return (
        <button
            onClick={handleOnChangeIndex}
            className="rounded-md font-semibold"
            style={{
                width: '32px',
                height: '32px',
                color: isActive ? '#ffffff' : '#000',
                border: `0.5px solid ${isActive ? '#2F64E9' : '#E3E3E3'}`,
                backgroundColor: ` ${isActive ? '#2F64E9' : ''}`,
                cursor: 'pointer',
                margin: '0 4px'
            }}
        >
            {children}
        </button>
    );
};

const PaginationTable = (props: PaginationTableProps) => {
    const { pageSize, pageIndex, setPageIndex, totalItemsCount, handleOnChange, setPageSize } = props;

    const TOTAL_INDEX = Math.ceil(totalItemsCount / pageSize);

    const showButtons = () => {
        const buttons: React.ReactNode[] = [];
        const MAX_VISIBLE_PAGES = 2;

        buttons.push(
            <ButtonPagination
                key={0}
                setPageIndex={setPageIndex}
                handleOnChange={handleOnChange}
                index={0}
                pageIndex={pageIndex}
            >
                1
            </ButtonPagination>
        );

        if (TOTAL_INDEX <= MAX_VISIBLE_PAGES) {
            for (let index = 1; index < TOTAL_INDEX - 1; index++) {
                buttons.push(
                    <ButtonPagination
                        key={index}
                        setPageIndex={setPageIndex}
                        handleOnChange={handleOnChange}
                        index={index}
                        pageIndex={pageIndex}
                    >
                        {index + 1}
                    </ButtonPagination>
                );
            }
        } else {
            const startPage = Math.max(pageIndex - 1, 1);
            const endPage = Math.min(pageIndex + 1, TOTAL_INDEX - 2);

            if (startPage > 1) {
                buttons.push(
                    <span key="start-ellipsis" style={{ margin: '0 4px' }}>
                        ...
                    </span>
                );
            }

            for (let index = startPage; index <= endPage; index++) {
                buttons.push(
                    <ButtonPagination
                        key={index}
                        setPageIndex={setPageIndex}
                        handleOnChange={handleOnChange}
                        index={index}
                        pageIndex={pageIndex}
                    >
                        {index + 1}
                    </ButtonPagination>
                );
            }

            if (endPage < TOTAL_INDEX - 2) {
                buttons.push(
                    <span key="end-ellipsis" style={{ margin: '0 4px' }}>
                        ...
                    </span>
                );
            }
        }

        buttons.push(
            <ButtonPagination
                key={TOTAL_INDEX - 1}
                setPageIndex={setPageIndex}
                handleOnChange={handleOnChange}
                index={TOTAL_INDEX - 1}
                pageIndex={pageIndex}
            >
                {TOTAL_INDEX}
            </ButtonPagination>
        );

        const isPrevActive = pageIndex > 0;
        buttons.unshift(
            <button
                key="prev"
                onClick={() => {
                    setPageIndex(pageIndex - 1);
                    handleOnChange(pageIndex - 1);
                }}
                disabled={!isPrevActive}
                style={{
                    color: isPrevActive ? 'black' : 'black',
                    cursor: isPrevActive ? 'pointer' : 'not-allowed',
                    margin: '0 4px'
                }}
                aria-label="Previous"
                className={`border w-8 h-8 rounded-md flex items-center justify-center border-[#E3E3E3]`}
            >
                <ChevronLeft size={18} />
            </button>
        );

        const isNextActive = pageIndex + 1 < TOTAL_INDEX;
        buttons.push(
            <button
                key="next"
                onClick={() => {
                    setPageIndex(pageIndex + 1);
                    handleOnChange(pageIndex + 1);
                }}
                disabled={!isNextActive}
                style={{
                    color: isNextActive ? 'black' : 'black',
                    cursor: isNextActive ? 'pointer' : 'not-allowed',
                    margin: '0 4px'
                }}
                aria-label="Next"
                className={`border w-8 h-8 rounded-md flex items-center justify-center border-[#E3E3E3]`}
            >
                <ChevronRight size={18} />
            </button>
        );

        return buttons;
    };

    return (
        <div className="flex justify-center">
            <div className="flex gap-[4px]">
                {showButtons()}{' '}
                <Select
                    onValueChange={(value: string) => {
                        if (setPageSize) {
                            setPageSize(Number(value));
                        }
                        setPageIndex(0);
                        handleOnChange(0);
                    }}
                >
                    <SelectTrigger className="text-xs w-16 border-[rgb(227,227,227)] font-semibold text-black border h-8">
                        <SelectValue placeholder={`${pageSize}`} />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        {[5, 10, 25, 50, 100].map((size) => (
                            <SelectItem
                                key={size}
                                value={size.toString()}
                                className="text-sm cursor-pointer font-semibold"
                            >
                                {size}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default PaginationTable;
