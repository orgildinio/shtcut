import { api } from '@shtcut/_shared/api/app.api';
import { SHTNER } from '@shtcut/_shared/constant';

import { ApiResponse, QueryArgs } from '@shtcut/_shared/namespace';

export const getLinkDataApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getLink: builder.query<ApiResponse<any | undefined>, QueryArgs & { slug: string }>({
            query: ({ slug }: QueryArgs & { slug: string }) => ({
                url: `${SHTNER.linksBio}/search/one?slug=${slug}`
            }),
            providesTags: ['links']
        })
    })
});

export const {
    useLazyGetLinkQuery,
    endpoints: { getLink }
} = getLinkDataApi;
