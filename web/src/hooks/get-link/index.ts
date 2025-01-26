'use client';
import { useLazyGetLinkQuery } from '@shtcut/services/get-links';

interface UseTagsReturnsType {
    linkState: {
        isLoading: boolean;
        getLinkData: any;
    };
    linkActions: {
        getLink: any;
    };
}

export const useGetLink = (): UseTagsReturnsType => {
    const [getLink, { data: getLinkResponse, isLoading }] = useLazyGetLinkQuery();
    const getLinkData = getLinkResponse?.data ?? undefined;

    return {
        linkState: {
            isLoading,
            getLinkData
        },
        linkActions: {
            getLink
        }
    };
};
