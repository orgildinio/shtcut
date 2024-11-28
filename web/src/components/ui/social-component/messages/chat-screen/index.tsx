'use client';
import { ChatConversation, ChatMessage } from '@shtcut/types/types';

import React, { useState } from 'react';
import { Input } from '@shtcut-ui/react';
import { ChatHeaderComponent, ImageComponent, TextComponent } from '../component';
import { DrawerDemo } from '../chat-drawer';

const ChatScreen = ({ singleChat }: { singleChat: ChatConversation | null }) => {
    const [showDialog, setShowDialog] = useState(false);

    const renderMessage = (singleChat: ChatMessage | null) => {
        switch (singleChat?.type) {
            case 'text':
                return <TextComponent singleChat={singleChat} />;
            case 'image':
                return <ImageComponent singleChat={singleChat} />;
            case 'file':
                return (
                    <a
                        href={singleChat?.content}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                    >
                        View File
                    </a>
                );
            default:
                return null;
        }
    };
    return (
        <div className="flex flex-col justify-between h-full">
            {/* <DrawerDemo /> */}
            <div className="flex flex-col h-full">
                <ChatHeaderComponent singleChat={singleChat} onClickInfo={() => setShowDialog(true)} />
                <section className="flex-grow overflow-y-auto flex flex-col gap-5 w-full h-[500px] p-4">
                    {singleChat?.messages?.map((chat) => <>{renderMessage(chat)}</>)}
                </section>
            </div>
            {/* Input Field */}
            <div className=" w-full">
                <Input
                    className="w-full h-14 rounded-none border-l-0 border-r-0 border-b-0 border-t"
                    placeholder="Type a message..."
                />
            </div>
        </div>
    );
};

export default ChatScreen;
