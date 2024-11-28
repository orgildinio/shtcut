import { Button, Form, Modal, Separator, toast } from '@shtcut-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import LinkListedComponent from '../link-listed-component';
import SearchFilterActions from '../search-filter-actions';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
    AndroidTarget,
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
import { useUser } from '@shtcut/hooks/user';
import { LoadingButton } from '@shtcut/components/_shared/loading-button';
import ArchiveModal from './archive-component';
import LinkDataComponent from './link-data';
import { ModalType } from '@shtcut/types/types';
import ShareLinkModal from './share-link-modal';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@shtcut/redux/store';
import { setDropdownState, toggleDropdown } from '@shtcut/redux/slices/ui';
import { useTags } from '@shtcut/hooks/tags';

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
    findAllLinks,
    fetchMetaDataResponse,
    fetchMetadata,
    fetchMetaLoading,
    setUrl,
    findAllDomainsResponse,
    createLink,
    createLinkResponse,
    updateLink,
    updateLinkResponse
}: LinkComponentType) => {
    const { findAllTagsResponse } = useTags({ callTags: true });
    const dispatch = useAppDispatch();
    const qrCodeRef = useRef(null);
    const { loggedInUserData } = useUser({ callLoggedInUser: true });
    const { data } = loggedInUserData;
    const { data: user } = data || {};
    const params = useParams();
    const { workspace } = params;
    const [modalType, setModalType] = useState<ModalType>(null);
    const [showSections, setShowSections] = useState(false);
    const [singleLink, setSingleLink] = useState<LinkNameSpace.Link | null>(null);
    const pathName = usePathname();
    const route = useRouter();
    const [domain, setDomain] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [countriesData, setCountriesData] = useState<{ countryCode: string; url: string }[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
    const workspaceId = user?.workspace?.find((ws) => ws.slug === workspace)?._id;
    const showDropdown = useSelector((state: RootState) => state.ui.showDropdown);

    const handleDateChange = (date: Date | undefined) => {
        setSelectedDate(date);
    };

    const handleSelect = (value: string) => {
        setDomain(value);
    };

    const handleNavigate = (alias: string) => {
        route.push(`${pathName}/analytics/${alias}`);
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
        if (
            (val && type === 'deleteModal') ||
            (val && type === 'duplicateModal') ||
            (val && type === 'qrCodeModal') ||
            (val && type === 'archiveModal') ||
            (val && type === 'shareModal')
        ) {
            setSingleLink(val);
        }
        setModalType(type || null);
        setShowSections(type !== null);
    };

    const form = useForm({
        defaultValues: {
            title: '',
            description: '',
            image: '',
            target: '',
            shortLink: '',
            roleName: '',
            password: '',
            expirationDate: '',
            ios: '',
            android: '',
            source: '',
            medium: '',
            campaign: '',
            term: '',
            content: '',
            alias: ''
        }
    });
    const { watch, setValue } = form;
    const watchLink = watch('target');
    const watchTitle = watch('title');
    const watchDescription = watch('description');

    useEffect(() => {
        if (fetchMetaDataResponse?.data?.meta) {
            const { title, description } = fetchMetaDataResponse.data.meta;
            const { image } = fetchMetaDataResponse.data.og;
            setValue('title', title);
            setValue('description', description);
            setPreview(image);
        }
    }, [fetchMetaDataResponse, setValue]);

    useEffect(() => {
        if (watchLink) {
            setUrl(watchLink);
        }
    }, [watchLink, setUrl]);

    const handleCloseModal = () => {
        setShowSections(false);
    };

    const onSubmit = async (data: any) => {
        setLoadingState('creating', true);
        const geoObject = countriesData.reduce((acc, { countryCode, url }) => {
            acc[countryCode] = url;
            return acc;
        }, {});
        const payload = {
            title: data?.title,
            target: data?.target,
            workspace: workspaceId,
            domain: domain,
            password: data?.password,
            enableTracking: true,
            expiryDate: selectedDate,
            devices: {
                android: data?.android,
                ios: data?.ios
            },
            geo: geoObject,
            utmParams: {
                source: data?.source,
                medium: data?.medium,
                campaign: data?.campaign,
                term: data?.term,
                content: data?.content
            }
        };
        try {
            await createLink({ payload });
            form.reset();
            setLoadingState('creating', false);
            dispatch(toggleDropdown());
            const successMessage = createLinkResponse?.data?.meta?.message;
            toast({
                variant: 'default',
                title: 'Link Created',
                description: successMessage
            });
            setPreview(null);
        } catch (err) {
            const errorMessage = (err as any)?.data?.message || 'Failed . Please try again.';
            setLoadingState('creating', false);
            toast({
                variant: 'destructive',
                title: 'Error!',
                description: errorMessage
            });
        }
    };

    const onSubmitUpdate = async (data: any) => {
        setLoadingState('updating', true);
        const payload = {
            title: data?.title || singleLink?.title,
            target: data?.target || singleLink?.title,
            devices: {
                android: data?.android || singleLink?.devices?.android,
                ios: data?.ios || singleLink?.devices?.ios
            }
        };

        try {
            await updateLink({ payload, id: singleLink?._id });
            form.reset();
            setLoadingState('updating', false);
            dispatch(toggleDropdown());
            const successMessage = updateLinkResponse?.data?.meta?.message;

            toast({
                variant: 'default',
                title: 'Link Updated',
                description: successMessage || 'links successfully updated'
            });
            setPreview(null);
        } catch (err) {
            const errorMessage = (err as any)?.data?.message || 'Failed . Please try again.';
            setLoadingState('updating', false);
            toast({
                variant: 'destructive',
                title: 'Error!',
                description: errorMessage
            });
        }
    };

    const handleArchive = async () => {
        setLoadingState('updating', true);
        const payload = {
            title: singleLink?.title,
            target: singleLink?.target,
            devices: {
                android: singleLink?.devices?.android,
                ios: singleLink?.devices?.ios
            },
            archived: true
        };
        try {
            await updateLink({ payload, id: singleLink?._id });
            form.reset();
            setLoadingState('updating', false);
            handleCloseModal();
            const successMessage = updateLinkResponse?.data?.meta?.message;
            toast({
                variant: 'default',
                title: 'Link Updated',
                description: successMessage || 'links successfully Archived'
            });
        } catch (err) {
            const errorMessage = (err as any)?.data?.message || 'Failed . Please try again.';
            setLoadingState('updating', false);
            toast({
                variant: 'destructive',
                title: 'Error!',
                description: errorMessage
            });
        }
    };

    const handleDuplicateLink = async (linkId: string) => {
        setLoadingState('duplicating', true);
        duplicate({
            payload: { id: linkId }
        });
    };

    const { isSuccess } = deleteLinkResponse;
    const { isSuccess: duplicateIsSuccess } = duplicateLinkResponse;

    useEffect(() => {
        if (isSuccess) {
            setLoadingState('deleting', false);
            setShowSections(false);
            toast({
                variant: 'default',
                title: 'Link Delete',
                description: 'Link Deleted successfully'
            });
        }
        if (duplicateIsSuccess) {
            setLoadingState('duplicating', false);
            setShowSections(false);
            toast({
                variant: 'default',
                title: 'Link Duplicated',
                description: 'Link Duplicated successfully'
            });
        }
    }, [isSuccess, duplicateIsSuccess]);

    const handleUpdateLink = (data: LinkNameSpace.Link) => {
        dispatch(toggleDropdown());
        setSingleLink(data);
        if (data) {
            setValue('target', data?.target);
            setValue('title', data?.title);
            setDomain(data?.domain?.slug);
            setPreview(data?.metadata?.image);
        }
    };

    // useEffect(() => {
    //     if (singleLink) {
    //         setValue('target', singleLink?.target);
    //         setDomain(singleLink?.domain?.slug);
    //     }
    // }, [singleLink]);

    const onCloseModal = () => {
        dispatch(setDropdownState(false));
        setSingleLink(null);
        setValue('target', '');
        setPreview(null);
    };

    return (
        <section className=" ">
            <div className="flex justify-between  items-center">
                <h1 className="font-semibold text-[#2B2829] text-xl">Link </h1>

                <Button
                    className="bg-primary-0 text-xs h-8 rounded "
                    onClick={() => {
                        dispatch(toggleDropdown());
                        setSingleLink(null);
                    }}
                >
                    Create Link
                </Button>
            </div>
            <section>
                <SearchFilterActions search={search} onSearchChange={onSearchChange} />
            </section>
            <LinkDataComponent
                isLoading={isLoading}
                findAllLinksResponse={findAllLinksResponse}
                handleNavigate={handleNavigate}
                toggleSection={toggleSection}
                handleUpdateLink={handleUpdateLink}
                search={search}
            />
            <Modal
                showModel={showDropdown}
                setShowModal={onCloseModal}
                className="h-[80%] max-w-screen-lg"
                onClose={onCloseModal}
                showCloseIcon
            >
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(singleLink ? onSubmitUpdate : onSubmit)}
                        className=" h-screen relative"
                    >
                        {fetchMetaLoading && (
                            <div className="absolute left-0 right-0 bg-opacity-75 bg-white flex justify-center items-center h-full z-10">
                                <div className="relative bottom-20">
                                    <StarLoader />
                                </div>
                            </div>
                        )}
                        <div className="flex h-full">
                            <div className="  h-full w-full ">
                                <h1 className="font-semibold px-14 py-6   border-b ">
                                    {singleLink ? 'Edit Link' : 'Create a new link'}
                                </h1>
                                <div className=" w-full  h-full ">
                                    <div className=" overflow-y-auto h-[60%]">
                                        <CreateLinkForm
                                            handleSelect={handleSelect}
                                            form={form}
                                            preview={preview}
                                            title={watchTitle}
                                            description={watchDescription}
                                            setTags={setTags}
                                            tags={findAllTagsResponse}
                                            watchLink={watchLink}
                                            findAllDomainsResponse={findAllDomainsResponse}
                                            singleLink={singleLink ?? undefined}
                                        />
                                    </div>
                                    <div className="px-14  border-t py-7">
                                        <LoadingButton
                                            type="submit"
                                            className="text-xs h-8 bg-primary-0 rounded w-full"
                                            loading={isLoadingState}
                                            disabled={!watchLink || !domain}
                                        >
                                            {singleLink ? 'Update Link' : '    Create Link'}
                                        </LoadingButton>
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
                                        watchLink={watchLink}
                                    />
                                    <UTMbuilder watchLink={watchLink} form={form} />
                                    <PasswordProtection form={form} watchLink={watchLink} />
                                    <LinkExpire
                                        handleDateChange={handleDateChange}
                                        selectedDate={selectedDate}
                                        watchLink={watchLink}
                                    />
                                    <IosTarget form={form} watchLink={watchLink} />
                                    <AndroidTarget form={form} watchLink={watchLink} />
                                    <GeoTargeting
                                        setCountriesData={setCountriesData}
                                        countriesData={countriesData}
                                        watchLink={watchLink}
                                    />
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
                        handleClose={handleCloseModal}
                    />
                )}
                {modalType === 'duplicateModal' && singleLink && (
                    <DuplicateComponent
                        isLoadingState={isLoadingState}
                        handleClose={handleCloseModal}
                        handleDuplicate={() => handleDuplicateLink(singleLink?._id)}
                    />
                )}
                {modalType === 'qrCodeModal' && singleLink && <QrCodeModal data={singleLink} qrCodeRef={qrCodeRef} />}
                {modalType === 'archiveModal' && singleLink && (
                    <ArchiveModal
                        data={singleLink}
                        handleArchive={handleArchive}
                        isLoadingState={isLoadingState}
                        handleClose={handleCloseModal}
                    />
                )}
                {modalType === 'shareModal' && singleLink && <ShareLinkModal data={singleLink} />}
            </Modal>
        </section>
    );
};

export default LinkComponent;
