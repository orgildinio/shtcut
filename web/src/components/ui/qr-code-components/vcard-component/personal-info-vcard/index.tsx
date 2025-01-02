'use client';
import React, { useState } from 'react';
import { setImage } from '@shtcut/redux/slices/qr-code';
import { useDispatch } from 'react-redux';
import QrCodeCardHeader from '../../../../dashboard/link-header';
import QrCodeContactInfo from '../qrcode-contact-info';
import QrCodeCompanyInfo from '../qr-code-company-info';
import { logos } from '@shtcut/_shared/data';
import SocialNetworksCard from '../../social-media-component';
import useGeneralState from '@shtcut/hooks/general-state';
import { setTitle } from '@shtcut/redux/slices/selects';
const PersonalInfoVCard = () => {
    const { title } = useGeneralState();
    const dispatch = useDispatch();
    const [showSections, setShowSections] = useState({
        header: true,
        contact: true,
        company: true,
        socialNetworks: true
    });
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
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

    const toggleSection = (section: keyof typeof showSections) => {
        setShowSections((prev) => ({
            ...prev,
            [section]: !prev[section]
        }));
    };
    return (
        <div>
            <QrCodeCardHeader
                label="Basic Information"
                description="Enter Name and title"
                isVisible={showSections.header}
                toggleVisibility={() => toggleSection('header')}
                titleValue={title as string}
                descriptionValue={''}
                handleTitleChange={handleInputChange}
                handleDescriptionChange={() => {}}
                selectedImage={selectedImage}
                handleImageChange={handleImageChange}
            />
            <QrCodeContactInfo isVisible={showSections.contact} toggleVisibility={() => toggleSection('contact')} />
            <QrCodeCompanyInfo isVisible={showSections.company} toggleVisibility={() => toggleSection('company')} />
            <SocialNetworksCard
                logos={logos}
                showSection={showSections.socialNetworks}
                toggleSection={() => toggleSection('socialNetworks')}
            />
        </div>
    );
};

export default PersonalInfoVCard;
