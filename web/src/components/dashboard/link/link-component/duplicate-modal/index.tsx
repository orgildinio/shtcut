import { Button } from '@shtcut-ui/react';
import { LoadingButton } from '@shtcut/components/_shared/loading-button';
import Image from 'next/image';
import React from 'react';

const DuplicateComponent = ({
    isLoadingState,
    handleDuplicate,
    handleClose
}: {
    isLoadingState: boolean;
    handleDuplicate: () => void;
    handleClose: () => void;
}) => {
    return (
        <div>
            <section className="flex flex-col p-4 items-center gap-4">
                <Image src={'/images/copy.png'} width={48} height={48} alt="duplicate" />
                <div>
                    <h1 className="font-semibold text-center">Duplicate link</h1>
                    <p className="text-[13px]  mx-auto text-center text-[#475467]">
                        Duplicating this link will create a new identical link with the same settings and can be
                        modified further if needed.
                    </p>
                </div>
                <div className="flex w-full gap-2">
                    <Button onClick={handleClose} className="w-full" variant={'outline'}>
                        Cancel
                    </Button>
                    <LoadingButton onClick={handleDuplicate} loading={isLoadingState}>
                        Duplicate
                    </LoadingButton>
                </div>
            </section>
        </div>
    );
};

export default DuplicateComponent;
