import { LinkBioDataResponse } from '@shtcut/services/auth/auth';

export interface LinkBioStateType {
    isLoadingState: boolean;
    createLinkBioResponse: LinkBioResponse | undefined;
}
export interface LinkBioActions {
    createLinkBio: (payload: LinkBioDataPayload) => Promise<any>;
    setLoadingState: (key: 'creating' | 'deleting' | 'updating', value: boolean) => void;
}
