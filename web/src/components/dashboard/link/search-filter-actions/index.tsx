import {
    Button,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
    Separator
} from '@shtcut-ui/react';
import { SearchType } from '@shtcut/_shared/namespace/link';
import { SearchInput } from '@shtcut/components/dashboard/nav-component';
import { Archive, Download, Filter, PencilLine, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import { PiSortDescendingBold } from 'react-icons/pi';

const SearchFilterActions = ({ onSearchChange, search }: SearchType) => {
    const router = useRouter();
    const pathName = usePathname();
    const handleNavigateToArchive = () => {
        router.push(`${pathName}/archive`);
    };
    return (
        <div className="flex justify-between mt-4">
            <SearchInput onChange={(e) => onSearchChange(e.target.value)} value={search} />
            <div className="flex items-center space-x-[12px]">
                <Button className="flex border   hover:bg-primary-0 hover:text-white shadow-none font-normal w-11 h-9 text-[#5A5555] items-center bg-white gap-x-2 ">
                    <div>
                        <Filter size={18} />
                    </div>
                </Button>
                <Button className="flex border   hover:bg-primary-0 hover:text-white shadow-none font-normal w-11 h-9 text-[#5A5555] items-center bg-white gap-x-2 ">
                    <div>
                        <PiSortDescendingBold size={18} />
                    </div>
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex border   hover:bg-primary-0 rounded-md justify-center hover:text-white shadow-none font-normal w-11 h-9 text-[#5A5555] cursor-pointer items-center bg-white gap-x-2 ">
                            <div>
                                <IoEllipsisVerticalSharp size={18} />
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48  right-6 relative cursor-pointer">
                        <p className="text-xs p-2 font-semibold text-[#5A5555]">Import Links</p>
                        <section className="flex pb-2 flex-col   ">
                            <DropdownMenuCheckboxItem className=" hover:text-primary-0 flex text-xs items-center gap-x-2 p-2 cursor-pointer ">
                                <Image src={'/social/biltly.png'} width={16} height={16} alt="biltly" /> Import from
                                Bitly
                            </DropdownMenuCheckboxItem>

                            <DropdownMenuCheckboxItem className="p-2 hover:text-primary-0 flex text-xs items-center gap-x-2 cursor-pointer">
                                <Image src={'/social/shortei.png'} width={16} height={16} alt="     Short.io" /> Import
                                from Short.io
                            </DropdownMenuCheckboxItem>

                            <DropdownMenuCheckboxItem className="p-2 flex text-xs items-center gap-x-2 cursor-pointer">
                                <Download size={16} /> Import from CSV
                            </DropdownMenuCheckboxItem>
                        </section>
                        <Separator />
                        <p className="text-xs px-2 pt-3 font-semibold text-[#5A5555]">Export Links</p>
                        <section className="flex pb-2 flex-col   ">
                            <DropdownMenuCheckboxItem className=" hover:text-primary-0 flex text-xs items-center gap-x-2 mt-3 p-2 cursor-pointer ">
                                <Download size={16} style={{ transform: 'rotate(-180deg)' }} />
                                <span>Export as CSV</span>
                            </DropdownMenuCheckboxItem>
                        </section>
                        <Separator />
                        <DropdownMenuCheckboxItem
                            className=" hover:text-primary-0 flex my-2 text-xs items-center gap-x-2 p-2 cursor-pointer "
                            onClick={handleNavigateToArchive}
                        >
                            <Archive size={16} /> View all Archive
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default SearchFilterActions;
