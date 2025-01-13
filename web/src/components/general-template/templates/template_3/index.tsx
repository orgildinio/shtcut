import { Card } from '@shtcut-ui/react';
import { ContactActions } from '@shtcut/types/types';
import Image from 'next/image';
import React, { ReactNode } from 'react';
import { BsTelephoneFill } from 'react-icons/bs';
import { PiEnvelopeLight } from 'react-icons/pi';

const Template_3 = ({
    contactActions,
    handleSelectTemplate,
    activeTemplate,
    presetColor
}: {
    contactActions: ContactActions[];
    handleSelectTemplate: (val: string) => void;
    activeTemplate: string | undefined;
    presetColor?: string;
}) => {
    const ReusableComponent = ({ icons, name, title }: { name: string; icons: ReactNode; title: string }) => {
        return (
            <section className="flex bg-white px-2 rounded-md shadow-sm  gap-2 items-center">
                <div style={{ color: presetColor }}> {icons}</div>
                <div>
                    <p className="text-[8px] text-[#898384] font-medium">{title}</p>
                    <p className="text-[8px] font-medium">{name}</p>
                </div>
            </section>
        );
    };
    return (
        <div
            style={{ border: `3px solid ${activeTemplate === 'template_3' ? presetColor : '#DCE5FB'}` }}
            className={` h-80   w-full cursor-pointer border-[3px] flex items-center justify-center px-4 rounded-md ${activeTemplate === 'template_3' ? 'border-[#2F64E9]' : 'border-[#DCE5FB]'} `}
            onClick={() => handleSelectTemplate('template_3')}
        >
            <section className="bg-[#EAEFF2] w-full relative p-3 rounded-md ">
                <div className=" h-32 w-full">
                    <Image
                        src="/images/steve.jpeg"
                        alt="steve"
                        className="h-32 w-full object-cover"
                        height={0}
                        width={0}
                        unoptimized
                        priority
                    />
                </div>
                <section
                    style={{ backgroundColor: presetColor }}
                    className="relative h-full  flex-1 rounded-t-xl  bottom-8"
                >
                    <section className="rounded-t-2xl  overflow-y-auto  flex flex-col gap-2 z-40 p-2">
                        <div className="flex flex-col items-center ">
                            <p className="text-white text-[10px] font-semibold">Samantha Daniels</p>
                            <p className="text-[8px] text-center text-[#CCCBCB]">Digital Marketer - TSB Limited</p>
                        </div>
                        <section className="flex  gap-2 w-full ">
                            {contactActions.map((_c) => (
                                <Card
                                    style={{ border: `1px solid ${presetColor}` }}
                                    className="bg-white  py-1 shadow-sm w-8 h-8  gap-1 flex flex-col items-center justify-center  rounded-full"
                                    key={_c.name}
                                >
                                    <div style={{ color: presetColor }}>{_c.icon}</div>
                                </Card>
                            ))}
                        </section>
                        <section className="bg-white rounded-t-lg py-2">
                            <ReusableComponent
                                icons={<BsTelephoneFill size={10} />}
                                name="+2347064442818"
                                title="Mobile Phone"
                            />
                        </section>
                    </section>
                </section>
            </section>
        </div>
    );
};

export default Template_3;
