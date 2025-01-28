import { api } from '@shtcut/_shared/api/app.api';
import { DELETE, POST, SHTNER } from '@shtcut/_shared/constant';
import { qrCode } from '../tags';
import { QRCodeDataResponse, QrCodePayload } from '@shtcut/types/qr-code';
import { ApiResponse, QueryArgs } from '@shtcut/_shared/namespace';
import { FetchArgs } from '@reduxjs/toolkit/query';
import { Dict } from '@shtcut-ui/react';

export const qrCodeApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createQrCode: builder.mutation<any, QrCodePayload>({
            query: (payload) => {
                return {
                    url: SHTNER.qrCode,
                    method: POST,
                    body: payload
                };
            },
            invalidatesTags: [qrCode]
        }),
        findAllQrCode: builder.query<ApiResponse<QRCodeDataResponse[]>, QueryArgs>({
            query: (params: QueryArgs) =>
                ({
                    url: SHTNER.qrCode,
                    params
                }) as unknown as FetchArgs,
            providesTags: [qrCode]
        }),
        deleteLinkQrCode: builder.mutation<Dict, { payload: { id: string } }>({
            query: ({ payload }) => ({
                url: `${SHTNER.qrCode}/${payload.id}`,
                method: DELETE
            }),
            invalidatesTags: [qrCode]
        })
    })
});

export const {
    useCreateQrCodeMutation,
    useLazyFindAllQrCodeQuery,
    useDeleteLinkQrCodeMutation,
    endpoints: { createQrCode, findAllQrCode, deleteLinkQrCode }
} = qrCodeApi;
