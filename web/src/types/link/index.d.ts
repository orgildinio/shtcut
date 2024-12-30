type LinkBioDataType = {
    id: number;
    title: string;
    url: string;
    image?: string | null;
};

interface ContactAction {
    name: string;
    icon: React.ReactNode;
}

interface PhoneTemplateProps {
    contactActions: ContactAction[];
    imageSelected?: string;
    title?: string;
    linksBio?: LinkBioDataType[];
    description?: string;
    presetColor?: string;
    btnColor?: string;
}
