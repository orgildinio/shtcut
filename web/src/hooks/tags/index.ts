'use client';

import { Dict } from '@shtcut-ui/react';
import {
    useCreateTagsMutation,
    useDeleteTagsMutation,
    useLazyFindAllTagsQuery,
    useUpdateTagsMutation
} from '@shtcut/services/tags/index';
import { CreateTagPayload, TagResponse, TagsApiResponse } from '@shtcut/types/tags';
import { useEffect, useState } from 'react';
import { usePagination } from '../usePagination';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';

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
    createTags: (payload: CreateTagPayload) => Promise<TagsApiResponse>;
    updateTags: any;
    findAllTags: any;
    isLoading: boolean;
    findAllTagsResponse: TagResponse[] | undefined;
    deleteTag: MutationTrigger<any>;
    setFindAllTagsResponse: React.Dispatch<React.SetStateAction<TagResponse[] | undefined>>;
    createTagsResponse: TagsApiResponse | undefined;
    isLoadingState: boolean;
    setLoadingState: (key: 'creating' | 'deleting' | 'updating', value: boolean) => void;
    deleteTagResponse: Dict;
    updateTagsResponse: TagsApiResponse | undefined;
}

export const useTags = (props: UseTagsProps): UseTagsReturnsType => {
    const { callTags = false, search = '', filter, all } = props;
    const { paginate, pagination } = usePagination({ key: 'findAllTags' });
    const [createTagsTrigger, { data: createTagsResponse }] = useCreateTagsMutation();
    const [findAllTags, { isLoading }] = useLazyFindAllTagsQuery();
    const [deleteTag, deleteTagResponse] = useDeleteTagsMutation();
    const [updateTagsTrigger, { data: updateTagsResponse }] = useUpdateTagsMutation();
    const [findAllTagsResponse, setFindAllTagsResponse] = useState<TagResponse[] | undefined>([]);
    const [loaded, setLoaded] = useState(false);
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
        ...paginate,
        search: debouncedSearch,
        all,
        ...filter
    };
    const createTags = async (payload: CreateTagPayload): Promise<TagsApiResponse> => {
        const result = await createTagsTrigger(payload).unwrap();
        return result;
    };

    const updateTags = async (id: string, payload: Partial<CreateTagPayload>): Promise<TagsApiResponse> => {
        const result = await updateTagsTrigger({ id, payload }).unwrap();
        return result;
    };

    useEffect(() => {
        if (callTags && !loaded) {
            findAllTags({ ...params }).then((response) => {
                if (response?.data?.data) {
                    setFindAllTagsResponse(response.data.data);
                }
            });
            setLoaded(true);
        }
    }, [callTags, debouncedSearch, filter, findAllTags, params, loaded]);

    return {
        isLoading,
        findAllTagsResponse,
        setFindAllTagsResponse,
        createTags,
        updateTags,
        createTagsResponse,
        updateTagsResponse,
        isLoadingState,
        setLoadingState,
        findAllTags,
        deleteTag,
        deleteTagResponse
    };
};
