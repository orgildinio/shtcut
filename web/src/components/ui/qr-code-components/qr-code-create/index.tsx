import { Button, Input, Modal, Tabs, TabsContent, TabsList, TabsTrigger, toast } from '@shtcut-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { QrCodeInterface } from '@shtcut/types/types';
import Image from 'next/image';
import DownloadBtn from './download-btn';
import { Link, List } from 'lucide-react';
import { PiCopySimple, PiFilePdfDuotone, PiIdentificationCard } from 'react-icons/pi';
import {
    resetState,
    selectQrCodeStyle,
    setEyeRadius,
    setQrTitle,
    setSelectedFrame
} from '@shtcut/redux/slices/qr-code';
import MultiLinksComponent from '../multi-link-components';
import PdfQrCodeComponent from '../pdf-qr-code';
import VCardComponent from '../vcard-component';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import FrameComponents from '../frames-component';
import WebsiteComponent from '../website-component';
import PreviewPhone from '../../../dashboard/preview-phone';
import { useForm } from 'react-hook-form';
import useGeneralState from '@shtcut/hooks/general-state';
import useQrCodeState from '@shtcut/hooks/qrcode/index.';
import {
    resetGeneralState,
    setBgColor,
    setBorderColor,
    setBtnColor,
    setDescription,
    setPresetColor,
    setSelectedTemplate,
    setTitle,
    setUrl
} from '@shtcut/redux/slices/selects';
import { useLinksManager } from '@shtcut/hooks/use-links-manager';
import { useAppDispatch } from '@shtcut/redux/store';
import BackButton from '@shtcut/components/back-btn';
import { useQrCode } from '@shtcut/hooks/auth/qr-code';
import { handleError, handleSuccess } from '@shtcut/_shared';
import { LoadingButton } from '@shtcut/components/_shared/loading-button';
import useCopyToClipboard from '@shtcut/hooks/useCopyToClipboard';

const QRCodeCreateComponent = ({
    saveModal,
    setSaveModal,
    editId,
    getQrCodeData,
    isLoadingGetQrCode
}: QrCodeInterface) => {
    const params = useParams();

    const dispatch = useAppDispatch();
    const {
        step,
        bgColor,
        borderColor,
        presetColor,
        btnColor,
        handleNextStep,
        handlePrevStep,
        title,
        selectedTab,
        description,
        profileImage,
        activeTemplateString,
        socialMediaLinks,
        companyInfo,
        contactInfo,
        fileInfo,
        urlScan
    } = useGeneralState();

    const { state: linkState, actions } = useLinksManager(getQrCodeData?.links);
    const { state } = useQrCodeState();
    const router = useRouter();
    const getParams = useSearchParams();
    const tabParams = getParams.get('tabs');
    const initialTab = tabParams ? (tabParams as string) : 'website';
    const [switchTab, setSwitchTab] = useState<string>(initialTab);
    const qrCodeRef = useRef(null);
    const { qrActions, qrState } = useQrCode({ call: true });
    const { workspace, module } = params;
    const { register, handleSubmit, watch, setValue } = useForm({
        mode: 'onChange',
        defaultValues: {
            url: ''
        }
    });

    const { handleCopy } = useCopyToClipboard();
    const generalReset = () => {
        dispatch(resetState());
        dispatch(resetGeneralState());
    };
    const urlValue = watch('url');
    const handleTabChange = (tabs: string) => {
        setSwitchTab(tabs);
        // generalReset();
    };
    const handleClose = () => {
        setSaveModal(false);
        generalReset();
        router.push(`/url/${workspace}/qr-codes`);
    };

    const handleSave = async () => {
        const commonQrCodeData = {
            colors: {
                presetColor,
                borderColor: borderColor,
                background: bgColor
            },
            frame: state?.selectedFrame,
            qrStyle: state?.qrStyle,
            eyeRadius: state?.eyeRadius,
            logo: state?.logo,
            name: state?.title
        };
        const webPayload = {
            type: 'website',
            bgColor,
            url: urlValue,
            qrCode: commonQrCodeData,
            title: state?.title
        };
        const multiLinkPayload = {
            type: 'multi-link',
            title,
            description,
            profileImage,
            links: linkState?.links,
            bgColor,
            socialMedia: socialMediaLinks,
            template: {
                template: activeTemplateString,
                presetColor,
                btnColor
            },
            qrCode: commonQrCodeData
        };
        const vCardPayload = {
            type: 'vcard',
            title,
            description,
            profileImage,
            contacts: {
                phone: contactInfo.phoneNumber,
                email: contactInfo.email,
                website: contactInfo.websiteUrl
            },
            address: {
                street: contactInfo.streetAddress,
                country: contactInfo.country,
                city: contactInfo.city,
                zipCode: contactInfo.zipCode,
                state: contactInfo.state
            },
            company: companyInfo,
            socialMedia: socialMediaLinks,
            bgColor,
            qrCode: commonQrCodeData,
            template: {
                template: activeTemplateString,
                presetColor,
                btnColor
            }
        };
        const pdfPayload = {
            type: 'pdf',
            title,
            description,
            profileImage,
            file: fileInfo,
            bgColor,
            qrCode: commonQrCodeData
        };
        let payload;
        console.log('pdf::', fileInfo);
        console.log('payload:::', payload);
        switch (switchTab) {
            case 'website':
                payload = webPayload;
                break;
            case 'multi-link':
                payload = multiLinkPayload;
                break;
            case 'vcard':
                payload = vCardPayload;
                break;
            case 'pdf':
                payload = pdfPayload;
                break;
            default:
                return;
        }
        if (step === 1) {
            if (switchTab === 'website' && !urlValue) {
                return toast({
                    variant: 'destructive',
                    title: 'Missing URL',
                    description: 'Please provide a URL before proceeding.'
                });
            }

            if (switchTab !== 'website' && !title) {
                return toast({
                    variant: 'destructive',
                    title: 'Missing Title',
                    description: 'Please provide a title before proceeding.'
                });
            }

            if (switchTab === 'multi-link') {
                const hasValidLink = linkState?.links?.every(
                    (link) => link.label.trim() !== '' && link.url.trim() !== ''
                );
                if (!hasValidLink) {
                    return toast({
                        variant: 'destructive',
                        title: 'Invalid Links',
                        description: 'Please ensure all links have a title and URL filled in.'
                    });
                }
            }

            if (switchTab === 'pdf' && !fileInfo) {
                console.log('stephe1::,f', fileInfo);
                return toast({
                    variant: 'destructive',
                    title: 'No File',
                    description: 'Please upload a file before proceeding.'
                });
            }
            handleNextStep();
            return;
        }
        if (step === 2) {
            console.log('stephe2::,f', fileInfo);

            handleNextStep();
            return;
        }
        if (step === 3) {
            if (!state?.title)
                return toast({
                    variant: 'destructive',
                    title: 'Missing Title',
                    description: 'Please provide a Qr code title before proceeding.'
                });
            console.log('payload:::', payload);
            // qrActions.setLoadingState('creating', true);

            // try {
            //     let res;
            //     if (editId) {
            //         res = await qrActions.updateQrCode({ payload, id: editId });
            //     } else {
            //         res = await qrActions.createqrCode(payload);
            //     }
            //     handleSuccess({
            //         response: res
            //     });
            //     const newUrl = switchTab === 'website' ? urlValue : `http://localhost:3000/qr-code/${res?.data?.slug}`;
            //     dispatch(setUrl(newUrl));
            //     // setSaveModal(true);
            // } catch (error) {
            //     handleError({ error });
            // } finally {
            //     qrActions.setLoadingState('creating', false);
            // }
        }
    };

    console.log('fileInfo pdf', fileInfo);

    const tabData = [
        {
            value: 'website',
            label: 'Website URL',
            icon: <Link size={16} />
        },
        {
            value: 'multi-link',
            label: 'Multi links',
            icon: <List size={18} />
        },
        {
            value: 'pdf',
            label: 'PDF',
            icon: <PiFilePdfDuotone size={18} />
        },
        {
            value: 'vcard',
            label: 'vCard ',
            icon: <PiIdentificationCard size={18} />
        }
    ];

    useEffect(() => {
        if (editId && getQrCodeData) {
            const newTab = getQrCodeData?.type;
            setSwitchTab(newTab);
            handleTabChange(newTab);
        }
    }, [editId, getQrCodeData?.type]);

    useEffect(() => {
        if (switchTab) {
            router.push(`?tabs=${switchTab}`, {
                shallow: true
            } as any);
        }
    }, [switchTab]);

    const urlWebsite = getQrCodeData?.url;

    useEffect(() => {
        if (editId && getQrCodeData) {
            dispatch(setQrTitle(getQrCodeData?.qrCode?.name || getQrCodeData?.title));
            dispatch(setTitle(getQrCodeData?.title));
            dispatch(setBgColor(getQrCodeData?.bgColor));
            dispatch(setBorderColor(getQrCodeData?.borderColor || getQrCodeData?.qrCode?.colors?.borderColor));
            dispatch(setDescription(getQrCodeData?.description));
            dispatch(setBtnColor(getQrCodeData?.template?.btnColor));
            dispatch(
                setPresetColor(getQrCodeData?.qrCode?.colors?.presetColor || getQrCodeData?.template?.presetColor)
            );
            dispatch(setSelectedTemplate(getQrCodeData?.template?.template));
            dispatch(setEyeRadius(getQrCodeData?.qrCode?.eyeRadius));
            dispatch(setSelectedFrame(getQrCodeData?.qrCode?.frame));
            dispatch(selectQrCodeStyle(getQrCodeData?.qrCode?.qrStyle));
            setValue('url', urlWebsite);
        }
    }, [editId, getQrCodeData, dispatch, setValue, urlWebsite]);

    const onSubmit = (data: { url: string }) => {
        console.log('Title:', data.url);
    };
    if (isLoadingGetQrCode) return <div className="flex justify-center items-center h-screen">loading...</div>;

    return (
        <div className=" ">
            <BackButton navigation={`/url/${workspace}/qr-codes`} />
            <div className="flex pt-6 justify-between  items-center">
                <h1 className="font-semibold text-[#2B2829] text-xl">Create QR </h1>
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
                        loading={qrState.isLoadingState}
                        onClick={handleSave}
                        type={step && Number(step) > 2 ? 'submit' : 'submit'}
                        className="bg-primary-0 flex justify-center w-28 h-8 text-xs rounded items-center gap-x-2"
                    >
                        {step && Number(step) > 2 ? 'Save' : ' Next'}
                    </LoadingButton>
                </div>
            </div>
            <div className="flex mt-[22px] gap-7">
                <div className="w-full">
                    <div className="">
                        <div>
                            <Tabs
                                defaultValue={switchTab}
                                className="w-full"
                                onValueChange={(value) => {
                                    setSwitchTab(value);
                                    // generalReset();
                                }}
                            >
                                <TabsList className="block border-none bg-transparent gap-0 m-0 p-0">
                                    <section className="bg-white shadow-sm border border-gray-100 rounded-[10px] p-[23px]">
                                        <h2 className="font-medium mb-[22px] text-[#151314]">Select QR Code Type</h2>
                                        <section className="w-full gap-x-[10px] flex flex-1">
                                            {tabData.map((tab) => (
                                                <TabsTrigger
                                                    key={tab.value}
                                                    className="border shadow-none text-black/60 h-9 w-32 data-[state=active]:text-primary-0 data-[state=active]:border-primary-0 text-xs flex items-center justify-center gap-x-2 data-[state=active]:shadow-none"
                                                    value={tab.value}
                                                    onClick={() => handleTabChange(tab.value)}
                                                    disabled={editId ? tab.value !== getQrCodeData?.type : undefined}
                                                >
                                                    {tab.icon}
                                                    {tab.label}
                                                </TabsTrigger>
                                            ))}
                                        </section>
                                    </section>
                                </TabsList>
                                <form className="mt-32" onSubmit={handleSubmit(onSubmit)}>
                                    <TabsContent value="website">
                                        <WebsiteComponent
                                            step={Number(step)}
                                            switchTab={switchTab}
                                            register={register}
                                        />
                                    </TabsContent>
                                    <TabsContent value="multi-link">
                                        <MultiLinksComponent
                                            step={step as number}
                                            actions={actions}
                                            linkState={linkState}
                                            defaultLinks={getQrCodeData?.socialMedia}
                                        />
                                    </TabsContent>
                                    <TabsContent value="pdf">
                                        <PdfQrCodeComponent step={Number(step)} actions={actions} />
                                    </TabsContent>
                                    <TabsContent value="vcard">
                                        <VCardComponent step={Number(step)} defaultLinks={getQrCodeData?.socialMedia} />
                                    </TabsContent>
                                </form>
                            </Tabs>
                        </div>
                    </div>
                </div>
                <div className="bg-white w-1/2 sticky top-40 shadow-sm border border-gray-100 rounded-[10px] h-[640px] p-[23px]">
                    <h2 className=" font-semibold ">Preview</h2>
                    <PreviewPhone switchTab={switchTab} links={linkState?.links} selectedTab={Number(selectedTab)} />
                </div>
            </div>
            <Modal setShowModal={setSaveModal} showModel={saveModal} onClose={handleClose} className=" bg-gray-50  p-4">
                <div className="flex flex-col gap-4 items-center">
                    <div className="flex flex-col items-center gap-2">
                        {state?.logo ? (
                            <Image src={state?.logo as string} width={50} height={50} alt="qr-code" />
                        ) : null}
                        <p className="font-semibold ">Download QR Code</p>
                    </div>
                    <div className="w-fit h-40" ref={qrCodeRef}>
                        <FrameComponents />
                    </div>
                    <section className="mt-5 relative w-full">
                        <Input
                            value={urlScan as string}
                            defaultValue={urlScan as string}
                            className="border border-gray-300 w-full"
                            disabled
                        />
                        <div className="absolute cursor-pointer top-2.5 right-4">
                            <PiCopySimple color="#726C6C" size={16} onClick={() => handleCopy(urlScan as string)} />
                        </div>
                    </section>
                    <div className="flex mt-8 items-center w-full gap-4">
                        <Button variant={'outline'} className="w-full h-8 text-xs" onClick={handleClose}>
                            Cancel
                        </Button>
                        <DownloadBtn qrCodeRef={qrCodeRef} />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default QRCodeCreateComponent;
