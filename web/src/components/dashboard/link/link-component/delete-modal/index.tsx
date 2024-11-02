import { Button } from '@shtcut-ui/react';
import { LoadingButton } from '@shtcut/components/_shared/loading-button';
import Image from 'next/image';
import React from 'react';

const DeleteComponent = ({
    isLoadingState,
    handleDelete,
    handleClose
}: {
    isLoadingState: boolean;
    handleDelete: () => void;
    handleClose: () => void;
}) => {
    return (
        <div>
            <section className="flex flex-col p-4 items-center gap-4">
                <Image src={'/images/delete-icon.png'} width={48} height={48} alt="delete" />
                <div>
                    <h1 className="font-semibold text-center">Delete link</h1>
                    <p className="text-[13px] w-5/6 mx-auto text-center text-[#475467]">
                        Deleting this link will redirect it to the shtcut erro page and can not be undone.
                    </p>
                </div>
                <div className="flex w-full gap-2">
                    <Button onClick={handleClose} className="w-full" variant={'outline'}>
                        Cancel
                    </Button>
                    <LoadingButton onClick={handleDelete} loading={isLoadingState}>
                        Delete
                    </LoadingButton>
                </div>
            </section>
        </div>
    );
};

export default DeleteComponent;
