'use client';
import { ChatConversation, ChatMessage } from '@shtcut/types/types';

import React from 'react';
import { Button, Input } from '@shtcut-ui/react';
import { ChatHeaderComponent, ImageComponent, TextComponent } from '../component';
import { FiSmile, FiPaperclip } from 'react-icons/fi';
import { PiPaperPlaneTiltFill } from 'react-icons/pi';
import useChat from '@shtcut/hooks/chat';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import FileActions from '../component/file-actions';
const ChatScreen = ({
    singleChat,
    onClickDrawer,
    onClickDelete
}: {
    singleChat: ChatConversation | null;
    onClickDrawer: () => void;
    onClickDelete: () => void;
}) => {
    const { chatState, actions } = useChat();

    const renderMessage = (singleChat: ChatMessage | null) => {
        switch (singleChat?.type) {
            case 'text':
                return <TextComponent singleChat={singleChat} onClickDelete={onClickDelete} />;
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
                <ChatHeaderComponent singleChat={singleChat} onClickDrawer={onClickDrawer} />
                <section className="flex-grow overflow-y-auto flex flex-col gap-5 w-full h-[500px] p-4">
                    {singleChat?.messages?.map((chat) => <>{renderMessage(chat)}</>)}
                </section>
            </div>
            {/* Input Field */}

            <div className="relative w-full">
                <Input
                    type="text"
                    placeholder="Type a message..."
                    className="pr-20 w-full h-14 rounded-none border-l-0 border-r-0 border-b-0 border-t"
                />
                <div className="absolute inset-y-0 right-2 flex items-center space-x-4">
                    <FileActions />
                    <Button
                        ref={chatState.emojiIconRef}
                        variant={'unstyled'}
                        type="button"
                        className=" p-0 m-0"
                        onClick={() => actions.setShowEmoji(!chatState.showEmoji)}
                    >
                        <FiSmile size={18} />
                    </Button>
                    <Button
                        variant={'unstyled'}
                        type="button"
                        className="bg-primary-0 w-9 h-9 flex justify-center items-center rounded-md p-0 m-0"
                    >
                        <PiPaperPlaneTiltFill size={18} className="text-white" />
                    </Button>
                    {chatState.showEmoji && (
                        <div ref={chatState.emojiPickerRef} className="absolute bottom-12 right-4 z-50">
                            <Picker theme="light" data={data} onEmojiSelect={actions.handleEmojiSelect} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatScreen;
