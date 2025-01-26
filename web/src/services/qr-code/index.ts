import { api } from '@shtcut/_shared/api/app.api';
import { POST, SHTNER } from '@shtcut/_shared/constant';
import { qrCode } from '../tags';
import { QrCodePayload } from '@shtcut/types/qr-code';

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
        })
    })
});

export const {
    useCreateQrCodeMutation,
    endpoints: { createQrCode }
} = qrCodeApi;
