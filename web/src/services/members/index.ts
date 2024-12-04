import { api } from '@shtcut/_shared/api/app.api';
import { ACL, POST } from '@shtcut/_shared/constant';
import { members } from '../tags';
import { WorkspaceNameSpace } from '@shtcut/_shared/namespace/workspace';
import { InviteResponse } from '@shtcut/types/workspace';

export const memberInviteApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createInvite: builder.mutation<InviteResponse, WorkspaceNameSpace.InvitePayload>({
            query: (payload) => {
                return {
                    url: ACL.invitation,
                    method: POST,
                    body: payload
                };
            },
            invalidatesTags: [members]
        })
    })
});

export const {
    useCreateInviteMutation,
    endpoints: { createInvite }
} = memberInviteApi;
