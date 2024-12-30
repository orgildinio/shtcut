import React from 'react';
import { useSelector } from 'react-redux';
import MultiLinkStep1 from '../../ui/qr-code-components/multi-link-components/multi-link-step1';
import PdfFrameComponent from '../../ui/qr-code-components/pdf-qr-code/pdf-frame-step-1';
import FrameComponents from '../../ui/qr-code-components/frames-component';
import { generalStateSelectors } from '@shtcut/redux/slices/selects';
import GeneralTemplate from '../../ui/qr-code-components/vcard-component/general-template';

interface ComponentType {
    switchTab?: string;
    linksBio?: LinkBioDataType[];
}

const PreviewPhone = ({ switchTab, linksBio }: ComponentType) => {
    const step = useSelector(generalStateSelectors.selectStep);

    return (
        <div className="border w-[250px] h-[550px] border-[#A6A6A4] p-[1px] mt-6  mx-auto rounded-[37px]">
            <div
                className={`flex  border-4 relative border-black flex-col   w-full h-full justify-center  items-center rounded-[37px] `}
            >
                <div className="bg-black absolute top-0 w-12 h-4 flex justify-end items-center px-2 mt-2 rounded-full">
                    <div className="w-1 h-1 bg-slate-500 rounded-full" />
                </div>

                <div className="flex-1 w-full h-full">
                    {/* Website Tab */}
                    {switchTab === 'website' && (
                        <div className="p-4 w-full h-full flex justify-center items-center">
                            <FrameComponents />
                        </div>
                    )}

                    {/* Multi Tab */}
                    {switchTab === 'multi' && (
                        <div className={`w-full ${step === 1 ? 'p-4' : ''}`}>
                            {step === 1 && <MultiLinkStep1 />}
                            {typeof step === 'number' && step > 1 && <FrameComponents />}
                        </div>
                    )}

                    {/* PDF Tab */}
                    {switchTab === 'pdf' && (
                        <div className={`w-full ${step === 1 ? 'p-4' : ''}`}>
                            {step === 1 && <PdfFrameComponent />}
                            {typeof step === 'number' && step > 1 && <FrameComponents />}
                        </div>
                    )}

                    {/* VCard Tab */}
                    {switchTab === 'vCard' && (
                        <div className="w-full h-full">
                            {step === 1 && <GeneralTemplate />}
                            {typeof step === 'number' && step > 1 && <FrameComponents />}
                        </div>
                    )}

                    {/* Edit Link Tab */}
                    {switchTab === 'edit-link' && (
                        <div className="w-full h-full">
                            {/* {step === 1 && <LinkBioFrameComponent linksBio={linksBio ?? []} />} */}
                            <GeneralTemplate linksBio={linksBio ?? []} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PreviewPhone;
