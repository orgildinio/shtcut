'use client';

import LinkComponent from '@shtcut/components/dashboard/link/link-component';
import { useLink } from '@shtcut/hooks/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const LinkContainer = () => {
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
        handleSearchChange
    } = useLink({
        callLinks: true,
        search
    });
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
            findAllLinksResponse={findAllLinksResponse}
            deleteLink={deleteLink}
            isLoading={isLoading}
            deleteLinkResponse={deleteLinkResponse}
            isLoadingState={isLoadingState}
            setLoadingState={setLoadingState}
            createLink={createLink}
            createLinkResponse={createLinkResponse}
            onSearchChange={onSearchChange}
            search={search}
        />
    );
};
export default LinkContainer;
