'use client';

import { Button, Card } from '@shtcut-ui/react';
import Stepper from '@shtcut/components/stepper/horizontal-stepper';
import LinksSection from '@shtcut/components/ui/qr-code-components/multi-link-components/link-sections';
import QrCodeCardHeader from '@shtcut/components/ui/qr-code-components/qr-code-component/qr-code-tab-header';
import QrCodePreviewPhones from '@shtcut/components/ui/qr-code-components/qr-code-create/qr-code-phones';
import ColorsQrCode from '@shtcut/components/ui/qr-code-components/website-component/actions-tab/colors-component';
import QrCodeName from '@shtcut/components/ui/qr-code-components/website-component/qr-code-name';
import {
    nextStep,
    prevStep,
    qrCodeSelectors,
    setDescription,
    setImage,
    setQrCodeName
} from '@shtcut/redux/slices/qr-code';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CreateLinkBioComponent = () => {
    const qrCodeName = useSelector(qrCodeSelectors.selectQrCodeName);
    const descriptionValue = useSelector(qrCodeSelectors.setDescription);
    const [linksBio, setLinksBios] = useState<LinkBioDataType[]>([{ id: 1, title: '', url: '', image: null }]);

    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const step = useSelector(qrCodeSelectors.selectStep);
    const [showSections, setShowSections] = useState<Record<number, boolean>>({
        1: true // Default to showing the first section
    });

    console.log('linksBio', linksBio);

    const handleNextStep = () => {
        dispatch(nextStep());
    };

    const handlePrevStep = () => {
        dispatch(prevStep());
    };

    const handleSave = () => {
        const qrCodeData = {
            step
        };
    };

    const toggleSection = (id: number) => {
        setShowSections((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            dispatch(setImage(imageUrl));
        }
    };

    const addLinkSection = () => {
        const newId = linksBio.length + 1;
        setLinksBios((prevLinks) => [...prevLinks, { id: newId, title: '', url: '', image: null }]);
        setShowSections((prev) => ({ ...prev, [newId]: true }));
    };

    const removeLinkSection = (id: number) => {
        setLinksBios((prevLinks) => prevLinks.filter((link) => link.id !== id));
        setShowSections((prev) => {
            const { [id]: _, ...rest } = prev;
            return rest;
        });
    };

    const updateLink = (id, field, value) => {
        setLinksBios((prevLinks) => prevLinks.map((link) => (link.id === id ? { ...link, [field]: value } : link)));
    };

    const handleLinkImageChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setLinksBios((prevLinks) =>
                prevLinks.map((link) => (link.id === id ? { ...link, image: imageUrl } : link))
            );
        }
    };

    return (
        <section>
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-[#2B2829] text-xl">Edit Link-in-bio</h1>
                <div className="flex items-center gap-x-3">
                    {Number(step) > 1 && (
                        <Button
                            onClick={handlePrevStep}
                            className="flex justify-center w-28 items-center h-8 text-xs rounded gap-x-2"
                            variant={'outline'}
                        >
                            Back
                        </Button>
                    )}

                    <Button
                        onClick={() => {
                            if (step && Number(step) > 2) {
                                handleSave();
                            } else if (handleNextStep) {
                                handleNextStep();
                            }
                        }}
                        className="bg-primary-0 flex justify-center w-28 h-8 text-xs rounded items-center gap-x-2"
                    >
                        {step && Number(step) > 2 ? 'Save Update' : ' Next'}
                    </Button>
                </div>
            </div>
            <section className="flex mt-[22px] gap-7">
                <section className="w-[90%]">
                    <section className="w-full h-[90px] bg-white rounded-[10px] shadow-sm border border-gray-100">
                        <Stepper step={step} />
                    </section>
                    {step === 1 && (
                        <section>
                            <QrCodeCardHeader
                                label="Title"
                                description="Enter Title and description"
                                isVisible={showSections[0]}
                                toggleVisibility={() => toggleSection(0)}
                                titleValue={qrCodeName as string}
                                descriptionValue={descriptionValue as string}
                                handleTitleChange={(e) => dispatch(setQrCodeName(e.target.value))}
                                handleDescriptionChange={(e) => dispatch(setDescription(e.target.value))}
                                selectedImage={selectedImage}
                                handleImageChange={handleImageChange}
                            />
                            {linksBio.map((link, index) => (
                                <LinksSection
                                    key={link.id}
                                    index={index}
                                    isVisible={showSections[link.id]}
                                    toggleVisibility={() => toggleSection(link.id)}
                                    linkImage={link.image}
                                    handleImageChange={(e) => handleLinkImageChange(link.id, e)}
                                    onUpdateLink={(field, value) => updateLink(link.id, field, value)}
                                    onRemove={() => removeLinkSection(link.id)}
                                    addLinkSection={addLinkSection}
                                />
                            ))}
                        </section>
                    )}
                    {step === 2 && (
                        <Card className="shadow-sm mt-8 py-4 px-6 border border-gray-100">
                            <ColorsQrCode />
                        </Card>
                    )}
                    {step === 3 && (
                        <section className="mt-4 shadow-sm border border-gray-100 rounded-[10px] gap-2">
                            <QrCodeName />
                        </section>
                    )}
                </section>
                <div className="bg-white sticky top-0 shadow-sm border border-gray-100 rounded-[10px] h-[640px] p-[23px]">
                    <h2 className="font-semibold">Preview</h2>
                    <QrCodePreviewPhones switchTab="edit-link" linksBio={linksBio} />
                </div>
            </section>
        </section>
    );
};

export default CreateLinkBioComponent;
