import { useAppSelector } from '@shtcut/redux/store';
import { generalStateSelectors, nextStep, prevStep } from '@shtcut/redux/slices/selects';
import { useDispatch } from 'react-redux';

const useGeneralState = () => {
    const dispatch = useDispatch();
    const activeTemplate = useAppSelector(generalStateSelectors.selectSelectedTemplate);
    const activeTemplateString = activeTemplate ? String(activeTemplate) : undefined;
    const title = useAppSelector(generalStateSelectors.selectTitle);
    const profileImage = useAppSelector(generalStateSelectors.selectImage);
    const bgColor = useAppSelector(generalStateSelectors.selectBgColor);
    const description = useAppSelector(generalStateSelectors.setDescription);
    const presetColor = useAppSelector(generalStateSelectors.selectPresetColor);
    const presetColorString = presetColor ? String(presetColor) : undefined;
    const btnColor = useAppSelector(generalStateSelectors.selectBtnColor);
    const btnColorString = btnColor ? String(btnColor) : undefined;
    const step = useAppSelector(generalStateSelectors.selectStep);

    const handleNextStep = () => {
        dispatch(nextStep());
    };

    const handlePrevStep = () => {
        dispatch(prevStep());
    };

    return {
        activeTemplateString,
        title,
        profileImage,
        bgColor,
        description,
        presetColorString,
        btnColorString,
        btnColor,
        presetColor,
        step,
        handleNextStep,
        handlePrevStep
    };
};

export default useGeneralState;
