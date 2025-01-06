import { FetchArgs } from '@reduxjs/toolkit/query';
import { api } from '@shtcut/_shared/api/app.api';
import { GET, POST, PUT, SHTNER } from '@shtcut/_shared/constant';
import { linkBio } from '../tags';
import { Dict } from '@shtcut-ui/react';

import { ApiResponse } from '@shtcut/_shared/namespace';
import { LinkBioDataPayload, LinkBioResponse } from '../auth/auth';

export const linkBioApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createLinkBio: builder.mutation<ApiResponse<LinkBioResponse | undefined>, LinkBioDataPayload>({
            query: ({ payload }) => {
                return {
                    url: SHTNER.linksBio,
                    method: POST,
                    body: payload
                };
            },
            invalidatesTags: [linkBio]
        })
    })
});

export const {
    useCreateLinkBioMutation,
    endpoints: { createLinkBio }
} = linkBioApi;
