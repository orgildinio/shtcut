import { Dict } from '@shtcut-ui/react';
import { AppObject, QueryArgs } from '../index';
import { UserNamespace } from '../user';

export namespace LinkNameSpace {
    export interface Link extends AppObject {
        utmParams?: {
            source?: string;
            medium?: string;
            campaign?: string;
            term?: string;
            content?: string;
        };
        devices?: {
            android?: string;
            ios?: string;
        };
        publicId: string;
        alias: string;
        target: string;
        user?: string | UserNamespace.LoggedInUser;
        workspace: string;
        domain: { slug: string; name: string; _id: string };
        enableTracking?: boolean;
        title?: string;
        label?: [];
        geo?: Dict;
        proxy?: boolean;
        isPrivate?: boolean;
        clicks: number;
        archived?: boolean;
        qrCode?: string | Dict;
        expiryDate?: string;
    }

    export interface LinkRequest extends ApiRequest {
        params?: QueryArgs;
        payload?: {
            _id?: string;
            id?: string;
            title?: string;
            target: string;
            workspace: string;
            domain: string;
            password?: string;
            enableTracking?: boolean;
            expiryDate?: string | Date;
            devices?: {
                android?: string;
                ios?: string;
            };
            geo?: Dict;
            utmParams?: {
                source?: string;
                medium?: string;
                campaign?: string;
                term?: string;
                content?: string;
            };
        };
    }
}

export interface LinkComponentType {
    findAllLinksResponse: LinkNameSpace.Link[] | undefined;
    deleteLink: MutationTrigger<any>;
    createLink: MutationTrigger<any>;
    isLoading: boolean;
    deleteLinkResponse: Dict;
    setLoadingState: (key: 'duplicating' | 'updating' | 'deleting' | 'finding' | 'fetching', value: boolean) => void;
    isLoadingState: boolean;
    createLinkResponse: Dict;
    search: string;
    onSearchChange: (value: string) => void;
}

export interface SearchType {
    search: string;
    onSearchChange: (value: string) => void;
}
