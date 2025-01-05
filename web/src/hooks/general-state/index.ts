import { useAppSelector } from '@shtcut/redux/store';
import { generalStateSelectors, nextStep, prevStep } from '@shtcut/redux/slices/selects';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { CompanyInfo, ContactInfo } from '@shtcut/types/types';

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
    const socialMediaLinks = useAppSelector(generalStateSelectors.selectSocialLinks);
    const contactInfo: ContactInfo = (useAppSelector(generalStateSelectors.selectContactInfo) as ContactInfo) ?? {
        phoneNumber: '',
        email: '',
        websiteUrl: '',
        streetAddress: '',
        country: '',
        state: '',
        zipCode: '',
        city: ''
    };
    const companyInfo: CompanyInfo = (useAppSelector(generalStateSelectors.selectCompany) as CompanyInfo) ?? {
        department: '',
        name: ''
    };
    const fileInfo = useAppSelector(generalStateSelectors.selectFile);

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
        socialMediaLinks,
        contactInfo,
        companyInfo,
        fileInfo,
        handleNextStep,
        handlePrevStep
    };
};

export default useGeneralState;
