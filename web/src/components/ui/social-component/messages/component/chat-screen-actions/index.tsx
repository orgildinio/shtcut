import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@shtcut-ui/react';
import { MoreVertical, SmilePlus, Star, Trash2 } from 'lucide-react';
import React from 'react';
import { RiShareForwardLine } from 'react-icons/ri';
import { BiShare } from 'react-icons/bi';
import { TfiPin2 } from 'react-icons/tfi';

const ChatScreenActions = ({ onClickDelete }: { onClickDelete: () => void }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreVertical size={18} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-10">
                <div className="flex items-center gap-4 p-1">
                    <SmilePlus size={18} />
                    <BiShare size={18} />
                    <Star size={18} />
                    <RiShareForwardLine size={18} />
                    <TfiPin2 size={18} />
                    <Trash2 size={18} onClick={onClickDelete} />
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ChatScreenActions;
