'use client';

import QrCodeComponent from '@shtcut/components/dashboard/qr-code';
import StarLoader from '@shtcut/components/loader/star-loader';
import { useLink } from '@shtcut/hooks/link';

export const QrCodeContainer = () => {
    const { findAllLinksResponse, isLoading } = useLink({
        callLinks: true,
        all: true
    });

    if (isLoading) {
        return (
            <div className="flex flex-1 h-[70vh] justify-center items-center">
                <StarLoader />
            </div>
        );
    }
    return <QrCodeComponent findAllLinksResponse={findAllLinksResponse ?? []} isLoading={isLoading} />;
};
