import React from 'react';
import { QRCode } from 'react-qrcode-logo';

const QrCodeScan = ({ id, value }: { id: string; value: string }) => {
    return (
        <>
            <QRCode id={id} value={value} size={90} qrStyle={'squares'} />
        </>
    );
};

export default QrCodeScan;
