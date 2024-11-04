import { Button, Form, Modal, Separator, toast } from '@shtcut-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import LinkListedComponent from '../link-listed-component';
import SearchFilterActions from '../search-filter-actions';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
    AndroidTarget,
    CommentSection,
    CreateLinkForm,
    CustomSocialMedia,
    GeoTargeting,
    IosTarget,
    LinkExpire,
    PasswordProtection,
    UTMbuilder
} from '../component';

import StarLoader from '@shtcut/components/loader/star-loader';
import { LinkComponentType, LinkNameSpace } from '@shtcut/_shared/namespace/link';
import DeleteComponent from './delete-modal';
import DuplicateComponent from './duplicate-modal';
import QrCodeModal from './qrcode-modal';

type ModalType = 'deleteModal' | 'duplicateModal' | 'qrCodeModal' | null;

const LinkComponent = ({
    findAllLinksResponse,
    deleteLink,
    isLoading,
    deleteLinkResponse,
    setLoadingState,
    isLoadingState,
    search,
    onSearchChange,
    duplicate,
    duplicateLinkResponse,
    findAllLinks
}: LinkComponentType) => {
    const qrCodeRef = useRef(null);
    const [modalType, setModalType] = useState<ModalType>(null);
    const [showSections, setShowSections] = useState(false);
    const [singleLink, setSingleLink] = useState<LinkNameSpace.Link | null>(null);
    const [showModal, setShowModal] = useState(false);
    const pathName = usePathname();
    const route = useRouter();
    const [, setShortLink] = useState<string>('');
    const [preview, setPreview] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [inputsGeo, setInputsGeo] = useState(['']);
    const [tags, setTags] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);

    const handleDateChange = (date: Date | undefined) => {
        setSelectedDate(date);
    };

    const handleSelect = (value: string) => {
        setShortLink(value);
    };
    const handleInputChangeTitle = (event) => {
        setTitle(event.target.value);
    };
    const handleInputChangeDesc = (event) => {
        setDescription(event.target.value);
    };
    const handleNavigate = (id: string) => {
        route.push(`${pathName}/${id}`);
    };
    const handleDeleteLink = (id: string) => {
        setLoadingState('deleting', true);
        deleteLink({
            payload: { id },
            options: {
                successMessage: 'Link deleted successfully',
                onSuccess: () => {
                    findAllLinks();
                }
            }
        });
    };

    const toggleSection = (type?: ModalType, val?: LinkNameSpace.Link) => {
        if ((val && type === 'deleteModal') || (val && type === 'duplicateModal') || (val && type === 'qrCodeModal')) {
            setSingleLink(val);
        }
        setModalType(type || null);
        setShowSections(type !== null);
    };

    const form = useForm({
        defaultValues: {
            title: '',
            description: '',
            file1: '',
            link: '',
            shortLink: '',
            roleName: '',
            utmSource: '',
            utmMedium: '',
            password: '',
            expirationDate: '',
            iosURL: '',
            androidURL: ''
        }
    });
    const handleSubmit = (data: any) => {
        const payload = {
            ...data,
            tags,
            preview,
            inputsGeo,
            selectedDate
        };
    };

    const handleDuplicateLink = async (linkId: string) => {
        setLoadingState('duplicating', true);
        duplicate({
            payload: { id: linkId },
            options: {
                successMessage: 'Link duplicated successfully',
                onSuccess: () => {
                    findAllLinks();
                }
            }
        });
    };

    const { isSuccess } = deleteLinkResponse;
    const { isSuccess: duplicateIsSuccess } = duplicateLinkResponse;

    useEffect(() => {
        if (isSuccess) {
            setLoadingState('deleting', false);
            setShowSections(false);
        }
        if (duplicateIsSuccess) {
            setLoadingState('duplicating', false);
            setShowSections(false);
        }
    }, [isSuccess, duplicateIsSuccess]);

    return (
        <section className=" ">
            <div className="flex justify-between  items-center">
                <h1 className="font-semibold text-[#2B2829] text-xl">Link Shortener</h1>

                <Button className="bg-primary-0 text-xs h-8 rounded " onClick={() => setShowModal(true)}>
                    Create Link
                </Button>
            </div>
            <SearchFilterActions search={search} onSearchChange={onSearchChange} />
            {isLoading ? (
                <div className="flex flex-1 h-[70vh] justify-center items-center">
                    <StarLoader />
                </div>
            ) : findAllLinksResponse && findAllLinksResponse.length > 0 ? (
                <div className="flex flex-col gap-y-[14px] mt-8">
                    {findAllLinksResponse.map((data, index) => (
                        <div key={index}>
                            <LinkListedComponent
                                data={data}
                                onClickNavigate={() => handleNavigate(data._id)}
                                onDeleteClick={() => toggleSection('deleteModal', data)}
                                onDuplicateClick={() => toggleSection('duplicateModal', data)}
                                onQrCodeClick={() => toggleSection('qrCodeModal', data)}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex h-[60vh] justify-center items-center text-gray-500">
                    No data available for {search}
                </div>
            )}
            <Modal
                showModel={showModal}
                className="h-[80%] max-w-screen-lg"
                setShowModal={setShowModal}
                onClose={() => setShowModal(false)}
                showCloseIcon
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className=" h-screen">
                        <div className="flex h-full">
                            <div className="  h-full w-full ">
                                <h1 className="font-semibold px-14 py-6   border-b ">Create a new link</h1>
                                <div className=" w-full  h-full ">
                                    <div className=" overflow-y-auto h-[60%]">
                                        <CreateLinkForm
                                            handleSelect={handleSelect}
                                            form={form}
                                            preview={preview}
                                            title={title}
                                            description={description}
                                            setTags={setTags}
                                            tags={tags}
                                        />
                                    </div>
                                    <div className="px-14  border-t py-7">
                                        <Button className="text-xs h-8 bg-primary-0 rounded w-full">Create Link</Button>
                                    </div>
                                </div>
                            </div>
                            <Separator orientation="vertical" className="h-full" />
                            <div className=" h-full overflow-y-auto w-4/5">
                                <h1 className="font-semibold px-14 py-6   border-b  ">Advanced Options</h1>
                                <div className="px-14 py-6 pb-16 h-[75%] cursor-not-allowed overflow-y-auto flex flex-col gap-5">
                                    <CustomSocialMedia
                                        preview={preview}
                                        setPreview={setPreview}
                                        form={form}
                                        handleInputChangeTitle={handleInputChangeTitle}
                                        handleInputChangeDesc={handleInputChangeDesc}
                                    />
                                    <UTMbuilder />
                                    <PasswordProtection form={form} />
                                    <LinkExpire handleDateChange={handleDateChange} selectedDate={selectedDate} />
                                    <IosTarget />
                                    <AndroidTarget />
                                    <GeoTargeting setInputsGeo={setInputsGeo} inputsGeo={inputsGeo} />
                                    <CommentSection />
                                </div>
                            </div>
                        </div>
                    </form>
                </Form>
            </Modal>
            <Modal onClose={() => setShowSections(false)} showModel={showSections} setShowModal={setShowSections}>
                {modalType === 'deleteModal' && singleLink && (
                    <DeleteComponent
                        isLoadingState={isLoadingState}
                        handleDelete={() => handleDeleteLink(singleLink._id)}
                        handleClose={() => setShowSections(false)}
                    />
                )}
                {modalType === 'duplicateModal' && singleLink && (
                    <DuplicateComponent
                        isLoadingState={isLoadingState}
                        handleClose={() => setShowSections(false)}
                        handleDuplicate={() => handleDuplicateLink(singleLink?._id)}
                    />
                )}
                {modalType === 'qrCodeModal' && singleLink && (
                    <QrCodeModal singleLink={singleLink} qrCodeRef={qrCodeRef} />
                )}
            </Modal>
        </section>
    );
};

export default LinkComponent;
