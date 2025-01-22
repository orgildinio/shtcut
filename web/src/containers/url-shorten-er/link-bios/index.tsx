'use client';

import LinkBiosComponent from '@shtcut/components/ui/shorten-er/link-bios';
import { useLinkBios } from '@shtcut/hooks/link-bio';
import React, { useState } from 'react';

const LinkBiosContainer = () => {
    const [search, setSearch] = useState('');

    const { linkBiosState, linkBioActions } = useLinkBios({ callLinkbio: true, search });

    const onSearchChange = (value: string) => {
        setSearch(value);
        linkBioActions.handleSearchChange(value);
    };
    return (
        <LinkBiosComponent
            findAllLinkBioResponse={linkBiosState?.findAllLinkBioResponse}
            linkBioLoading={linkBiosState?.findLinkBioLoading}
            pagination={linkBiosState?.pagination}
            paginationActions={linkBioActions?.paginationActions}
            linkBioActions={linkBioActions}
            linkBiosState={linkBiosState}
            onSearchChange={onSearchChange}
            search={search}
        />
    );
};

export default LinkBiosContainer;
