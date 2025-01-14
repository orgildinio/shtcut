'use client';

import { LinkArchiveComponent } from '@shtcut/components/dashboard';
import { useLink } from '@shtcut/hooks/link';
import React from 'react';

const LinkArchiveContainer = () => {
    const {
        findAllLinksResponse,
        isLoading,
        updateLinkResponse,
        isLoadingState,
        updateLink,
        setLoadingState,
        findAllLinks
    } = useLink({
        callLinks: true,
        filter: {
            archived: true,
            all: true
        }
    });

    return (
        <LinkArchiveComponent
            isLoading={isLoading}
            findAllLinksResponse={findAllLinksResponse}
            updateLinkResponse={updateLinkResponse}
            isLoadingState={isLoadingState}
            updateLink={updateLink}
            setLoadingState={setLoadingState}
            findAllLinks={findAllLinks}
        />
    );
};

export default LinkArchiveContainer;
