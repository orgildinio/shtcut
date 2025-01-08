import LinkBiosComponent from '@shtcut/components/ui/shorten-er/link-bios';
import { useLinkBios } from '@shtcut/hooks/link-bio';
import React from 'react';

const LinkBiosContainer = () => {
    const { linkBiosState, linkBioActions } = useLinkBios({ callLinkbio: true });
    console.log('linkBiosState', linkBiosState?.findAllLinkBioResponse);
    return (
        <LinkBiosComponent
            findAllLinkBioResponse={linkBiosState?.findAllLinkBioResponse}
            linkBioLoading={linkBiosState?.findLinkBioLoading}
            pagination={linkBiosState?.pagination}
            paginationActions={linkBioActions?.paginationActions}
            linkBioActions={linkBioActions}
            linkBiosState={linkBiosState}
        />
    );
};

export default LinkBiosContainer;
