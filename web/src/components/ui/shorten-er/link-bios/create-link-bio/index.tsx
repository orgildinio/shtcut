'use client';

import { Button, Card, Input, Modal } from '@shtcut-ui/react';
import Tabs from '@shtcut/components/_shared/Tabs';
import Stepper from '@shtcut/components/stepper/horizontal-stepper';
import LinksSection from '@shtcut/components/ui/qr-code-components/multi-link-components/link-sections';
import QrCodeCardHeader from '@shtcut/components/ui/qr-code-components/qr-code-component/qr-code-tab-header';

import ColorsQrCode from '@shtcut/components/ui/qr-code-components/website-component/actions-tab/colors-component';
import useGeneralState from '@shtcut/hooks/general-state';
import { setDescription, setImage, setTitle } from '@shtcut/redux/slices/selects';
import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import UrlLink from '../components/url-link';
import QRCode from '../components/qr-code';
import { LoadingButton } from '@shtcut/components/_shared/loading-button';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import PreviewPhone from '@shtcut/components/dashboard/preview-phone';

const CreateLinkBioComponent = () => {
    const router = useRouter();
    const [linksBio, setLinksBios] = useState<LinkBioDataType[]>([{ id: 1, title: '', url: '', image: null }]);
    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showInputModal, setShowInputModal] = useState(true);
    const [showSections, setShowSections] = useState<Record<number, boolean>>({
        1: true
    });
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const {
        title,
        description,
        activeTemplateString,
        profileImage,
        step,
        bgColor,
        btnColor,
        presetColor,
        handleNextStep,
        handlePrevStep
    } = useGeneralState();
    const {
        register,
        handleSubmit: onSubmit,
        formState: { errors, isValid },
        setValue,
        reset,
        watch
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            uniqueName: ''
        }
    });
    const uniqueNameValue = watch('uniqueName');

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

    const handleTabClick = (index: number) => {
        setSelectedTabIndex(index);
    };

    const payload = {
        uniqueName: uniqueNameValue,
        colors: {
            presetColor,
            btnColor,
            bgColor
        },
        title,
        description,
        profileImage: profileImage,
        links: linksBio,
        template: activeTemplateString
    };

    const handleSubmit = () => {
        console.log('payload', payload);
        setShowModal(true);
    };
    const onSubmitTitle = (data: { uniqueName: string }) => {
        console.log('Title:', data.uniqueName);
        setShowInputModal(false);
    };

    const tabs = [
        { id: 'url', label: 'URL' },
        { id: 'qr-code', label: 'QR Code' }
    ];

    return (
        <section>
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-[#2B2829] text-xl">Create Link</h1>
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
                            if (step && Number(step) === 2) {
                                handleSubmit();
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
                        <Stepper step={Number(step)} />
                    </section>
                    {step === 1 && (
                        <section>
                            <QrCodeCardHeader
                                label="Title"
                                description="Enter Title and description"
                                isVisible={showSections[0]}
                                toggleVisibility={() => toggleSection(0)}
                                titleValue={title as string}
                                descriptionValue={description as string}
                                handleTitleChange={(e) => dispatch(setTitle(e.target.value))}
                                handleDescriptionChange={(e) => dispatch(setDescription(e.target.value))}
                                selectedImage={selectedImage}
                                handleImageChange={handleImageChange}
                            />
                            {linksBio.map((link, index) => (
                                <LinksSection
                                    key={link.id}
                                    index={index + 1}
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
                    {(step === 2 || step === 3) && (
                        <Card className="shadow-sm mt-8 py-4 px-6 border border-gray-100">
                            <ColorsQrCode />
                        </Card>
                    )}
                </section>
                <div className="bg-white sticky top-0 shadow-sm border border-gray-100 rounded-[10px] h-[640px] p-[23px]">
                    <h2 className="font-semibold">Preview</h2>
                    <PreviewPhone switchTab="edit-link" linksBio={linksBio} />
                </div>
            </section>
            <Modal showModel={showModal} setShowModal={setShowModal} onClose={() => setShowModal(false)}>
                <section className="">
                    <section className="flex p-4 border-b items-center justify-between">
                        <h1 className="font-medium">Share your Link</h1>
                        <MdClose className="cursor-pointer " onClick={() => setShowModal(false)} />
                    </section>
                    <section className="p-6">
                        <Tabs
                            selectedTabIndex={selectedTabIndex}
                            onTabClick={(index) => handleTabClick(index)}
                            tabs={tabs}
                            classNames="mt-4"
                        />
                        {selectedTabIndex === 0 && <UrlLink uniqueName={uniqueNameValue} />}
                        {selectedTabIndex === 1 && <QRCode uniqueName={uniqueNameValue} />}
                    </section>
                </section>
            </Modal>
            <Modal
                showModel={showInputModal}
                setShowModal={setShowInputModal}
                onClose={() => {
                    setShowInputModal(true);
                    router.back();
                }}
            >
                <section className="py-4 px-6 flex flex-col gap-4">
                    <h1 className="font-medium">Create a new Link</h1>
                    <form onSubmit={onSubmit(onSubmitTitle)}>
                        <Input
                            placeholder="unique name"
                            {...register('uniqueName', {
                                required: 'Unique link bio is required',
                                maxLength: {
                                    value: 50,
                                    message: 'Unique link bio cannot exceed 50 characters'
                                }
                            })}
                            className="border"
                        />
                        {errors.uniqueName && <p className="text-red-500 text-xs mt-1">{errors.uniqueName.message}</p>}
                        <LoadingButton disabled={!isValid} className="mt-6">
                            Create Link ⚡️
                        </LoadingButton>
                    </form>
                </section>
            </Modal>
        </section>
    );
};

export default CreateLinkBioComponent;
