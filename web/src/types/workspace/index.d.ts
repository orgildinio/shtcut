import { Meta } from '@shtcut/_shared/namespace';
import { GeneralResponse } from '../types';

export interface InviteResponse {
    meta: Meta;
    data: InviteDataResponse;
}

interface InviteDataResponse extends GeneralResponse {
    email: string;
    workspace: string;
    token: string;
    status: 'pending' | 'accepted' | 'rejected';
    deleted: boolean;
}

interface PermissionDataResponse extends GeneralResponse {
    title: string;
    key: string;
}
interface RolesDataResponse extends GeneralResponse {
    title: string;
    description: string;
    permissions: string[];
    user: string;
    workspace: string;
    isDefault: boolean;
}
