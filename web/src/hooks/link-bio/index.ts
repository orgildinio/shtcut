'use client';

import { Dict } from '@shtcut-ui/react';
import { useState } from 'react';
import { usePagination } from '../usePagination';
import { useCreateLinkBioMutation } from '@shtcut/services/link-bios';
import { LinkBioActions, LinkBioStateType } from '@shtcut/types/link-bio';
import { LinkBioDataPayload } from '@shtcut/services/auth/auth';

interface UseTagsProps {
    id?: string;
    key?: string;
    callTags?: boolean;
    search?: string;
    filter?: Dict;
    url?: string;
    all?: boolean;
}

interface UseTagsReturnsType {
    linkBiosState: LinkBioStateType;
    linkBioActions: LinkBioActions;
}

export const useLinkBios = (props: UseTagsProps): UseTagsReturnsType => {
    const { callTags = false, search = '', filter, all } = props;
    const { pagination } = usePagination();
    const [createLinkBioTrigger, { data }] = useCreateLinkBioMutation();
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
    const createLinkBio = async (payload: LinkBioDataPayload): Promise<any> => {
        const result = await createLinkBioTrigger(payload).unwrap();
        return result;
    };
    const createLinkBioResponse = data?.data ?? undefined;

    return {
        linkBiosState: {
            isLoadingState,
            createLinkBioResponse
        },
        linkBioActions: {
            createLinkBio,
            setLoadingState
        }
    };
};
