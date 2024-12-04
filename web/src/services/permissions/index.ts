import { api } from '@shtcut/_shared/api/app.api';
import { ACL, GET } from '@shtcut/_shared/constant';
import { members } from '../tags';
import { WorkspaceNameSpace } from '@shtcut/_shared/namespace/workspace';

export const permissionsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPermissions: builder.query<
            WorkspaceNameSpace.PermissionsResponse,
            { search?: string; filter?: Record<string, any> }
        >({
            query: (params) => ({
                url: ACL.permissions,
                method: GET,
                params
            }),
            providesTags: [members]
        })
    })
});

export const {
    useLazyGetPermissionsQuery,
    endpoints: { getPermissions }
} = permissionsApi;
