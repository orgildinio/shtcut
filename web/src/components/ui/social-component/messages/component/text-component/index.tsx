import { faker } from '@faker-js/faker';
import { ChatMessage } from '@shtcut/types/types';
import React from 'react';
import ChatScreenActions from '../chat-screen-actions';

const TextComponent = ({
    singleChat,
    onClickDelete
}: {
    singleChat: ChatMessage | null;
    onClickDelete: () => void;
}) => {
    return (
        <section className={`${singleChat?.sender === 'me' ? 'flex justify-end ' : ''} gap-4`}>
            <section className="w-fit">
                {singleChat?.sender !== 'me' && (
                    <section className="flex items-center gap-4">
                        <section className="flex items-center gap-2">
                            <img src={faker.image.avatar()} className=" w-8 h-8 rounded-full " alt="Avatar" />

                            <p className="text-[13px] font-semibold">{singleChat?.senderName}</p>
                        </section>
                        <p className="text-xs text-[#9F9C9C]">12 mins</p>
                    </section>
                )}
                <section className="max-w-md ">
                    <div className={` mt-3 ml-2 ${singleChat?.sender === 'me' ? 'float-left ' : 'float-right'}`}>
                        <ChatScreenActions onClickDelete={onClickDelete} />
                    </div>
                    <div
                        className={` mt-2 text-[13px] ${
                            singleChat?.sender === 'me'
                                ? 'bg-primary-0 text-white rounded-tl-lg rounded-b-lg '
                                : 'bg-gray-100 text-black rounded-tr-lg rounded-b-lg '
                        } inline-block px-4 py-2  break-words`}
                    >
                        <p>{singleChat?.content}</p>
                    </div>
                    {singleChat?.sender === 'me' && <p className="text-xs mt-1 text-end text-[#9F9C9C]">12 mins</p>}
                </section>
            </section>
        </section>
    );
};

export default TextComponent;
