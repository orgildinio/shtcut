import { faker } from '@faker-js/faker';
import { ChatConversation, ChatMessage } from '@shtcut/types/types';
import React from 'react';

const ChatHeaderComponent = ({
    singleChat,
    onClickInfo
}: {
    singleChat: ChatConversation | null;
    onClickInfo: () => void;
}) => {
    return (
        <div className="border-b cursor-pointer p-4" onClick={onClickInfo}>
            <img src={faker.image.avatar()} className="relative  float-left w-10 h-10 rounded-full mr-4" />
            <div className="flex flex-col gap-1.5">
                <p className="font-semibold">{singleChat?.participants[1]}</p>
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#25C78B]" />
                    <p className="text-xs text-[#433E3F] font-medium">20 members</p>
                </div>
            </div>
        </div>
    );
};

export default ChatHeaderComponent;
