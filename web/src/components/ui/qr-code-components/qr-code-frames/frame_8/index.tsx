import useGeneralState from '@shtcut/hooks/general-state';
import useQrCodeState from '@shtcut/hooks/qrcode/index.';
import { EyeRadiusType } from '@shtcut/types/types';
import React from 'react';
import { QRCode } from 'react-qrcode-logo';

const Frame_8 = () => {
    const { state } = useQrCodeState();
    const { presetColorString, tabParams, borderColor } = useGeneralState();

    return (
        <div className="h-full flex flex-col justify-center">
            <div className={`  border-[3.2px]   w-fit rounded-[6px]`} style={{ borderColor: borderColor }}>
                <QRCode
                    id="shtcut-qrcode"
                    value={''}
                    removeQrCodeBehindLogo={true}
                    ecLevel="L"
                    fgColor={tabParams === 'multi' ? state?.presetColor : presetColorString}
                    size={90}
                    logoWidth={30}
                    logoHeight={30}
                    logoImage={String(state?.logo)}
                    qrStyle={state?.qrStyle as 'squares' | 'dots' | 'fluid'}
                    eyeRadius={state?.eyeRadius as EyeRadiusType}
                />
            </div>
            <div className=" h-10 flex rounded-b-[3px] justify-center items-center w-full">
                <h5 className={`text-sm  uppercase`}>{state?.title ? String(state?.title) : 'SCAN ME'}</h5>
            </div>
        </div>
    );
};

export default Frame_8;
