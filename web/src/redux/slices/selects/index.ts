import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@shtcut/redux/store';

interface GeneralState {
    title: string;
    description: string;
    image: string;
    step: number;
    template: string | undefined;
    bgColor: string;
    presetColor: string;
    btnColor: string;
}

const initialState: GeneralState = {
    title: '',
    description: '',
    image: '',
    step: 1,
    template: 'template_1',
    bgColor: '#ffffff',
    presetColor: '#0D2C7A',
    btnColor: '#ffffff'
};

const generalSelectSlice = createSlice({
    name: 'select',
    initialState,
    reducers: {
        resetState: (state) => {
            return initialState;
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
        setImage: (state, action: PayloadAction<string>) => {
            state.image = action.payload;
        },
        setStep: (state, action: PayloadAction<number>) => {
            state.step = action.payload;
        },
        nextStep: (state) => {
            state.step += 1;
        },
        prevStep: (state) => {
            state.step = Math.max(state.step - 1, 1);
        },
        setSelectedTemplate: (state, action: PayloadAction<string>) => {
            state.template = action.payload;
        },
        setBgColor: (state, action: PayloadAction<string>) => {
            state.bgColor = action.payload;
        },
        setPresetColor: (state, action: PayloadAction<string>) => {
            state.presetColor = action.payload;
        },
        setBtnColor: (state, action: PayloadAction<string>) => {
            state.btnColor = action.payload;
        }
    }
});

export const {
    setTitle,
    setDescription,
    setStep,
    nextStep,
    prevStep,
    resetState,
    setImage,
    setSelectedTemplate,
    setBgColor,
    setPresetColor,
    setBtnColor
} = generalSelectSlice.actions;

export default generalSelectSlice.reducer;
const createSelector =
    <T>(key: keyof GeneralState) =>
    (state: RootState) =>
        state.generalStateReduce[key];

export const generalStateSelectors = {
    selectTitle: createSelector('title'),
    setDescription: createSelector('description'),
    selectStep: createSelector('step'),
    selectImage: createSelector('image'),
    selectSelectedTemplate: createSelector('template'),
    selectBgColor: createSelector('bgColor'),
    selectPresetColor: createSelector<string>('presetColor'),
    selectBtnColor: createSelector<string>('btnColor')
};
