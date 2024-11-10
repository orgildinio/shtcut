import { Button } from '@shtcut-ui/react';
import { getApexDomain } from '@shtcut/_shared';
import { GOOGLE_FAVICON_URL } from '@shtcut/_shared/constant';
import { LinkNameSpace } from '@shtcut/_shared/namespace/link';
import { LoadingButton } from '@shtcut/components/_shared/loading-button';
import Image from 'next/image';
import React from 'react';
import { CiImageOff } from 'react-icons/ci';

const ArchiveModal = ({
    data,
    handleArchive,
    isLoadingState,
    handleClose
}: {
    data: LinkNameSpace.Link;
    handleArchive: () => void;
    isLoadingState: boolean;
    handleClose: () => void;
}) => {
    const apexDomain = getApexDomain(data?.target ?? '');

    return (
        <div>
            <section className="flex flex-col p-4 items-center gap-4">
                <div className=" border  w-[50px] h-[50px] rounded-full flex justify-center items-center">
                    {apexDomain ? (
                        <Image
                            src={`${GOOGLE_FAVICON_URL}${apexDomain}`}
                            width={18}
                            height={18}
                            alt={apexDomain}
                            unoptimized
                            priority
                        />
                    ) : (
                        <CiImageOff size={24} />
                    )}
                </div>
                <div>
                    <h1 className="font-semibold text-center">Archive Link</h1>
                    <p className="text-[13px] mx-auto text-center text-[#475467]">
                        Archiving this link will remove it from your active links list but retain all settings for
                        future reference if needed.
                    </p>
                </div>
                <div className="flex w-full gap-2">
                    <Button className="w-full" variant={'outline'} onClick={handleClose}>
                        Cancel
                    </Button>
                    <LoadingButton loading={isLoadingState} onClick={handleArchive}>
                        Archive
                    </LoadingButton>
                </div>
            </section>
        </div>
    );
};

export default ArchiveModal;
