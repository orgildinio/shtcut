'use client';

import LinkComponent from '@shtcut/components/dashboard/link/link-component';
import { useDomain } from '@shtcut/hooks/domain';
import { useLink } from '@shtcut/hooks/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const LinkContainer = () => {
    const [url, setUrl] = useState('');
    const [search, setSearch] = useState('');
    const router = useRouter();
    const getParams = useSearchParams();
    const pathName = usePathname();
    const {
        findAllLinksResponse,
        isLoading,
        deleteLink,
        deleteLinkResponse,
        isLoadingState,
        setLoadingState,
        createLink,
        createLinkResponse,
        handleSearchChange,
        duplicate,
        duplicateLinkResponse,
        findAllLinks,
        fetchMetadata,
        fetchMetaDataResponse,
        fetchMetaLoading,
        updateLink,
        updateLinkResponse
    } = useLink({
        callLinks: true,
        search,
        url
    });
    const { findAllDomainsResponse } = useDomain({ callDomain: true });

    const onSearchChange = (value: string) => {
        setSearch(value);
        handleSearchChange(value);
        const newUrl = value ? `${pathName}?search=${encodeURIComponent(value)}` : `${pathName}`;
        router.replace(newUrl);
    };
    useEffect(() => {
        const state = getParams.get('search');
        if (state) {
            setSearch(state as string);
            handleSearchChange(state as string);
        }
    }, [getParams]);

    return (
        <LinkComponent
            findAllLinksResponse={findAllLinksResponse ?? []}
            findAllDomainsResponse={findAllDomainsResponse ?? []}
            deleteLink={deleteLink}
            updateLink={updateLink}
            updateLinkResponse={updateLinkResponse}
            isLoading={isLoading}
            deleteLinkResponse={deleteLinkResponse}
            isLoadingState={isLoadingState}
            setLoadingState={setLoadingState}
            createLink={createLink}
            createLinkResponse={createLinkResponse}
            onSearchChange={onSearchChange}
            search={search}
            duplicate={duplicate}
            duplicateLinkResponse={duplicateLinkResponse}
            findAllLinks={findAllLinks}
            fetchMetadata={fetchMetadata}
            fetchMetaDataResponse={fetchMetaDataResponse}
            fetchMetaLoading={fetchMetaLoading}
            setUrl={setUrl}
        />
    );
};
export default LinkContainer;
