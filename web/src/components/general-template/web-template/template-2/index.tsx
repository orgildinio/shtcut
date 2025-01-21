import { LinkBioDataResponse } from '@shtcut/types/link-bio';
import React from 'react';
import WebCardPreview from '../components/web-card-preview';
import SkeletonLoaderWeb from '../components/skeleton-loader';
import Image from 'next/image';
import { User } from 'lucide-react';
import { Card } from '@shtcut-ui/react';

const WebTemplate2 = ({
    linkBioData,
    isLoading
}: {
    linkBioData: LinkBioDataResponse | undefined;
    isLoading: boolean;
}) => {
    return (
        <section>
            {isLoading ? (
                <SkeletonLoaderWeb />
            ) : (
                <>
                    <section
                        className="h-[372px] relative"
                        style={{
                            backgroundImage: linkBioData?.profileImage ? `url(${linkBioData.profileImage})` : undefined,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-40" />
                        <section className="items-center flex justify-center left-0 right-0 z-20 absolute bottom-[-30px] mx-auto">
                            <Card
                                className="rounded-full w-fit mx-auto
                         h-fit  p-3 shadow-none border items-center flex justify-center   m-0 mb-0 mt-0"
                            >
                                {linkBioData?.profileImage ? (
                                    <Image
                                        src={linkBioData?.profileImage}
                                        width={130}
                                        height={130}
                                        className="rounded-full"
                                        alt={linkBioData.name}
                                    />
                                ) : (
                                    <User size={130} />
                                )}
                            </Card>
                        </section>
                    </section>
                    <Card className="w-[508px] relative  mx-auto rounded-t-none" style={{backgroundColor:linkBioData?.colors?.background}}>
                        <div className=" ">
                            <section className="pt-14">
                                <h1 className="font-semibold text-center  ">{linkBioData?.name}</h1>
                                <p className=" text-center  ">{linkBioData?.description}</p>
                            </section>
                        </div>{' '}
                        <section className="pt-4 ">
                            <WebCardPreview linkBioData={linkBioData} />
                        </section>
                    </Card>{' '}
                </>
            )}
        </section>
    );
};

export default WebTemplate2;
