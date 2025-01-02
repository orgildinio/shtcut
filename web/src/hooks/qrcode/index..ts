import { qrCodeSelectors } from '@shtcut/redux/slices/qr-code';
import { useAppSelector } from '@shtcut/redux/store';

const useQrCodeState = () => {
    const qrStyle = useAppSelector(qrCodeSelectors.selectQrCodeStyle);
    const logo = useAppSelector(qrCodeSelectors.selectQrCodeLogo);
    const eyeRadius = useAppSelector(qrCodeSelectors.selectEyeRadius);
    const selectedFrame = useAppSelector(qrCodeSelectors.selectSelectedFrame);
    const presetColorString = useAppSelector(qrCodeSelectors.selectPresetColor);
    const presetColor = presetColorString ? String(presetColorString) : undefined;
    const title = useAppSelector(qrCodeSelectors.selectQrCodeTitle);

    return {
        state: {
            qrStyle,
            logo,
            eyeRadius,
            selectedFrame,
            presetColor,
            title
        }
    };
};

export default useQrCodeState;
