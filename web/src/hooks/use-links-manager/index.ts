import { setImage } from '@shtcut/redux/slices/selects';
import { useAppDispatch } from '@shtcut/redux/store';
import { LinkBioDataType } from '@shtcut/types/link';
import { useState } from 'react';

export const useLinksManager = () => {
    const dispatch = useAppDispatch();
    const [links, setLinks] = useState<LinkBioDataType[]>([{ id: 1, title: '', url: '', image: null }]);
    const [showSections, setShowSections] = useState<Record<number, boolean>>({
        1: true
    });
    const addLink = () => {
        const newId = setLinks.length + 1;
        setLinks((prevLinks) => [...prevLinks, { id: newId, title: '', url: '', image: null }]);
        setShowSections((prev) => ({ ...prev, [newId]: true }));
    };

    const removeLink = (id: number) => {
        setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
        setShowSections((prev) => {
            const { [id]: _, ...rest } = prev;
            return rest;
        });
    };

    const updateLink = (id, field, value) => {
        setLinks((prevLinks) => prevLinks.map((link) => (link.id === id ? { ...link, [field]: value } : link)));
    };

    const handleLinkImageChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setLinks((prevLinks) => prevLinks.map((link) => (link.id === id ? { ...link, image: imageUrl } : link)));
        }
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
            dispatch(setImage(imageUrl));
        }
    };

    return {
        state: {
            links,
            showSections
        },
        actions: {
            addLink,
            removeLink,
            updateLink,
            handleLinkImageChange,
            toggleSection,
            handleImageChange
        }
    };
};
