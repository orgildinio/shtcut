import React, { useState } from 'react';
import QrCodeCardHeader from '../../../dashboard/link-header';
import { useDispatch } from 'react-redux';
import { setImage } from '@shtcut/redux/slices/qr-code';
import Stepper from '@shtcut/components/stepper/horizontal-stepper';
import ActionQrCodeTab from '../website-component/actions-tab';
import QrCodeName from '../website-component/qr-code-name';
import PdfCardComponent from './pdf-upload-review';
import useGeneralState from '@shtcut/hooks/general-state';
import { setTitle } from '@shtcut/redux/slices/selects';
import { linksTab } from '@shtcut/_shared/data';

const PdfQrCodeComponent = ({ step }: { step: number }) => {
    const { title } = useGeneralState();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const dispatch = useDispatch();
    const [showSections, setShowSections] = useState({
        header: true,
        pdf: true,
        socialNetworks: true
    });
    const toggleSection = (section: keyof typeof showSections) => {
        setShowSections((prev) => ({
            ...prev,
            [section]: !prev[section]
        }));
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setTitle(event.target.value));
    };
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            dispatch(setImage(imageUrl));
        }
    };
    return (
        <div>
            <section className="w-full h-24  bg-white rounded-[10px] shadow-sm border border-gray-100 ">
                <Stepper step={step} />
            </section>
            {step === 1 && (
                <section>
                    <QrCodeCardHeader
                        label="Header"
                        description="Enter Title and description"
                        isVisible={showSections.header}
                        toggleVisibility={() => toggleSection('header')}
                        titleValue={title as string}
                        descriptionValue={''}
                        handleTitleChange={handleInputChange}
                        handleDescriptionChange={() => {}}
                        selectedImage={selectedImage}
                        handleImageChange={handleImageChange}
                    />
                    <PdfCardComponent toggleVisibility={() => toggleSection('pdf')} isVisible={showSections.pdf} />
                </section>
            )}

            {step === 2 && <ActionQrCodeTab initialTabs={linksTab} />}
            {step === 3 && (
                <section className=" mt-4 shadow-sm border border-gray-100  rounded-[10px] gap-2">
                    <QrCodeName />
                </section>
            )}
        </div>
    );
};

export default PdfQrCodeComponent;
