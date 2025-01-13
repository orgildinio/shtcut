import { FetchArgs } from '@reduxjs/toolkit/query';
import { api } from '@shtcut/_shared/api/app.api';
import { DELETE, GET, POST, PUT, SHTNER } from '@shtcut/_shared/constant';
import { linkBio } from '../tags';
import { Dict } from '@shtcut-ui/react';

import { ApiResponse, QueryArgs } from '@shtcut/_shared/namespace';
import { LinkBioDataPayload, LinkBioDataResponse, LinkBioApiResponse } from '@shtcut/types/link-bio';

export const linkBioApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createLinkBio: builder.mutation<ApiResponse<LinkBioDataResponse | undefined>, LinkBioDataPayload>({
            query: ({ payload }) => {
                return {
                    url: SHTNER.linksBio,
                    method: POST,
                    body: payload
                };
            },
            invalidatesTags: [linkBio]
        }),
        findAllLinkBio: builder.query<LinkBioApiResponse, QueryArgs>({
            query: (params: QueryArgs) =>
                ({
                    url: SHTNER.linksBio,
                    params
                }) as unknown as FetchArgs,
            providesTags: [linkBio]
        }),
        getLinkBio: builder.query<ApiResponse<LinkBioDataResponse | undefined>, QueryArgs & { slug: string }>({
            query: ({ slug }: QueryArgs & { slug: string }) => ({
                url: `${SHTNER.linksBio}/search/one?slug=${slug}`
            }),
            providesTags: [linkBio]
        }),

        deleteLinkBio: builder.mutation<Dict, { payload: { id: string } }>({
            query: ({ payload }) => ({
                url: `${SHTNER.linksBio}/${payload.id}`,
                method: DELETE
            }),
            invalidatesTags: [linkBio]
        })
    })
});

export const {
    useCreateLinkBioMutation,
    useLazyFindAllLinkBioQuery,
    useDeleteLinkBioMutation,
    useLazyGetLinkBioQuery,
    endpoints: { createLinkBio, findAllLinkBio, deleteLinkBio, getLinkBio }
} = linkBioApi;
