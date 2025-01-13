import { FetchArgs } from '@reduxjs/toolkit/query';
import { api } from '@shtcut/_shared/api/app.api';
import { ACL, DELETE, POST } from '@shtcut/_shared/constant';
import { domainTag, linkTag } from '../tags';
import { QueryArgs } from '@shtcut/_shared/namespace';
import { CreateTagPayload, TagsApiResponse, TagsApiResponseObject } from '@shtcut/types/tags';
import { Dict } from '@shtcut-ui/react';

export const tagsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        findAllTags: builder.query<TagsApiResponse, QueryArgs>({
            query: (params: QueryArgs) =>
                ({
                    url: ACL.tags,
                    params
                }) as unknown as FetchArgs,
            providesTags: [domainTag]
        }),
        createTags: builder.mutation<TagsApiResponseObject, CreateTagPayload>({
            query: (payload) => {
                return {
                    url: ACL.tags,
                    method: POST,
                    body: payload
                };
            },
            invalidatesTags: [linkTag]
        }),
        deleteTags: builder.mutation<Dict, { payload: { id: string } }>({
            query: ({ payload }) => ({
                url: `${ACL.tags}/${payload.id}`,
                method: DELETE
            }),
            invalidatesTags: [linkTag]
        }),
        updateTags: builder.mutation<TagsApiResponse, { id: string; payload: Partial<CreateTagPayload> }>({
            query: ({ id, payload }) => ({
                url: `${ACL.tags}/${id}`,
                method: 'PUT',
                body: payload
            })
        })
    })
});

export const {
    useLazyFindAllTagsQuery,
    useCreateTagsMutation,
    useDeleteTagsMutation,
    useUpdateTagsMutation,
    endpoints: { findAllTags, createTags, deleteTags, updateTags }
} = tagsApi;
