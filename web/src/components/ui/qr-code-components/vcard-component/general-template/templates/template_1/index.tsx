import { Card } from '@shtcut-ui/react';
import { ContactActions } from '@shtcut/types/types';
import Image from 'next/image';
import React, { ReactNode } from 'react';
import { BsTelephoneFill } from 'react-icons/bs';
import { PiEnvelopeLight } from 'react-icons/pi';

const Template_1 = ({
    contactActions,
    handleSelectTemplate,
    activeTemplate,
    presetColor
}: {
    contactActions: ContactActions[];
    handleSelectTemplate: (val: string) => void;
    activeTemplate: string;
    presetColor?: string;
}) => {
    const ReusableComponent = ({ icons, name, title }: { name: string; icons: ReactNode; title: string }) => {
        return (
            <section className="flex bg-white rounded-md shadow-sm p-2 gap-2 items-center ">
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
            style={{ border: `3px solid ${activeTemplate === 'template_1' ? presetColor : '#DCE5FB'}` }}
            className={`w-full h-80 cursor-pointer border-[3px] flex items-center justify-center px-3 rounded-md `}
            onClick={() => handleSelectTemplate('template_1')}
        >
            <section className="bg-[#EAEFF2] w-full p-2 rounded-md ">
                <div
                    style={{ backgroundColor: presetColor }}
                    className=" w-full px-2 py-4  flex flex-col items-center gap-2"
                >
                    <section className="h-12 w-12">
                        <Image
                            src={'/images/steve.jpeg'}
                            alt="steve"
                            style={{ borderRadius: '50%' }}
                            className="h-12 w-12"
                            height={0}
                            width={0}
                            unoptimized
                            priority
                        />
                    </section>
                    <div className="flex flex-col items-center">
                        <p className="text-white text-[10px] font-semibold">Samantha Daniels</p>
                        <p className="text-[8px] text-[#CCCBCB]">Digital Marketer - TSB Limited</p>
                    </div>
                    <section className="flex  gap-2 w-full ">
                        {contactActions.map((_c) => (
                            <Card
                                className="bg-white  py-1 shadow-sm w-full gap-1 flex flex-col items-center justify-center rounded"
                                key={_c.name}
                            >
                                <div style={{ color: presetColor }}>{_c.icon}</div>
                                <p style={{ color: presetColor }} className="font-bold  text-[7px]">
                                    {_c.name}
                                </p>
                            </Card>
                        ))}
                    </section>
                </div>
                <section className="flex mt-2   flex-col gap-2  ">
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

export default Template_1;
