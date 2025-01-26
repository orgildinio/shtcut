import { EyeRadiusType } from '../types';

// Common QR Code Data Interface
interface CommonQrCodeData {
    qrCode: {
        colors: {
            presetColor: string;
            borderColor: string;
            background: string;
        };
    };
    frame: string | null;
    qrStyle: string | null;
    eyeRadius: EyeRadiusType;
    logo: string | null;
    name: string | null;
}

// Payload for "website"
interface WebsitePayload extends CommonQrCodeData {
    type: 'website';
    bgColor: string;
    url: string;
}

// Payload for "multi-link"
interface MultiLinkPayload extends CommonQrCodeData {
    type: 'multi-link';
    title: string;
    description: string;
    profileImage: string;
    links: { url: string; title: string }[];
    bgColor: string;
    socialMedia: Record<string, string>;
    template: {
        template: string;
        presetColor: string;
        btnColor: string;
    };
}

// Payload for "vcard"
interface VcardPayload extends CommonQrCodeData {
    type: 'vCard';
    title: string;
    description: string;
    profileImage: string;
    contacts: {
        phone: string;
        email: string;
        website: string;
    };
    address: {
        street: string;
        country: string;
        city: string;
        zipCode: string;
        state: string;
    };
    company: string | null;
    socialMedia: { platform: string; link: string }[];
    bgColor: string;
    template: {
        template: string;
        presetColor: string;
        btnColor: string;
    };
}

// Payload for "pdf"
interface PdfPayload extends CommonQrCodeData {
    type: 'pdf';
    title: string;
    description: string;
    profileImage: string;
    file: { name: string; size: number; type: string };
    bgColor: string;
}

// Union Type for Payload
export type QrCodePayload = WebsitePayload | MultiLinkPayload | VcardPayload | PdfPayload;
