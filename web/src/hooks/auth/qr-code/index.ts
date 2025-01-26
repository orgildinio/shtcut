import { useState } from 'react';
import { usePagination } from '../../usePagination';
import { UseProps } from '@shtcut/types/types';
import { useCreateQrCodeMutation } from '@shtcut/services/qr-code';

interface UseReturnsType {
    qrActions: {
        createqrCode: (payload: any) => Promise<any>;
        setLoadingState: (key: 'creating' | 'deleting' | 'updating', value: boolean) => void;
    };
    qrState: {
        isLoadingState: boolean;
        createQrCodeResponse: any;
    };
}

export const useQrCode = (props: UseProps): UseReturnsType => {
    const { call = false, search = '', filter, all } = props;
    const { pagination } = usePagination();
    const [createQrCodeTrigger, { data: createQrCodeResponse }] = useCreateQrCodeMutation();

    const [loaded, setLoaded] = useState(false);
    const [debouncedSearch, setDebouncedSearch] = useState(search);
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

    return {
        qrActions: {
            createqrCode,
            setLoadingState
        },
        qrState: {
            isLoadingState,
            createQrCodeResponse
        }
    };
};
