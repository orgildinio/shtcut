'use client';

import { Button, Modal } from '@shtcut-ui/react';
import AnimatedContainer from '@shtcut/components/framer/animate-div';
import Image from 'next/image';
import React, { useState } from 'react';
import { FiPlayCircle } from 'react-icons/fi';
import ReusableCard from '../../reusable-card';

const LinkBio = () => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    return (
        <section className="relative max-w-screen-custom mx-auto px-4  pt-14">
            <AnimatedContainer className="flex flex-col items-center gap-y-4">
                <h1 className="text-4xl sm:text-[50px]  sm:leading-[60px] mx-auto text-center font-semibold">
                    Bio-Link
                </h1>
                <p className="text-[#737A8A] w-full sm:w-[40rem] text-center">
                    Create a personalized bio link page to showcase all your important links in one place. Ideal for
                    social media profiles, allowing your audience to find everything they need with a single click.
                </p>
                <div className="flex justify-center items-center gap-x-3">
                    <Button className="bg-primary-0 cursor-pointer font-semibold  text-xs">Start For Free</Button>
                    <Button variant={'outline'} className="border font-semibold  cursor-pointer text-xs border-black">
                        Watch a Demo
                    </Button>
                </div>
            </AnimatedContainer>
            <AnimatedContainer className="relative mt-8 cursor-pointer">
                <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    loading="eager"
                    src="https://img.youtube.com/vi/S98xoXFJ6Ek/maxresdefault.jpg"
                    alt="Video Thumbnail"
                    className="w-full h-[450px] rounded-[20px]"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 gap-3 rounded-[20px] flex-col">
                    <div
                        onClick={openModal}
                        className="flex items-center gap-2 bg-[#FAFAFA]/50 h-12 w-40 justify-center rounded-full"
                    >
                        <FiPlayCircle size={20} color="white" className="opacity-80" />
                        <p className="text-xs font-semibold text-white">Watch Demo</p>
                    </div>
                </div>
            </AnimatedContainer>
            <section className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3">
                {/* Top Row */}
                <ReusableCard
                    text="Create a personalized bio link page to showcase all your important links in one place. Ideal for social media profiles, allowing your audience to find everything they need with a single click."
                    title="Intuitive Dashboard"
                    className="md:col-span-1 bg-[#F7F7F7]"
                />
                <ReusableCard
                    text="Gain valuable insights with our comprehensive analytics tools. Track link performance, monitor user behavior, and optimize your strategies with real-time data"
                    title="Easily Create short links"
                    className="md:col-span-2 bg-[#F7F7F7]"
                    textClassName="w-3/4"
                />
                {/* Bottom Row */}
                <ReusableCard
                    text="Create a personalized bio link page to showcase all your important links in one place. Ideal for social media profiles, allowing your audience to find everything they need with a single click."
                    title="Manage your links"
                    className="md:col-span-1 bg-[#F7F7F7]"
                />
                <ReusableCard
                    text="Gain valuable insights with our comprehensive analytics tools. Track link performance, monitor user behavior, and optimize your strategies with real-time data"
                    title="Analytics"
                    className="md:col-span-1 bg-[#F7F7F7]"
                />
                <ReusableCard
                    text="Gain valuable insights with our comprehensive analytics tools. Track link performance, monitor user behavior, and optimize your strategies with real-time data"
                    title="Share Links"
                    className="md:col-span-1 bg-[#F7F7F7]"
                />
            </section>

            <Modal
                showModel={showModal}
                setShowModal={setShowModal}
                onClose={closeModal}
                showCloseIcon={true}
                className="w-full h-full max-w-screen-lg max-h-[30rem]"
            >
                <div className="relative w-full h-full">
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/S98xoXFJ6Ek?autoplay=1"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </Modal>
        </section>
    );
};

export default LinkBio;
