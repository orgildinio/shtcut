import LinkBioDynamicComponent from '@shtcut/components/ui/shorten-er/link-bios/dynamic-link-bio';
import { useGetLink } from '@shtcut/hooks/get-link';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

const LinkBioDynamicContainer = () => {
    const { linkActions, linkState } = useGetLink();
    const params = useParams();
    const { slug } = params;
    console.log('slug::', slug);

    useEffect(() => {
        if (slug) {
            linkActions.getLink({ slug });
        }
    }, [slug, linkActions.getLink]);

    return <LinkBioDynamicComponent isLoading={linkState?.isLoading} linkData={linkState.getLinkData} />;
};

export default LinkBioDynamicContainer;
