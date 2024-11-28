import { ChatMessage } from '@shtcut/types/types';
import React from 'react';

const ImageComponent = ({ singleChat }: { singleChat: ChatMessage | null }) => {
    return (
        <section className={`${singleChat?.sender === 'me' ? 'flex justify-end ' : ''} gap-4`}>
            <section
                className={`${
                    singleChat?.sender === 'me'
                        ? 'bg-primary-0 text-white rounded-tl-lg rounded-b-lg '
                        : 'bg-gray-100 text-black rounded-tr-lg rounded-b-lg '
                } max-w-96`}
            >
                <div className={` px-4 py-2  flex flex-col gap-2 `}>
                    <img src={singleChat?.content} alt="" className="w-full h-80  rounded-md" />

                    <p className="">Thanks, Bob. Looks good!</p>
                </div>
            </section>
        </section>
    );
};

export default ImageComponent;
