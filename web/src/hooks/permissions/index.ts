/* eslint-disable react-hooks/exhaustive-deps */

import { LazyQueryTrigger, MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { WorkspaceNameSpace } from '@shtcut/_shared/namespace/workspace';
import { useLazyGetPermissionsQuery } from '@shtcut/services/permissions';
import { useEffect } from 'react';

interface UsePermissionProps {
    callPermissions?: boolean;
    search?: string;
    filter?: Record<string, any>;
}

interface UsePermissionReturnsType {
    getPermissions: LazyQueryTrigger<any>;
    isLoading: boolean;
    permissionsData: WorkspaceNameSpace.PermissionsResponse | undefined;
}

export const usePermission = (props: UsePermissionProps): UsePermissionReturnsType => {
    const { callPermissions = false, search, filter } = props;
    const [getPermissions, { data: permissionsData, isLoading }] = useLazyGetPermissionsQuery();

    const params = {
        search,
        ...filter
    };

    useEffect(() => {
        if (callPermissions) {
            getPermissions(params);
        }
    }, [callPermissions]);

    return {
        isLoading,
        permissionsData,
        getPermissions
    };
};
