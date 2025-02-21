import { ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const StarredCard = () => {
    return (
        <div>
            <section className="w-full">
                <Image
                    src={'/images/comment-user.jpg'}
                    width={0}
                    height={0}
                    alt="profile"
                    className=" object-cover  h-8 w-8 float-left mr-2 rounded-full  "
                    unoptimized
                    priority
                />
                <section className="flex relative top-1.5 items-center justify-between">
                    <div className="flex space-x-1 items-center">
                        <span className="font-medium">Stephen Jon</span>
                        <div className="w-1 h-1 bg-black rounded-full" />
                        <span className="font-medium text-[13px]">Marketing</span>
                    </div>
                    <p className="text-sm text-[#6E6E6E]">7/10/24</p>
                </section>
            </section>
            <section className="mt-5 bg-[#F9F9F9] p-4 rounded">
                <p className="text-sm text-[#2B2829]">
                    Have a valid passport Check your social media Know your NOC (Work code) Ensure your work experience
                    aligns with the date Create a profile with IRCC and input your details
                </p>
                <section className="flex items-center justify-between pt-6">
                    <section className="flex items-center gap-x-2">
                        <Star size={18} className="text-[#726C6C]" />
                        <p className="text-sm text-[#726C6C]">18:30pm</p>
                    </section>
                    <ChevronRight size={18} />
                </section>
            </section>
        </div>
    );
};

export default StarredCard;
