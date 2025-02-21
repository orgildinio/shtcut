import { api } from '@shtcut/_shared/api/app.api';
import { POST, SHTNER } from '@shtcut/_shared/constant';
import { media } from '../tags';

export const mediaApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createMedia: builder.mutation<any, any>({
            query: ({ payload }) => {
                return {
                    url: `${SHTNER.media}/media`,
                    method: POST,
                    body: payload
                };
            },
            invalidatesTags: [media]
        })
    })
});

export const {
    useCreateMediaMutation,
    endpoints: { createMedia }
} = mediaApi;
