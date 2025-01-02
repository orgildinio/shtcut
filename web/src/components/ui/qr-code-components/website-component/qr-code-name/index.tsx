import { Input } from '@shtcut-ui/react';
import useQrCodeState from '@shtcut/hooks/qrcode/index.';
import { setQrTitle } from '@shtcut/redux/slices/qr-code';
import React from 'react';
import { useDispatch } from 'react-redux';

const QrCodeName = () => {
    const { state } = useQrCodeState();
    const dispatch = useDispatch();
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setQrTitle(event.target.value));
    };
    return (
        <div className="bg-white p-[23px] rounded-[10px]">
            <p className="font-medium text-sm">Name QR Code</p>
            <p className="text-xs text-[#433E3]">Enter a name for this code</p>
            <div className="mt-[18px]">
                <Input
                    className=""
                    placeholder="QR Code"
                    value={state?.title as string}
                    onChange={handleInputChange}
                    maxLength={9}
                />
            </div>
        </div>
    );
};

export default QrCodeName;
