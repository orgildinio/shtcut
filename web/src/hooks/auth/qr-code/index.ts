import { useEffect, useState } from 'react';
import { usePagination } from '../../usePagination';
import { UseProps } from '@shtcut/types/types';
import {
    useCreateQrCodeMutation,
    useDeleteLinkQrCodeMutation,
    useLazyFindAllQrCodeQuery
} from '@shtcut/services/qr-code';
import { QrCodeLinkActions, QrCodeLinkState } from '@shtcut/types/qr-code';

interface UseReturnsType {
    qrActions: QrCodeLinkActions;
    qrState: QrCodeLinkState;
}

export const useQrCode = (props: UseProps): UseReturnsType => {
    const { call = false, search = '', filter, all } = props;
    const { paginationActions, pagination } = usePagination();
    const [createQrCodeTrigger, { data: createQrCodeResponse }] = useCreateQrCodeMutation();
    const [findAllQrCode, { isLoading, data: findAllQrCodeResponse }] = useLazyFindAllQrCodeQuery();
    const [deleteQrCodeLink, deleteLinkResponse] = useDeleteLinkQrCodeMutation();
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState({
        creating: false,
        deleting: false,
        updating: false
    });

    const isLoadingState = Object.values(loading).some((state) => state);
    const setLoadingState = (key: keyof typeof loading, value: boolean) => {
        setLoading((prev) => ({ ...prev, [key]: value }));
    };

    const params = {
        ...pagination,
        search: debouncedSearch,
        all,
        ...filter
    };
    const createqrCode = async (payload: any): Promise<any> => {
        const result = await createQrCodeTrigger(payload).unwrap();
        return result;
    };

    useEffect(() => {
        if (call) {
            findAllQrCode({
                ...params
            });
            setLoaded(true);
        }
    }, [call, debouncedSearch, findAllQrCode, loaded, pagination]);

    return {
        qrActions: {
            createqrCode,
            setLoadingState,
            paginationActions,
            deleteQrCodeLink,
            findAllQrCode
        },
        qrState: {
            isLoadingState,
            createQrCodeResponse,
            findAllQrCodeResponse,
            isLoading,
            deleteLinkResponse,
            pagination,
            params
        }
    };
};
