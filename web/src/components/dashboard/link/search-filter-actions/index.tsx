import { Button } from '@shtcut-ui/react';
import { SearchType } from '@shtcut/_shared/namespace/link';
import { SearchInput } from '@shtcut/components/dashboard/nav-component';
import { Filter } from 'lucide-react';
import React from 'react';
import { PiSortDescendingBold } from 'react-icons/pi';

const SearchFilterActions = ({ onSearchChange, search }: SearchType) => {
    return (
        <div className="flex justify-end mt-4">
            <div className="flex items-center space-x-[12px]">
                <SearchInput onChange={(e) => onSearchChange(e.target.value)} value={search} />
                <Button className="flex  hover:bg-primary-0 hover:text-white shadow-none text-[#5A5555] items-center font-normal bg-white gap-x-2 border border-[#CCCBCB]">
                    <Filter size={20} /> Filter
                </Button>
                <Button className="flex border border-[#CCCBCB]  hover:bg-primary-0 hover:text-white shadow-none font-normal text-[#5A5555] items-center bg-white gap-x-2 ">
                    <PiSortDescendingBold size={20} /> Sort by
                </Button>
            </div>
        </div>
    );
};

export default SearchFilterActions;
