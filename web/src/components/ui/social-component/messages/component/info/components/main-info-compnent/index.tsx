import { Separator } from '@shtcut-ui/react';
import { UserRound, Calendar, Sun, Tag, ChevronRight } from 'lucide-react';
import { BsCheck2Square } from 'react-icons/bs';

import Image from 'next/image';
import React from 'react';

const MainInfoComponent = () => {
    const ReusableComponent = ({
        icon,
        title,
        component
    }: {
        icon: React.ReactNode;
        title: string;
        component: React.ReactNode;
    }) => {
        return (
            <section className="flex  items-center justify-between">
                <div className="flex items-center gap-x-2 text-[#6E6E6E]">
                    {icon}
                    <p className="text-sm text-[#6E6E6E]">{title}</p>
                </div>
                <div>{component}</div>
            </section>
        );
    };
    return (
        <div className="flex flex-col gap-2 mt-6">
            <ReusableComponent
                title="Admin"
                icon={<UserRound size={18} />}
                component={
                    <section className="flex items-center gap-x-2">
                        <Image
                            src={'/images/comment-user.jpg'}
                            width={0}
                            height={0}
                            alt="profile"
                            className=" object-cover  h-7 w-7  rounded-full  "
                            unoptimized
                            priority
                        />
                        <p className="text-sm font-medium">Amanda B.</p>
                    </section>
                }
            />
            <Separator />

            <ReusableComponent
                title="Date created"
                icon={<Calendar size={18} />}
                component={<p className="text-sm font-medium">28 May,2024</p>}
            />
            <Separator />

            <ReusableComponent
                title="Active"
                icon={<Sun size={18} />}
                component={
                    <div className="w-fit px-2 py-1 bg-[#FFEEAF] rounded">
                        <p className="text-xs font-medium">Active</p>
                    </div>
                }
            />
            <Separator />
            <ReusableComponent
                title="Tags"
                icon={<Tag size={18} />}
                component={
                    <section className="flex items-center gap-x-2">
                        <p className="text-sm font-medium">13</p>
                        <ChevronRight size={18} />
                    </section>
                }
            />
            <Separator />
            <ReusableComponent
                title="Tasks"
                icon={<BsCheck2Square size={18} />}
                component={
                    <section className="flex items-center gap-x-2">
                        <p className="text-sm font-medium">2</p>
                        <ChevronRight size={18} />
                    </section>
                }
            />
        </div>
    );
};

export default MainInfoComponent;
