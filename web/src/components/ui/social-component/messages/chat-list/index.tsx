import { chatConversations } from '@shtcut/_shared/data';
import { SearchInput } from '@shtcut/components/dashboard/nav-component';
import React from 'react';
import { faker } from '@faker-js/faker';
import { CheckCheck, Dot } from 'lucide-react';
import { ChatConversation } from '@shtcut/types/types';

const ChatList = ({ handleChatMessage }: { handleChatMessage: (chat: ChatConversation) => void }) => {
    return (
        <div className="p-2 overflow-y-auto h-full">
            <section className="sticky top-3 z-40">
                <SearchInput className="w-full" />
            </section>
            <section className="overflow-y-auto h-full">
                <section className="flex flex-col gap-3 mt-5">
                    {chatConversations?.map((conversation) => {
                        const lastMessage = conversation.messages[conversation.messages.length - 1];
                        return (
                            <section
                                key={conversation.conversationId}
                                className={`cursor-pointer hover:bg-[#FAFAFA] py-3 px-2 rounded-md ${
                                    lastMessage.status === 'read' ? '' : 'bg-[#FAFAFA]'
                                }`}
                                onClick={() => handleChatMessage(conversation)}
                            >
                                <img
                                    src={faker.image.avatar()}
                                    className="relative float-left w-10 h-10 rounded-full mr-2"
                                    alt="Avatar"
                                />
                                <div className="flex justify-between">
                                    <section className="flex flex-col gap-1">
                                        <p className="font-semibold">{lastMessage.senderName}</p>
                                        <p className="text-[#9F9C9C] text-xs">
                                            {lastMessage.content.length > 15
                                                ? `${lastMessage.content.substring(0, 15)}...`
                                                : lastMessage.content}
                                        </p>
                                    </section>
                                    <div className="flex flex-col items-end">
                                        <p className="text-xs text-[#9F9C9C]">
                                            {new Date(lastMessage.timestamp).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                        {lastMessage.status === 'read' ? (
                                            <CheckCheck size={14} color="#04A4F4" className="mt-2" />
                                        ) : (
                                            <Dot size={30} color="#DB5962" />
                                        )}
                                    </div>
                                </div>
                            </section>
                        );
                    })}
                </section>
            </section>
        </div>
    );
};

export default ChatList;
