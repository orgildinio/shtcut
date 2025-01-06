import DownloadBtn from '@shtcut/components/download-btn';
import QrCodeScan from '@shtcut/components/dashboard/qr-code-scan';
import React, { useRef } from 'react';

const QRCode = ({ uniqueName, url, id }: { uniqueName: string; url: string; id: string }) => {
    const qrCodeRef = useRef(null);

    const urlLink = `https://www.livescore.com/en/`;
    return (
        <div className="flex justify-center flex-col items-center gap-2 mt-3">
            <section ref={qrCodeRef}>
                <QrCodeScan id={id} value={url} />
            </section>
            <p className="text-sm w-5/6 mx-auto font-medium text-center">
                Share this QR code with your audience to provide access to your profile.
            </p>
            <section className="mt-4 w-full">
                <DownloadBtn qrCodeRef={qrCodeRef} value={urlLink} />
            </section>{' '}
        </div>
    );
};

export default QRCode;
