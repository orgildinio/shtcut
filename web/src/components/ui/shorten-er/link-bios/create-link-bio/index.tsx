'use client';

import { Button, Card, Input, Modal, toast } from '@shtcut-ui/react';
import Tabs from '@shtcut/components/_shared/Tabs';
import Stepper from '@shtcut/components/stepper/horizontal-stepper';
import LinksSection from '@shtcut/components/ui/qr-code-components/multi-link-components/link-sections';
import ColorsQrCode from '@shtcut/components/ui/qr-code-components/website-component/actions-tab/colors-component';
import useGeneralState from '@shtcut/hooks/general-state';
import { resetGeneralState, setDescription, setTitle } from '@shtcut/redux/slices/selects';
import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import UrlLink from '../components/url-link';
import QRCode from '../components/qr-code';
import { LoadingButton } from '@shtcut/components/_shared/loading-button';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import PreviewPhone from '@shtcut/components/dashboard/preview-phone';
import LinkHeader from '@shtcut/components/dashboard/link-header';
import { useLinksManager } from '@shtcut/hooks/use-links-manager';
import QrCodeName from '@shtcut/components/ui/qr-code-components/website-component/qr-code-name';
import { useCurrentWorkSpace } from '@shtcut/hooks/current-workspace';
import { getImagePreview, handleError } from '@shtcut/_shared';
import { LinkBioActions, LinkBioStateType } from '@shtcut/types/link-bio';

const CreateLinkBioComponent = ({
    linkBioActions,
    linkBiosState
}: {
    linkBioActions: LinkBioActions;
    linkBiosState: LinkBioStateType;
}) => {
    const router = useRouter();
    const currentWorkspace = useCurrentWorkSpace();
    const { state, actions } = useLinksManager();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [showInputModal, setShowInputModal] = useState(false);
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
        watch
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            uniqueName: ''
        }
    });
    const uniqueNameValue = watch('uniqueName');
    const handleTabClick = (index: number) => {
        setSelectedTabIndex(index);
    };

    const handleSubmit = async () => {
        const payload = {
            workspace: currentWorkspace?._id,
            name: title,
            title,
            description,
            template: activeTemplateString,
            colors: {
                presetColor,
                btnColor,
                background: bgColor
            },
            links: state?.links,
            profileImage: profileImage
        };

        if (step === 1) {
            if (!title) {
                toast({
                    variant: 'destructive',
                    title: 'Missing Title',
                    description: 'Please provide a title before proceeding.'
                });
                return;
            }
            if (state?.imgError) {
                toast({
                    variant: 'destructive',
                    title: 'Large Image',
                    description: state?.imgError
                });
                return;
            }
            const hasValidLink = state?.links?.every((link) => link.label.trim() !== '' && link.url.trim() !== '');
            if (!hasValidLink) {
                toast({
                    variant: 'destructive',
                    title: 'Invalid Links',
                    description: 'Please ensure all links have a title and URL filled in.'
                });
                return;
            }

            handleNextStep();
            return;
        }
        if (step === 2) {
            handleNextStep();
            return;
        }
        if (step === 3) {
            linkBioActions.setLoadingState('creating', true);
            try {
                const res = await linkBioActions?.createLinkBio({ payload });
                toast({
                    title: 'Success',
                    description: res?.meta?.message || 'Link-bio created'
                });
                setShowModal(true);
                dispatch(resetGeneralState());
            } catch (err) {
                handleError({ error: err });
            } finally {
                linkBioActions.setLoadingState('creating', false);
            }

            console.log('Payload:', payload);
        }
    };

    const onSubmitTitle = (data: { uniqueName: string }) => {
        console.log('Title:', data.uniqueName);
        // setShowInputModal(false);
    };

    const handleCloseCreateLinkBio = () => {
        setShowModal(false);
        router.back();
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

                    <LoadingButton
                        onClick={handleSubmit}
                        className="bg-primary-0 flex justify-center w-28 h-8 text-xs rounded items-center gap-x-2"
                        loading={linkBiosState?.isLoadingState}
                        disabled={linkBiosState?.isLoadingState}
                    >
                        {step && Number(step) > 2 ? 'Save Update' : ' Next'}
                    </LoadingButton>
                </div>
            </div>
            <section className="flex mt-[22px] gap-7">
                <section className="w-[90%]">
                    <section className="w-full h-[90px] bg-white rounded-[10px] shadow-sm border border-gray-100">
                        <Stepper step={Number(step)} />
                    </section>
                    {step === 1 && (
                        <section>
                            <LinkHeader
                                label="Title"
                                description="Enter Title and description"
                                isVisible={state?.showSections[0]}
                                toggleVisibility={() => actions?.toggleSection(0)}
                                titleValue={title as string}
                                descriptionValue={description as string}
                                handleTitleChange={(e) => dispatch(setTitle(e.target.value))}
                                handleDescriptionChange={(e) => dispatch(setDescription(e.target.value))}
                                selectedImage={profileImage as string}
                                handleImageChange={actions?.handleImageChange}
                            />
                            {state?.links.map((link, index) => (
                                <LinksSection
                                    key={link.id}
                                    index={index + 1}
                                    isVisible={state?.showSections[link.id]}
                                    toggleVisibility={() => actions?.toggleSection(link.id)}
                                    linkImage={getImagePreview(link?.image)}
                                    handleImageChange={(e) => actions?.handleLinkImageChange(link.id, e)}
                                    onUpdateLink={(field, value) => actions?.updateLink(link.id, field, value)}
                                    onRemove={() => actions?.removeLink(link.id)}
                                    addLinkSection={actions?.addLink}
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
                        <section className="  shadow-sm border border-gray-100  rounded-[10px] gap-2">
                            <QrCodeName />
                        </section>
                    )}
                </section>
                <div className="bg-white sticky top-0 shadow-sm border border-gray-100 rounded-[10px] h-[640px] p-[23px]">
                    <h2 className="font-semibold">Preview</h2>
                    <PreviewPhone switchTab="edit-link" links={state?.links} />
                </div>
            </section>
            <Modal showModel={showModal} setShowModal={setShowModal} onClose={handleCloseCreateLinkBio}>
                <section className="">
                    <section className="flex p-4 border-b items-center justify-between">
                        <h1 className="font-medium">Share your Link</h1>
                        <MdClose className="cursor-pointer " onClick={handleCloseCreateLinkBio} />
                    </section>
                    <section className="p-6">
                        <Tabs
                            selectedTabIndex={selectedTabIndex}
                            onTabClick={(index) => handleTabClick(index)}
                            tabs={tabs}
                            classNames="mt-4"
                        />
                        {selectedTabIndex === 0 && (
                            <UrlLink
                                uniqueName={uniqueNameValue}
                                url={`https://beta.shtcut.co/link-bio/${linkBiosState?.createLinkBioResponse?.slug}`}
                            />
                        )}
                        {selectedTabIndex === 1 && (
                            <QRCode
                                uniqueName={uniqueNameValue}
                                url={`https://beta.shtcut.co/link-bio/${linkBiosState?.createLinkBioResponse?.slug}`}
                                id={linkBiosState?.createLinkBioResponse?.id}
                            />
                        )}
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
