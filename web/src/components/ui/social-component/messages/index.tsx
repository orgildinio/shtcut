'use client';

import { Button } from '@shtcut-ui/react';
import React, { useState } from 'react';
import ChatList from './chat-list';
import ChatScreen from './chat-screen';
import { ChatConversation, ChatMessage } from '@shtcut/types/types';

const MessagesComponent = () => {
    const [singleChat, setSingleChat] = useState<ChatConversation | null>(null);
    const handleChatMessage = (chat: ChatConversation) => {
        setSingleChat(chat);
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-[#2B2829] text-xl">Messages</h1>
                <Button className="text-xs font-semibold bg-primary-0">Create Group</Button>
            </div>
            <section className="flex border mt-8 rounded-md h-[650px]">
                <div className="border-r w-[340px] h-full">
                    <ChatList handleChatMessage={handleChatMessage} />
                </div>
                <div className="w-full  h-full">
                    <ChatScreen singleChat={singleChat} />
                </div>
            </section>
        </div>
    );
};

export default MessagesComponent;
