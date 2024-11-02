import SingleLinkPreviewComponent from '@shtcut/components/dashboard/link/link-preview-component';
import { useLink } from '@shtcut/hooks/link';
import { useParams } from 'next/navigation';
import React from 'react';

const SingleLinkPreviewContainer = () => {
    const { id } = useParams();
    const { getLinkResponse } = useLink({ id: id as string });

    console.log('getLinkResponse', getLinkResponse);

    return <SingleLinkPreviewComponent getLinkResponse={getLinkResponse?.currentData?.data} />;
};

export default SingleLinkPreviewContainer;
