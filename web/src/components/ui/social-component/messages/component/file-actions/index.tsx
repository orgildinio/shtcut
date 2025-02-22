import React from 'react';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@shtcut-ui/react';
import { File, MonitorUp } from 'lucide-react';
import { PiCheckSquareOffset } from 'react-icons/pi';

import { FiPaperclip } from 'react-icons/fi';
const FileActions = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant={'unstyled'} type="button" className=" p-0 m-0 ">
                    <FiPaperclip size={18} />
                </Button>{' '}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="">
                <DropdownMenuItem className="text-xs flex items-center gap-x-2">
                    <PiCheckSquareOffset size={14} /> Assign Task
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs flex items-center gap-x-2">
                    <File size={14} /> Recent file
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs flex items-center gap-x-2">
                    <MonitorUp size={14} /> Upload from your computer
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default FileActions;
