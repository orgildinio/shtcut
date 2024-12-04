import { api } from '@shtcut/_shared/api/app.api';
import { ACL, GET, POST, DELETE, PUT } from '@shtcut/_shared/constant';
import { WorkspaceNameSpace } from '@shtcut/_shared/namespace/workspace';
import { role } from '..';
import { FetchArgs } from '@reduxjs/toolkit/query';
import { QueryArgs } from '@shtcut/_shared/namespace';

export const rolesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createRoles: builder.mutation<WorkspaceNameSpace.RolesResponse, WorkspaceNameSpace.RolesPayload>({
            query: (payload) => ({
                url: ACL.roles,
                method: POST,
                body: payload
            }),
            invalidatesTags: [role]
        }),

        findRoles: builder.query<WorkspaceNameSpace.RolesResponse, QueryArgs>({
            query: (params: QueryArgs) =>
                ({
                    url: ACL.roles,
                    params
                }) as unknown as FetchArgs,
            providesTags: [role]
        }),

        getRoles: builder.query<any, Record<string, any>>({
            query: (params: Record<string, string>) =>
                ({
                    url: `${ACL.roles}/${params?.id}`,
                    params
                }) as unknown as FetchArgs,
            providesTags: [role]
        }),

        updateRoles: builder.mutation<any, { id: string; payload: WorkspaceNameSpace.RolesPayload }>({
            query: ({ id, payload }) => ({
                url: `${ACL.roles}/${id}`,
                method: PUT,
                body: payload
            }),
            invalidatesTags: [role]
        }),

        // Delete Role
        deleteRoles: builder.mutation<any, { id: string }>({
            query: ({ id }) => ({
                url: `${ACL.roles}/${id}`,
                method: DELETE
            }),
            invalidatesTags: [role]
        })
    })
});

// Export hooks
export const {
    useCreateRolesMutation,
    useLazyFindRolesQuery,
    useLazyGetRolesQuery,
    useUpdateRolesMutation,
    useDeleteRolesMutation,
    endpoints: { createRoles, findRoles, getRoles, updateRoles, deleteRoles }
} = rolesApi;
