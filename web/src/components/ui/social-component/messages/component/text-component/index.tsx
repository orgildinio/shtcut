import { faker } from '@faker-js/faker';
import { ChatMessage } from '@shtcut/types/types';
import React from 'react';

const TextComponent = ({ singleChat }: { singleChat: ChatMessage | null }) => {
    return (
        <section className={`${singleChat?.sender === 'me' ? 'flex justify-end ' : ''} gap-4`}>
            <section>
                {singleChat?.sender !== 'me' && (
                    <section className="flex items-center gap-4">
                        <section className="flex items-center gap-2">
                            <img src={faker.image.avatar()} className=" w-9 h-9 rounded-full " alt="Avatar" />

                            <p className="text-sm font-semibold">{singleChat?.senderName}</p>
                        </section>
                        <p className="text-xs text-[#9F9C9C]">12 mins</p>
                    </section>
                )}
                <section className="max-w-md ">
                    <div
                        className={` mt-2 ${
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
