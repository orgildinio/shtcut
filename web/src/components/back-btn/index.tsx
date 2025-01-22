/** @format */

import { useRouter } from 'next/navigation';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = ({ navigation, className }: { navigation?: string; className?: string }) => {
    const router = useRouter();
    return (
        <div className={`cursor-pointer shadow-none border-none bg-none w-10 h-10  ${className}`}>
            <div
                onClick={() => {
                    if (navigation) {
                        router.push(navigation);
                    } else router.back();
                }}
                className=" text-black  w-full h-full rounded-full flex justify-center items-center"
            >
                <FaArrowLeft size={16} />
            </div>
        </div>
    );
};

export default BackButton;
