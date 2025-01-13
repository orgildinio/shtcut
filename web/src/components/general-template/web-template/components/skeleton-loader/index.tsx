import ImgPlaceholder from '@shtcut/components/card-skeleton/img-placeholder';
import React from 'react';

const SkeletonLoaderWeb = () => {
    const skeletonRows = Array.from({ length: 5 }, (_, index) => (
        <ImgPlaceholder width="full" height="[50px]" showIcon={false} key={index} />
    ));
    return (
        <section>
            <ImgPlaceholder width="full" height="[500px]" />
            <section className="w-[598px] rounded-t-md relative bottom-24 bg-gray-100 p-4 flex flex-col gap-2 mx-auto">
                {skeletonRows}
            </section>
        </section>
    );
};

export default SkeletonLoaderWeb;
