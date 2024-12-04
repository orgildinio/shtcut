'use client';

import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { Dict } from '@shtcut-ui/react';
import { Pagination } from '@shtcut/_shared/namespace';
import { usePagination } from '../usePagination';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

import {
    useCreateRolesMutation,
    useUpdateRolesMutation,
    useDeleteRolesMutation,
    useLazyFindRolesQuery,
    useLazyGetRolesQuery
} from '@shtcut/services/roles';
import { WorkspaceNameSpace } from '@shtcut/_shared/namespace/workspace';

interface UseRoleProps {
    id?: string;
    callRoles?: boolean;
    search?: string;
    filter?: Dict;
}

interface UseRoleReturnsType {
    createRole: MutationTrigger<any>;
    updateRole: MutationTrigger<any>;
    deleteRole: MutationTrigger<any>;
    findRoles: any;
    getRole: any;
    isLoading: boolean;
    handleDeleteRole: (id: string) => void;
    findRolesResponse: WorkspaceNameSpace.RolesResponse | undefined;
    createRoleResponse: Dict;
    updateRoleResponse: Dict;
    deleteRoleResponse: Dict;
    getRoleResponse: Dict;
    pagination: Pagination;
    isLoadingState: boolean;

    setLoadingState: (key: 'creating' | 'updating' | 'deleting' | 'finding', value: boolean) => void;
    handleSearchChange: any;
}

export const useRole = (props: UseRoleProps): UseRoleReturnsType => {
    const { callRoles = false, search, filter, id } = props;
    const { paginate, pagination } = usePagination({ key: 'findRoles' });
    const [createRole, createRoleResponse] = useCreateRolesMutation();
    const [updateRole, updateRoleResponse] = useUpdateRolesMutation();
    const [deleteRole, deleteRoleResponse] = useDeleteRolesMutation();
    const [findRoles, { isLoading, data: findRolesResponse }] = useLazyFindRolesQuery();
    const [getRole, { data: getRoleResponse }] = useLazyGetRolesQuery();

    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [loading, setLoading] = useState({
        creating: false,
        updating: false,
        deleting: false,
        finding: false
    });
    const [loaded, setLoaded] = useState(false);

    const isLoadingState = Object.values(loading).some((state) => state);
    const setLoadingState = (key: keyof typeof loading, value: boolean) => {
        setLoading((prev) => ({ ...prev, [key]: value }));
    };

    const params = {
        ...paginate,
        search: debouncedSearch,
        ...filter
    };

    const handleSearchChange = debounce((newSearch) => {
        setDebouncedSearch(newSearch);
    }, 500);

    useEffect(() => {
        if (callRoles && !loaded) {
            findRoles({
                ...params
            });
            setLoaded(true);
        }
    }, [callRoles, debouncedSearch, filter, findRoles, loaded]);

    useEffect(() => {
        if (id) {
            getRole({
                id
            });
        }
    }, [id]);

    const handleDeleteRole = (id: string) => {
        deleteRole({ id });
    };

    return {
        isLoading,
        createRole,
        updateRole,
        deleteRole,
        findRoles,
        getRole,
        findRolesResponse,
        createRoleResponse,
        updateRoleResponse,
        deleteRoleResponse,
        getRoleResponse,
        pagination,
        handleDeleteRole,
        isLoadingState,
        setLoadingState,
        handleSearchChange
    };
};
