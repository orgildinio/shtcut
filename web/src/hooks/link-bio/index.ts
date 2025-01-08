'use client';

import { Dict } from '@shtcut-ui/react';
import { useEffect, useState } from 'react';
import { usePagination } from '../usePagination';
import {
    useCreateLinkBioMutation,
    useDeleteLinkBioMutation,
    useLazyFindAllLinkBioQuery
} from '@shtcut/services/link-bios';
import { LinkBioActions, LinkBioDataPayload, LinkBioStateType, UseLinkBioProps } from '@shtcut/types/link-bio';

interface UseTagsReturnsType {
    linkBiosState: LinkBioStateType;
    linkBioActions: LinkBioActions;
}

export const useLinkBios = (props: UseLinkBioProps): UseTagsReturnsType => {
    const { callLinkbio = false, search = '', filter, all } = props;
    const { paginationActions, pagination } = usePagination();
    const [loaded, setLoaded] = useState(false);

    const [createLinkBioTrigger, { data }] = useCreateLinkBioMutation();
    const [findAllLinkBio, { isLoading: findLinkBioLoading, data: findAllLinkBioResponse }] =
        useLazyFindAllLinkBioQuery();
    const [deleteLinkBio, deleteLinkBioResponse] = useDeleteLinkBioMutation();
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [loading, setLoading] = useState({
        creating: false,
        deleting: false,
        updating: false
    });
    const isLoadingState = Object.values(loading).some((state) => state);
    const setLoadingState = (key: keyof typeof loading, value: boolean) => {
        setLoading((prev) => ({ ...prev, [key]: value }));
    };
    const params = {
        ...pagination,
        search: debouncedSearch,
        all,
        ...filter
    };

    console.log('params', params?.page);
    const createLinkBio = async (payload: LinkBioDataPayload): Promise<any> => {
        const result = await createLinkBioTrigger(payload).unwrap();
        return result;
    };
    const createLinkBioResponse = data?.data ?? undefined;
    useEffect(() => {
        if (callLinkbio) {
            findAllLinkBio({
                ...params
            });
            setLoaded(true);
        }
    }, [callLinkbio, debouncedSearch, findAllLinkBio, pagination, loaded]);

    return {
        linkBiosState: {
            isLoadingState,
            createLinkBioResponse,
            findAllLinkBioResponse,
            findLinkBioLoading,
            pagination,
            deleteLinkBioResponse,
            params
        },
        linkBioActions: {
            createLinkBio,
            setLoadingState,
            findAllLinkBio,
            paginationActions,
            deleteLinkBio
        }
    };
};
