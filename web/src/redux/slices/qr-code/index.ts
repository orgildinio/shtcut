// store/qrCodeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@shtcut/redux/store';
import { EyeRadiusType, QrCodeShape } from '@shtcut/types/types';

interface QrCodeState {
    qrCodeLogo?: string;
    selectedFrame: number;
    qrStyle: QrCodeShape;
    eyeRadius: EyeRadiusType;
    image: string;
    description: string;
    qrCodePresetColor: string;
    qrTitle: string;
}

const initialState: QrCodeState = {
    qrCodeLogo: undefined,
    selectedFrame: 1,
    qrStyle: 'squares',
    image: '',
    description: '',
    qrCodePresetColor: '#0D2C7A',
    eyeRadius: [
        { outer: 8, inner: 4 },
        { outer: 8, inner: 4 },
        { outer: 8, inner: 4 }
    ],
    qrTitle: ''
};

const qrCodeSlice = createSlice({
    name: 'qrCode',
    initialState,
    reducers: {
        resetState: (state) => {
            return initialState;
        },

        setDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
        setQrCodeLogo: (state, action: PayloadAction<string | undefined>) => {
            state.qrCodeLogo = action.payload;
        },
        setSelectedFrame: (state, action: PayloadAction<number>) => {
            state.selectedFrame = action.payload;
        },
        selectQrCodeStyle: (state, action: PayloadAction<QrCodeShape>) => {
            state.qrStyle = action.payload;
        },
        setImage: (state, action: PayloadAction<string>) => {
            state.image = action.payload;
        },

        setEyeRadius: (state, action: PayloadAction<EyeRadiusType>) => {
            state.eyeRadius = action.payload;
        },
        setQrCodePresetColor: (state, action: PayloadAction<string>) => {
            state.qrCodePresetColor = action.payload;
        },
        setQrTitle: (state, action: PayloadAction<string>) => {
            state.qrTitle = action.payload;
        }
    }
});

export const {
    setDescription,
    setQrCodeLogo,
    setSelectedFrame,
    selectQrCodeStyle,
    setEyeRadius,
    resetState,
    setImage,
    setQrCodePresetColor,
    setQrTitle
} = qrCodeSlice.actions;

export default qrCodeSlice.reducer;
const createSelector =
    <T>(key: keyof QrCodeState) =>
    (state: RootState) =>
        state.qrCode[key];

export const qrCodeSelectors = {
    selectQrCodeTitle: createSelector('qrTitle'),
    setDescription: createSelector('description'),
    selectQrCodeLogo: createSelector('qrCodeLogo'),
    selectSelectedFrame: createSelector('selectedFrame'),
    selectQrCodeStyle: createSelector('qrStyle'),
    selectEyeRadius: createSelector('eyeRadius'),
    selectImage: createSelector('image'),
    selectPresetColor: createSelector<string>('qrCodePresetColor')
};
