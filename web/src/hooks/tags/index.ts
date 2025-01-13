'use client';

import { Dict } from '@shtcut-ui/react';
import {
    useCreateTagsMutation,
    useDeleteTagsMutation,
    useLazyFindAllTagsQuery,
    useUpdateTagsMutation
} from '@shtcut/services/tags/index';
import { CreateTagPayload, TagResponse, TagsApiResponse, TagsApiResponseObject } from '@shtcut/types/tags';
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
    createTags: (payload: CreateTagPayload) => Promise<TagsApiResponseObject>;
    updateTags: any;
    findAllTags: any;
    isLoading: boolean;
    findAllTagsResponse: TagsApiResponse | undefined;
    deleteTag: MutationTrigger<any>;
    createTagsResponse: TagsApiResponseObject | undefined;
    isLoadingState: boolean;
    setLoadingState: (key: 'creating' | 'deleting' | 'updating', value: boolean) => void;
    deleteTagResponse: Dict;
    updateTagsResponse: TagsApiResponse | undefined;
}

export const useTags = (props: UseTagsProps): UseTagsReturnsType => {
    const { callTags = false, search = '', filter, all } = props;
    const { pagination } = usePagination();
    const [createTagsTrigger, { data: createTagsResponse }] = useCreateTagsMutation();
    const [findAllTags, { isLoading, data: findAllTagsResponse }] = useLazyFindAllTagsQuery();
    const [deleteTag, deleteTagResponse] = useDeleteTagsMutation();
    const [updateTagsTrigger, { data: updateTagsResponse }] = useUpdateTagsMutation();

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
        ...pagination,
        search: debouncedSearch,
        all,
        ...filter
    };
    const createTags = async (payload: CreateTagPayload): Promise<TagsApiResponseObject> => {
        const result = await createTagsTrigger(payload).unwrap();
        return result;
    };

    const updateTags = async (id: string, payload: Partial<CreateTagPayload>): Promise<TagsApiResponse> => {
        const result = await updateTagsTrigger({ id, payload }).unwrap();
        return result;
    };

    useEffect(() => {
        if (callTags && !loaded) {
            findAllTags({
                ...params
            });
            setLoaded(true);
        }
    }, [callTags, debouncedSearch, filter, findAllTags, loaded]);

    return {
        isLoading,
        findAllTagsResponse,
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
