import QRCodeCreateComponent from '@shtcut/components/ui/qr-code-components/qr-code-create';
import React, { useState } from 'react';

const QRCodeCreateContainer = () => {
    const [saveModal, setSaveModal] = useState(false);

    return <QRCodeCreateComponent saveModal={saveModal} setSaveModal={setSaveModal} />;
};

export default QRCodeCreateContainer;
