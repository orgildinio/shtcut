import Image from 'next/image';
import React from 'react';
import { PencilLine } from 'lucide-react';
import OverlappingImages from '@shtcut/components/overlap-image';
import MainInfoComponent from './components/main-info-compnent';
import MembersComponent from './components/members-component';

const InfoTabs = () => {
    const userImages = ['/images/user1.png', '/images/user2.png', '/images/user3.png', '/images/user4.png'];

    return (
        <div className=" flex z-0 flex-col h-[500px] px-4">
            <h2 className="font-semibold  ">Main Info</h2>
            <section className="flex-1  overflow-y-auto">
                <section>
                    <Image
                        src={'/images/comment-user.jpg'}
                        width={0}
                        height={0}
                        alt="profile"
                        className=" object-cover  h-20 w-20 float-left mr-4 rounded-full  "
                        unoptimized
                        priority
                    />
                    <div className="">
                        <div className="flex justify-between border-b py-2 items-center">
                            <p className="font-medium">Marketing</p>
                            <PencilLine size={14} />
                        </div>
                        <div className="mt-2">
                            <OverlappingImages
                                images={userImages}
                                size={30}
                                overlap={10}
                                borderColor="#FFFFFF"
                                animationDelay={0.15}
                            />{' '}
                        </div>
                    </div>
                </section>
                <MainInfoComponent />
                <MembersComponent />
            </section>
        </div>
    );
};

export default InfoTabs;
