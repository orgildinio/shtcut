import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, Label } from '@shtcut-ui/react';
import { Filter } from 'lucide-react';
import React from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@shtcut-ui/react';

const FilterLinkDropDown = () => {
    // Array for options
    const filterOptions = [
        { label: 'With Alias', value: 'with-alias' },
        { label: 'Without Alias', value: 'without-alias' },
        { label: 'All', value: 'all' }
    ];

    const handleSelect = (value: string) => {
        console.log('Selected value:', value);
        // Handle the selected value here
    };

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="flex border hover:bg-primary-0 hover:text-white shadow-none font-normal w-11 h-9 text-[#5A5555] items-center bg-white gap-x-2 ">
                        <div>
                            <Filter size={18} />
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 right-6 relative cursor-pointer">
                    <section className="p-2">
                        <p className="text-sm text-[#71717A]">Filter by</p>
                        <section className="flex flex-col gap-y-3 mt-3">
                            <section className="">
                                <Label className="text-sm ">Link Type</Label>
                                <Select onValueChange={handleSelect}>
                                    <SelectTrigger
                                        id="select-short-link"
                                        className="text-sm text-[#2B3034] shadow-none  mt-2"
                                    >
                                        <SelectValue placeholder="Link Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filterOptions.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                                className="text-sm text-[#2B3034]"
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </section>
                            <section className="">
                                <Label className="text-sm ">Tags</Label>
                                <Select onValueChange={handleSelect}>
                                    <SelectTrigger
                                        id="select-short-link"
                                        className="text-sm text-[#2B3034] shadow-none  mt-2"
                                    >
                                        <SelectValue placeholder="tags" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filterOptions.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                                className="text-sm text-[#2B3034]"
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </section>
                            <section className="">
                                <Label className="text-sm ">Creator</Label>
                                <Select onValueChange={handleSelect}>
                                    <SelectTrigger
                                        id="select-short-link"
                                        className="text-sm text-[#2B3034] shadow-none  mt-2"
                                    >
                                        <SelectValue placeholder="creator" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filterOptions.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                                className="text-sm text-[#2B3034]"
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </section>
                        </section>
                    </section>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default FilterLinkDropDown;
