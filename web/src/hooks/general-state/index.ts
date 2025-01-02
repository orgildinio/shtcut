import { useAppSelector } from '@shtcut/redux/store';
import { generalStateSelectors, nextStep, prevStep } from '@shtcut/redux/slices/selects';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';

const useGeneralState = () => {
    const getParams = useSearchParams();
    const tabParams = getParams.get('tabs');
    const dispatch = useDispatch();
    const activeTemplate = useAppSelector(generalStateSelectors.selectSelectedTemplate);
    const activeTemplateString = activeTemplate ? String(activeTemplate) : undefined;
    const title = useAppSelector(generalStateSelectors.selectTitle);
    const profileImageString = useAppSelector(generalStateSelectors.selectImage);
    const profileImage = profileImageString ? String(profileImageString) : undefined;
    const bgColorString = useAppSelector(generalStateSelectors.selectBgColor);
    const selectedTab = useAppSelector(generalStateSelectors.setSelectedTab);
    const bgColor = bgColorString ? String(bgColorString) : undefined;
    const description = useAppSelector(generalStateSelectors.setDescription);
    const presetColor = useAppSelector(generalStateSelectors.selectPresetColor);
    const presetColorString = presetColor ? String(presetColor) : undefined;
    const btnColor = useAppSelector(generalStateSelectors.selectBtnColor);
    const borderColorString = useAppSelector(generalStateSelectors.setBorderColor);
    const borderColor = borderColorString ? String(borderColorString) : undefined;
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
        selectedTab,
        tabParams,
        borderColor,
        handleNextStep,
        handlePrevStep
    };
};

export default useGeneralState;
