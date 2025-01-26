import useGeneralState from '@shtcut/hooks/general-state';
import useQrCodeState from '@shtcut/hooks/qrcode/index.';
import { EyeRadiusType } from '@shtcut/types/types';
import React from 'react';
import { QRCode } from 'react-qrcode-logo';
const Frame_1 = () => {
    const { presetColorString, tabParams, borderColor, urlScan } = useGeneralState();
    const { state } = useQrCodeState();
    return (
        <div className="h-full flex flex-col justify-center">
            <div className={` border-[3.2px]  w-fit rounded-[6px]`} style={{ borderColor: borderColor }}>
                <QRCode
                    id="shtcut-qrcode"
                    value={urlScan as string}
                    removeQrCodeBehindLogo={true}
                    ecLevel="L"
                    fgColor={tabParams !== 'website' ? state?.presetColor : presetColorString}
                    size={90}
                    logoWidth={30}
                    logoHeight={30}
                    logoImage={String(state?.logo)}
                    qrStyle={state?.qrStyle as 'squares' | 'dots' | 'fluid'}
                    eyeRadius={state?.eyeRadius as EyeRadiusType}
                />
            </div>
        </div>
    );
};

export default Frame_1;
