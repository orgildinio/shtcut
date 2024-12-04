import { GeneralResponse } from '@shtcut/types/types';
import { AppObject, Meta } from '../index';
import { UserNamespace } from '../user';
import { PermissionDataResponse } from '@shtcut/types/workspace';

export namespace WorkspaceNameSpace {
    export interface Workspace extends AppObject {
        _id: string;
        publicId: string;
        user: string | UserNamespace.LoggedInUser;
        isDefault: boolean;
        name: string;
        slug: string;
        modules: string[];
        type: string;
        domains: string[];
        subscriptions: string[];
        logo: string;
        members: string[];
    }

    interface RolesResponse {
        meta: Meta;
        data: RolesDataResponse[];
    }

    interface InvitePayload {
        emails: string[];
        workspace: string;
        redirectLink: string;
    }

    interface RolesPayload {
        title: string;
        description?: string;
        workspace?: string;
        permissions?: string[];
    }

    interface PermissionsResponse {
        meta: Meta;
        data: PermissionDataResponse[];
    }

    export interface WorkspaceRequest extends ApiRequest {
        payload?: {
            _id?: string;
            id?: string;
            name: string;
            slug: string;
            type?: string;
            plan: string;
            module: string;
        };
    }
}
