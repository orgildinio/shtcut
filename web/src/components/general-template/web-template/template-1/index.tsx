import { User } from 'lucide-react';
import React from 'react';
import { LinkBioDataResponse } from '@shtcut/types/link-bio';
import Image from 'next/image';
import WebCardPreview from '../components/web-card-preview';
import SkeletonLoaderWeb from '../components/skeleton-loader';

const WebTemplate1 = ({
    linkBioData,
    isLoading
}: {
    linkBioData: LinkBioDataResponse | undefined;
    isLoading: boolean;
}) => {
    return (
        <div>
            {isLoading ? (
                <SkeletonLoaderWeb />
            ) : (
                <>
                    {' '}
                    <section className=" h-[372px] " style={{ backgroundColor: linkBioData?.colors.presetColor }}>
                        <div className="flex justify-center gap-y-2 flex-col items-center pt-8">
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

                            <section>
                                <h1 className="font-semibold text-center text-white ">Sammy Jackson</h1>
                                <p className=" text-center text-white ">Co-Founder</p>
                            </section>
                        </div>
                    </section>
                    <section className="w-[598px] relative bottom-24 h-[500px] mx-auto">
                        <WebCardPreview linkBioData={linkBioData} />
                    </section>
                </>
            )}
        </div>
    );
};

export default WebTemplate1;
