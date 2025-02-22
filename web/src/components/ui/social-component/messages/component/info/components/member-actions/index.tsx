import React from 'react';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@shtcut-ui/react';
import { UserRound, Info } from 'lucide-react';
import { CiCircleMinus } from 'react-icons/ci';
import { VscKebabVertical } from 'react-icons/vsc';

const MemberActions = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
                <Button variant={'unstyled'} type="button" className=" p-0 m-0 outline-none">
                    <VscKebabVertical size={18} />
                </Button>{' '}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="">
                <DropdownMenuItem className="text-xs flex items-center gap-x-2">
                    <Info size={14} /> Info
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs flex items-center gap-x-2">
                    <UserRound size={14} /> Make group admin
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs flex items-center gap-x-2">
                    <CiCircleMinus size={14} /> Remove from group
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default MemberActions;
