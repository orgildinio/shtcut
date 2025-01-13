import LinkBioDynamicComponent from '@shtcut/components/ui/shorten-er/link-bios/dynamic-link-bio';
import { useLinkBios } from '@shtcut/hooks/link-bio';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

const LinkBioDynamicContainer = () => {
    const { linkBioActions, linkBiosState } = useLinkBios({ callLinkbio: true });
    const params = useParams();
    const { slug } = params;

    useEffect(() => {
        if (slug) {
            linkBioActions.getLinkBio({ slug });
        }
    }, [slug, linkBioActions.getLinkBio]);

    console.log('data', linkBiosState.getLinkBioData);

    return (
        <LinkBioDynamicComponent
            isLoading={linkBiosState?.getLinkBioLoading}
            linkBioData={linkBiosState.getLinkBioData}
        />
    );
};

export default LinkBioDynamicContainer;
