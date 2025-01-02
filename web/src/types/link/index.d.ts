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

export type UseLinksManagerState = {
    links: LinkBioDataType[];
    showSections: Record<number, boolean>;
};

export type UseLinksManagerActions = {
    addLink: () => void;
    removeLink: (id: number) => void;
    updateLink: (id: number, field: string, value: any) => void;
    handleLinkImageChange: (id: number, event: React.ChangeEvent<HTMLInputElement>) => void;
    toggleSection: (id: number) => void;
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export type LinksTab = {
    id: string;
    label: string;
};
