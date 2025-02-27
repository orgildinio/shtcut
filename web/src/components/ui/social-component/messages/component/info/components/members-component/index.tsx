import { Plus } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import MemberActions from '../member-actions';
import { Button } from '@shtcut-ui/react';

const MembersComponent = () => {
    return (
        <div className="mt-6 ">
            <section className="flex items-center justify-between sticky top-0 bg-white">
                <h2 className="font-semibold  ">Members 23</h2>
                <section className="flex items-center gap-x-2">
                    <h2 className="font-medium  "> Invite</h2>
                    <Plus size={18} />
                </section>
            </section>
            <section className="flex flex-col gap-3 mt-3">
                {[...Array(30)].map((item, index) => (
                    <section className="flex items-center justify-between" key={index}>
                        <section className="w-full">
                            <Image
                                src={'/images/user1.png'}
                                width={0}
                                height={0}
                                alt="profile"
                                className=" object-cover  h-8 w-8 float-left mr-3 rounded-full  "
                                unoptimized
                                priority
                            />
                            <div className="">
                                <p className="text-sm font-medium">Daniel Anderson</p>
                                <p className="text-xs text-[#6E6E6E] font-medium">CFO</p>
                            </div>
                        </section>{' '}
                        <section className="flex items-center gap-x-2">
                            <section className="bg-[#FFDCCC] px-2 py-1 rounded w-fit">
                                <p className="text-xs text-[#6E6E6E]">Development</p>
                            </section>
                            <MemberActions />
                        </section>
                    </section>
                ))}
            </section>
            <Button className="p-0 text-[#6E6E6E]" variant={'unstyled'}>
                View all
            </Button>
        </div>
    );
};

export default MembersComponent;
