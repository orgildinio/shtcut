'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { Dict } from '@shtcut-ui/react';
import { Pagination } from '@shtcut/_shared/namespace';
import { usePagination } from '../usePagination';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@shtcut/redux/store';
import {
    useCreateLinkMutation,
    useDeleteLinkMutation,
    useLazyDuplicateLinkQuery,
    useLazyFindAllLinksQuery,
    useLazyGetLinkQuery,
    useUpdateLinkMutation
} from '@shtcut/services/link';
import { LinkNameSpace } from '@shtcut/_shared/namespace/link';
import { selectFindAllLinkData } from '@shtcut/redux/selectors/link';
import { debounce } from 'lodash';

interface UseLinkProps {
    id?: string;
    key?: string;
    callLinks?: boolean;
    search?: string;
    filter?: Dict;
}

interface UseLinkReturnsType {
    createLink: MutationTrigger<any>;
    deleteLink: MutationTrigger<any>;
    updateLink: MutationTrigger<any>;
    findAllLinks: any;
    isLoading: boolean;
    handleDeleteLink: (id: string) => void;
    findAllLinksResponse: LinkNameSpace.Link[] | undefined;
    createLinkResponse: Dict;
    getLinkResponse: Dict;
    updateLinkResponse: Dict;
    deleteLinkResponse: Dict;
    pagination: Pagination;
    isLoadingState: boolean;
    duplicate: any;
    duplicateLinkResponse: Dict;
    setLoadingState: (key: 'duplicating' | 'updating' | 'deleting' | 'finding' | 'fetching', value: boolean) => void;
    handleSearchChange: any;
}

export const useLink = (props: UseLinkProps): UseLinkReturnsType => {
    const { callLinks = false, search, filter, id } = props;
    const { paginate, pagination } = usePagination({ key: 'findAllLinks' });
    const [createLink, createLinkResponse] = useCreateLinkMutation();
    const [updateLink, updateLinkResponse] = useUpdateLinkMutation();
    const [deleteLink, deleteLinkResponse] = useDeleteLinkMutation();
    const [findAllLinks, { isLoading }] = useLazyFindAllLinksQuery();
    const [duplicate, duplicateLinkResponse] = useLazyDuplicateLinkQuery();
    const [getLink, getLinkResponse] = useLazyGetLinkQuery();
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    const [loading, setLoading] = useState({
        duplicating: false,
        updating: false,
        deleting: false,
        finding: false,
        fetching: false
    });

    // Unified loading state
    const isLoadingState = Object.values(loading).some((state) => state);
    const setLoadingState = (key: keyof typeof loading, value: boolean) => {
        setLoading((prev) => ({ ...prev, [key]: value }));
    };

    const params = {
        ...paginate,
        population: JSON.stringify([
            { path: 'user' },
            { path: 'domain', select: ['slug', 'name'] },
            { path: 'qrCode' }
        ]),
        search: debouncedSearch,
        ...filter
    };

    const findAllLinksResponse = useAppSelector((state) => selectFindAllLinkData(state, params));
    const handleSearchChange = debounce((newSearch) => {
        setDebouncedSearch(newSearch);
    }, 500);
    useEffect(() => {
        if (callLinks) {
            findAllLinks({
                ...params
            });
        }
    }, [callLinks, debouncedSearch, filter]);

    useEffect(() => {
        if (id) {
            getLink({
                id,
                population: params.population
            });
        }
    }, [id]);
    const handleDeleteLink = (id: string) => {
        deleteLink({ payload: { id } });
    };

    return {
        isLoading,
        createLink,
        updateLink,
        deleteLink,
        findAllLinks,
        duplicate,
        findAllLinksResponse,
        createLinkResponse,
        getLinkResponse,
        updateLinkResponse,
        duplicateLinkResponse,
        deleteLinkResponse,
        pagination,
        handleDeleteLink,
        isLoadingState,
        setLoadingState,
        handleSearchChange
    };
};
