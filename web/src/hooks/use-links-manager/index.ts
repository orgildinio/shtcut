import { setImage } from '@shtcut/redux/slices/selects';
import { useAppDispatch } from '@shtcut/redux/store';
import { LinkBioDataType } from '@shtcut/types/link';
import { useState } from 'react';

export const useLinksManager = () => {
    const dispatch = useAppDispatch();
    const [links, setLinks] = useState<LinkBioDataType[]>([{ id: 1, label: '', url: '', image: null }]);
    const [imgError, setImgError] = useState('');

    const [showSections, setShowSections] = useState<Record<number, boolean>>({
        1: true
    });
    const addLink = () => {
        const newId = setLinks.length + 1;
        setLinks((prevLinks) => [...prevLinks, { id: newId, label: '', url: '', image: null }]);
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
            const fileSizeInMB = file.size / (1024 * 1024);
            if (fileSizeInMB > 2) {
                alert('Image size exceeds the allowed limit of 5 MB');
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result as string;
                setLinks((prevLinks) => prevLinks.map((link) => (link.id === id ? { ...link, image: base64 } : link)));
            };
            reader.readAsDataURL(file);
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
            const fileSizeInMB = file.size / (1024 * 1024);
            if (fileSizeInMB > 2) {
                setImgError('Image size exceeds the allowed limit of 2 MB');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result as string;
                dispatch(setImage(base64Image));
            };
            reader.readAsDataURL(file);
        }
    };

    return {
        state: {
            links,
            showSections,
            imgError
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
