'use client';

import QrCodeComponent from '@shtcut/components/ui/shorten-er/qr-code-component';
import { useQrCode } from '@shtcut/hooks/auth/qr-code';

export const QrCodeContainer = () => {
    const { qrState, qrActions } = useQrCode({
        call: true,
        filter: {
            isSlugAvailable: true
        }
    });
    return <QrCodeComponent qrState={qrState} qrActions={qrActions} />;
};
