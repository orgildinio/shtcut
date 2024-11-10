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
    useLazyFetchMetadataQuery,
    useLazyFindAllLinksQuery,
    useLazyGetLinkQuery,
    useUpdateLinkMutation
} from '@shtcut/services/link';
import { LinkNameSpace, MetadataResponse } from '@shtcut/_shared/namespace/link';
import { selectFindAllLinkData } from '@shtcut/redux/selectors/link';
import { debounce } from 'lodash';

interface UseLinkProps {
    id?: string;
    key?: string;
    callLinks?: boolean;
    search?: string;
    filter?: Dict;
    url?: string;
    all?: boolean;
}

interface UseLinkReturnsType {
    createLink: MutationTrigger<any>;
    deleteLink: MutationTrigger<any>;
    updateLink: MutationTrigger<any>;
    fetchMetadata: Dict;
    findAllLinks: any;
    isLoading: boolean;
    handleDeleteLink: (id: string) => void;
    findAllLinksResponse: LinkNameSpace.Link[] | undefined;
    fetchMetaDataResponse: MetadataResponse | undefined;
    fetchMetaLoading: boolean;
    createLinkResponse: Dict;
    getLinkResponse: Dict;
    updateLinkResponse: Dict;
    duplicateLinkResponse: Dict;
    duplicate: any;
    deleteLinkResponse: Dict;
    pagination: Pagination;
    isLoadingState: boolean;

    setLoadingState: (key: 'duplicating' | 'updating' | 'deleting' | 'finding' | 'creating', value: boolean) => void;
    handleSearchChange: any;
}

export const useLink = (props: UseLinkProps): UseLinkReturnsType => {
    const { callLinks = false, search, filter, id, url, all } = props;
    const { paginate, pagination } = usePagination({ key: 'findAllLinks' });
    const [createLink, createLinkResponse] = useCreateLinkMutation();
    const [updateLink, updateLinkResponse] = useUpdateLinkMutation();
    const [deleteLink, deleteLinkResponse] = useDeleteLinkMutation();
    const [findAllLinks, { isLoading }] = useLazyFindAllLinksQuery();
    const [duplicate, duplicateLinkResponse] = useLazyDuplicateLinkQuery();
    const [getLink, getLinkResponse] = useLazyGetLinkQuery();
    const [fetchMetadata, { data: fetchMetaDataResponse, isLoading: fetchMetaLoading, error }] =
        useLazyFetchMetadataQuery();

    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [loading, setLoading] = useState({
        duplicating: false,
        updating: false,
        deleting: false,
        finding: false,
        creating: false
    });
    const [loaded, setLoaded] = useState(false); // Track initial load to prevent multiple calls

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
        all,
        ...filter
    };

    const findAllLinksResponse = useAppSelector((state) => selectFindAllLinkData(state, params));
    const handleSearchChange = debounce((newSearch) => {
        setDebouncedSearch(newSearch);
    }, 500);

    useEffect(() => {
        if (callLinks && !loaded) {
            findAllLinks({
                ...params
            });
            setLoaded(true); // Set loaded to true after the first call
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

    useEffect(() => {
        if (url) {
            fetchMetadata({
                url
            });
        }
    }, [url]);

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
        handleSearchChange,
        fetchMetadata,
        fetchMetaDataResponse,
        fetchMetaLoading
    };
};
