'use client';

import { Button, Card } from '@shtcut-ui/react';
import { connectChannel } from '@shtcut/_shared/data';
import Modal from '@shtcut/components/modal';
import { Check } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

const SocialDashboardComponent = () => {
    const [showModal, setShowModal] = useState(true);
    const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
    const handleChannelSelect = (channel: string, title: string) => {
        setSelectedChannel(channel);
    };

    return (
        <div>
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(true)}
                className="relative max-w-md  px-8  py-6"
                closeIcon={false}
            >
                <h1 className="text-2xl font-medium text-center">Connect channel</h1>
                <p className="text-sm text-center leading-[21px] mt-2 w-[400px] mx-auto">
                    Connect a channel where you wish to grow your audience. You can always add one later
                </p>
                <section className="grid mt-12 grid-cols-3 gap-4">
                    {connectChannel.map((_c) => (
                        <Card
                            key={_c.title}
                            className={`shadow-sm h-28 flex items-center cursor-pointer justify-center flex-col w-full relative ${selectedChannel === _c.channels ? 'border border-primary-0' : ''}`}
                            onClick={() => handleChannelSelect(_c.channels, _c.title)}
                        >
                            {selectedChannel === _c.channels && (
                                <Check className="absolute top-2 right-2 text-green-500" size={14} />
                            )}
                            <Image src={_c.channels} width={32} height={32} alt={_c.title} />
                            <p className="text-sm font-medium mt-4">{_c.title}</p>
                            <p className="text-xs">{_c.description}</p>
                        </Card>
                    ))}
                </section>

                <section className="flex items-center justify-end gap-4 mt-10">
                    <Button className="w-40" variant={'outline'}>
                        Connect Later
                    </Button>
                    <Button className="bg-primary-0 w-40">Next</Button>
                </section>
            </Modal>
        </div>
    );
};

export default SocialDashboardComponent;
