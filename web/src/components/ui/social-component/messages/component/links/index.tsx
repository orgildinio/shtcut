import React from 'react';
import { ChevronRight, Dot, Link } from 'lucide-react';

const LinksTab = () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    return (
        <div className="flex z-0 flex-col h-[500px]">
            <h2 className="font-semibold   mb-2 px-4">Links</h2>

            <section className="bg-[#F0F0F0] px-4 py-2">
                <h2 className="text-sm">This month</h2>
            </section>
            <section className="flex flex-col mt-4 px-4 flex-1  overflow-y-auto">
                {data.map((index) => (
                    <a
                        href={''}
                        className={`flex justify-between py-3 items-center w-full ${
                            index !== data.length - 1 ? 'border-b' : ''
                        }`}
                    >
                        <section className="w-full">
                            <div className="w-8 h-8 float-left mr-4 rounded-md flex justify-center items-center bg-[#F0F0F0]">
                                <Link size={14} className="text-[#B5B3B3]" />
                            </div>{' '}
                            <section className="w-full ">
                                <p className="text-sm font-medium">Tiktok- Ikeja Record</p>
                                <div className="text-xs flex items-center gap-x-1 text-[#726C6C]">
                                    Sent by Amanda{' '}
                                    <Dot size={4} className=" rounded-full text-[#B5B3B3] bg-[#B5B3B3]" />{' '}
                                    <span>1day ago</span>{' '}
                                </div>
                            </section>
                        </section>
                        <ChevronRight size={18} />
                    </a>
                ))}
            </section>
        </div>
    );
};

export default LinksTab;
