import { Card } from '@shtcut-ui/react';
import { ContactActions } from '@shtcut/types/types';
import Image from 'next/image';
import React, { ReactNode } from 'react';
import { BsTelephoneFill } from 'react-icons/bs';
import { PiEnvelopeLight } from 'react-icons/pi';

const Template_2 = ({
    contactActions,
    handleSelectTemplate,
    activeTemplate
}: {
    contactActions: ContactActions[];
    handleSelectTemplate: (val: string) => void;
    activeTemplate: string;
}) => {
    const ReusableComponent = ({ icons, name, title }: { name: string; icons: ReactNode; title: string }) => {
        return (
            <section className="flex bg-white px-2 rounded-md shadow-sm py-2 gap-2 items-center">
                <div className="text-[#0D2C7A]"> {icons}</div>
                <div>
                    <p className="text-[8px] text-[#898384] font-medium">{title}</p>
                    <p className="text-[8px] font-medium">{name}</p>
                </div>
            </section>
        );
    };
    return (
        <div
            className={` h-80 w-full cursor-pointer border-[3px] flex items-center justify-center px-4 rounded-md ${activeTemplate === 'template_2' ? 'border-[#2F64E9]' : 'border-[#DCE5FB]'} `}
            onClick={() => handleSelectTemplate('template_2')}
        >
            <section className="bg-[#EAEFF2] w-full relative p-3 rounded-md ">
                <div className="relative h-40 w-full">
                    <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
                    <section className="relative h-40 w-full z-0">
                        <Image
                            src="/images/steve.jpeg"
                            alt="steve"
                            className="h-40 w-full object-cover"
                            height={0}
                            width={0}
                            unoptimized
                            priority
                        />
                    </section>
                </div>
                <section className="absolute top-20 flex flex-col gap-2 z-40 p-2">
                    <div className="flex flex-col  ">
                        <p className="text-white text-[10px] font-semibold">Samantha Daniels</p>
                        <p className="text-[8px] text-[#CCCBCB]">Digital Marketer - TSB Limited</p>
                    </div>
                    <section className="flex  gap-2 w-full ">
                        {contactActions.map((_c) => (
                            <Card
                                className="bg-[#092059]  py-1 shadow-sm w-8 h-8  gap-1 flex flex-col items-center justify-center border-[#092059] rounded-full"
                                key={_c.name}
                            >
                                <div className="text-white">{_c.icon}</div>
                            </Card>
                        ))}
                    </section>
                </section>
                <section className="flex  flex-col gap-2  mt-2 ">
                    <ReusableComponent
                        icons={<BsTelephoneFill size={10} />}
                        name="+2347064442818"
                        title="Mobile Phone"
                    />
                    <ReusableComponent
                        title="Email Address"
                        icons={<PiEnvelopeLight size={10} />}
                        name="stephenado17@gmail.com"
                    />
                </section>
            </section>
        </div>
    );
};

export default Template_2;
